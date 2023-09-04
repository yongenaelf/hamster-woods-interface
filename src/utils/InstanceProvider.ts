import detectProvider from '@portkey/detect-provider';
import { IPortkeyProvider } from '@portkey/provider-types';
import { WalletInfoType } from 'types';

export default class InstanceProvider {
  private static instance: IPortkeyProvider | null = null;
  private static walletInstance: WalletInfoType | null = null;

  static async getDetectProvider() {
    if (!InstanceProvider.instance) {
      InstanceProvider.instance = await detectProvider();
    }
    return InstanceProvider.instance;
  }

  static async getWalletInstance() {
    if (InstanceProvider.walletInstance) {
      return InstanceProvider.walletInstance;
    }
    return null;
  }

  static async setWalletInfoInstance(walletInfo: WalletInfoType) {
    InstanceProvider.walletInstance = walletInfo;
  }
}
