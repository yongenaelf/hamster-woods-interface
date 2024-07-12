import AElf from 'aelf-sdk';
import { useCallback } from 'react';
import { recoverPubKeyBySignature } from '@etransfer/utils';
import { AuthTokenSource, PortkeyVersion } from '@etransfer/types';
import { SignatureParams } from './useWebLogin';
import { eTransferCore } from '@etransfer/core';
import { WalletType } from 'types';
import DetectProvider from 'utils/InstanceProvider';
import useGetState from 'redux/state/useGetState';
import { did, handleErrorMessage } from '@portkey/did-ui-react';
import { PORTKEY_LOGIN_CHAIN_ID_KEY } from 'constants/platform';
import { getCaHashAndOriginChainIdByWallet } from 'utils/wallet';
import { getETransferJWT } from '@etransfer/utils';
import { asyncStorage } from 'utils/lib';
import { ChainId } from '@portkey/types';
import { ETransferConfig } from '@etransfer/ui-react';
import { message } from 'antd';
import showMessage from 'utils/setGlobalComponentsInfo';

export function useQueryAuthToken() {
  const { walletInfo, walletType, isLogin } = useGetState();

  const getDiscoverSignature = useCallback(
    async (params: SignatureParams) => {
      // checkSignatureParams(params);
      const discoverInfo = walletInfo?.discoverInfo;
      if (!discoverInfo) {
        throw new Error('Discover not connected');
      }
      const discoverProvider = await DetectProvider.getDetectProvider();
      if (!discoverProvider) throw new Error('Please download extension');
      const provider = discoverProvider;
      const signInfo = params.signInfo;
      const signedMsgObject = await provider.request({
        method: 'wallet_getSignature',
        payload: {
          data: signInfo || params.hexToBeSign,
        },
      });
      const signedMsgString = [
        signedMsgObject.r.toString(16, 64),
        signedMsgObject.s.toString(16, 64),
        `0${signedMsgObject.recoveryParam.toString()}`,
      ].join('');
      return {
        error: 0,
        errorMessage: '',
        signature: signedMsgString,
        from: 'discover',
      };
    },
    [walletInfo?.discoverInfo],
  );

  const getPortKeySignature = useCallback(
    async (params: SignatureParams) => {
      // checkSignatureParams(params);
      const didWalletInfo = walletInfo?.portkeyInfo;
      if (!didWalletInfo) {
        throw new Error('Portkey not login');
      }
      let signInfo = '';
      if (params.hexToBeSign) {
        signInfo = params.hexToBeSign;
      } else {
        signInfo = params.signInfo;
      }
      const signature = did.sign(signInfo).toString('hex');
      return {
        error: 0,
        errorMessage: '',
        signature,
        from: 'portkey',
      };
    },
    [walletInfo],
  );
  const handleGetSignature = useCallback(async () => {
    const plainTextOrigin = `Nonce:${Date.now()}`;
    const plainText: any = Buffer.from(plainTextOrigin).toString('hex').replace('0x', '');
    let signInfo: string;
    let getSignature;
    let address: string;
    if (walletType !== WalletType.portkey) {
      // nightElf or discover
      signInfo = AElf.utils.sha256(plainText);
      getSignature = getDiscoverSignature;
      address = walletInfo?.discoverInfo?.address || '';
    } else {
      // portkey sdk
      signInfo = Buffer.from(plainText).toString('hex');
      getSignature = getPortKeySignature;
      address = walletInfo?.portkeyInfo?.walletInfo?.address || '';
    }
    console.log('getSignature');
    const result = await getSignature({
      appName: 'Hamster Woods',
      address,
      signInfo,
    });
    if (result.error) throw result.errorMessage;

    return { signature: result?.signature || '', plainText };
  }, [
    getDiscoverSignature,
    getPortKeySignature,
    walletInfo?.discoverInfo?.address,
    walletInfo?.portkeyInfo?.walletInfo?.address,
    walletType,
  ]);

  const getManagerAddress = useCallback(async () => {
    //
    let managerAddress;
    if (walletType === WalletType.discover) {
      const discoverProvider = await DetectProvider.getDetectProvider();
      if (!discoverProvider) throw new Error('Please download extension');

      managerAddress = await discoverProvider.request({ method: 'wallet_getCurrentManagerAddress' });
    } else if (walletType === WalletType.portkey) {
      managerAddress = did.didWallet.managementAccount?.address;
    }
    if (managerAddress) return managerAddress;
    throw new Error('Please Login');
  }, [walletType]);

  const getCaInfo: () => Promise<{ caHash: string; originChainId: ChainId; caAddress: string }> =
    useCallback(async () => {
      if (walletType === WalletType.portkey) {
        const caHash = did.didWallet.aaInfo.accountInfo?.caHash;
        const originChainId = (localStorage.getItem(PORTKEY_LOGIN_CHAIN_ID_KEY) || '') as ChainId;
        const caAddress = did.didWallet.aaInfo.accountInfo?.caAddress;
        if (!caHash || !caAddress || !originChainId) throw new Error('You are not logged in.');
        return {
          caHash,
          originChainId,
          caAddress,
        };
      } else {
        const caAddress = walletInfo?.discoverInfo?.address;
        if (!caAddress) throw new Error('You are not logged in.');
        const { caHash, originChainId } = await getCaHashAndOriginChainIdByWallet(caAddress);
        return {
          caHash,
          originChainId,
          caAddress,
        };
      }
    }, [walletInfo?.discoverInfo?.address, walletType]);

  const getUserInfo = useCallback(
    async ({
      managerAddress,
      caHash,
      originChainId,
    }: {
      managerAddress: string;
      caHash: string;
      originChainId: ChainId;
    }) => {
      const signatureResult = await handleGetSignature();
      console.log(signatureResult, 'signatureResult===');
      const pubkey = recoverPubKeyBySignature(signatureResult.plainText, signatureResult.signature) + '';

      // localStorage.setItem(ETRANSFER_USER_MANAGER_ADDRESS, managerAddress);
      console.log('>>>>>> user information:', {
        pubkey,
        signature: signatureResult.signature,
        plainText: signatureResult.plainText,
        caHash,
        originChainId,
        managerAddress,
      });

      return {
        pubkey,
        signature: signatureResult.signature,
        plainText: signatureResult.plainText,
        caHash,
        originChainId,
        managerAddress: managerAddress,
      };
    },
    [handleGetSignature],
  );

  const getETransferAuthToken = useCallback(async () => {
    if (!walletInfo) throw new Error('Failed to obtain walletInfo information.');

    if (!isLogin) throw new Error('You are not logged in.');
    try {
      // showMessage.loading();

      const managerAddress = await getManagerAddress();
      const { caHash, originChainId } = await getCaInfo();
      let authToken;
      const jwtData = await getETransferJWT(asyncStorage, `${caHash}${managerAddress}`);
      console.log(jwtData, 'jwtData====');
      if (jwtData) {
        authToken = `${jwtData.token_type} ${jwtData.access_token}`;
      } else {
        const { pubkey, signature, plainText } = await getUserInfo({ managerAddress, caHash, originChainId });
        authToken = await eTransferCore.getAuthToken({
          pubkey,
          signature,
          plainText,
          caHash,
          chainId: originChainId,
          managerAddress,
          version: PortkeyVersion.v2,
          source: AuthTokenSource.Portkey,
          recaptchaToken: undefined,
        });
      }

      ETransferConfig.setConfig({
        authorization: {
          jwt: authToken,
        },
      });
      return authToken;
    } catch (error) {
      message.error(handleErrorMessage(error, 'Failed to obtain etransfer authorization.'));
      return;
    } finally {
      // showMessage.hideLoading();
    }
  }, [getCaInfo, getManagerAddress, getUserInfo, isLogin, walletInfo]);

  return { getETransferAuthToken, getUserInfo };
}
