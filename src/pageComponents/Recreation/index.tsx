import { useCallback, useEffect, useRef, useState } from 'react';

import Leaderboard from 'components/Leaderboard';

import PageLoading from 'components/PageLoading';
import GameRecord from 'components/GameRecord';

import {
  ArrowDirection,
  CheckerboardNode,
  CheckerboardType,
  ICheckerboardItem,
  IJumpCallbackParams,
} from './checkerboard';
import { CheckerboardList } from './checkerboard';
import styles from './index.module.css';

import Checkerboard from './components/Checkerboard';
import SideBorder from './components/SideBorder';
import Role from './components/Role';

import Bus from 'assets/images/recreation/bus.svg';
import Board from './components/Board';
import GoButton, { Status } from './components/GoButton';
import { ANIMATION_DURATION } from 'constants/animation';
import useGetState from 'redux/state/useGetState';
import RecreationModal, { RecreationModalType } from './components/RecreationModal';
import { useDebounce, useDeepCompareEffect, useEffectOnce, useWindowSize } from 'react-use';
import { CheckBeanPass, GetBingoReward, GetBoutInformation, Play } from 'contract/bingo';
import { GetBeanPassStatus, ShowBeanPassType } from 'components/CommonModal/type';
import GetBeanPassModal from 'components/CommonModal/GetBeanPassModal';
import { useAddress } from 'hooks/useAddress';
import { useRouter } from 'next/navigation';
import { getBeanPassClaimClaimable, receiveBeanPassNFT } from 'api/request';
import useWebLogin from 'hooks/useWebLogin';
import { getBlockHeight } from 'utils/getBlockHeight';
import showMessage from 'utils/setGlobalComponentsInfo';
import BoardLeft from './components/BoardLeft';
import { setPlayerInfo } from 'redux/reducer/info';
import { BeanPassResons, IContractError, WalletType } from 'types';
import ShowNFTModal from 'components/CommonModal/ShowNFTModal';
import CountDownModal from 'components/CommonModal/CountDownModal';
import { store } from 'redux/store';
import { ChainId } from '@portkey/types';
import { formatErrorMsg } from 'utils/formattError';
import { sleep } from 'utils/common';
import roleImg from 'assets/base64/role';
import { setChessboardResetStart, setCurChessboardNode } from 'redux/reducer/chessboardData';

export default function Game() {
  const [translate, setTranslate] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const { width, height } = useWindowSize();
  const address = useAddress();
  const router = useRouter();
  const { initializeContract, updatePlayerInformation } = useWebLogin({});

  const {
    isMobile,
    isLogin,
    playerInfo,
    walletType,
    walletInfo,
    imageResources,
    configInfo,
    chessBoardInfo: checkerboardData,
    resetStart: chessboardResetStart,
    curChessboardNode,
  } = useGetState();

  const firstNode = checkerboardData![5][4];
  const firstNodePosition: [number, number] = [5, 4];
  const linkedList = useRef<CheckerboardList>();

  const currentNodeRef = useRef<CheckerboardNode>();
  const [score, setScore] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);
  const [treasureOpen, setTreasureOpen] = useState<boolean>(false);

  const [playableCount, setPlayableCount] = useState<number>(0);
  const [sumScore] = useState<number>(configInfo!.sumScore);
  const [hasNft, setHasNft] = useState<boolean>(false);
  const [resetStart, setResetStart] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);

  const [goLoading, setGoLoading] = useState<boolean>(false);
  const [moving, setMoving] = useState<boolean>(false);
  const [goStatus, setGoStatus] = useState<Status>(Status.DISABLED);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const [beanPassModalVisible, setBeanPassModalVisible] = useState(false);

  const [beanPassModalType, setBeanPassModalType] = useState<GetBeanPassStatus>(GetBeanPassStatus.Abled);

  const [isShowNFT, setIsShowNFT] = useState(false);
  const [nftModalType, setNFTModalType] = useState<ShowBeanPassType>(ShowBeanPassType.Display);

  const [opacity, setOpacity] = useState<number>(0);
  const [roleAnimationDuration, setRoleAnimationDuration] = useState<number>(0);

  const [countDownModalOpen, setCountDownModalOpen] = useState(false);

  const translateRef = useRef<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const updateStep = () => {
    store.dispatch(
      setPlayerInfo({
        ...playerInfo,
        playableCount: playerInfo?.playableCount && playerInfo?.playableCount > 0 ? playerInfo.playableCount - 1 : 0,
      }),
    );
    updatePlayerInformation(address);
  };

  const updatePosition = ({ x, y, state, currentNode }: IJumpCallbackParams) => {
    setTranslate({
      x: x,
      y: y,
    });
    if (!state) {
      const timer = setTimeout(() => {
        setGoLoading(false);
        setMoving(false);
        clearTimeout(timer);
        if (currentNode) {
          currentNodeRef.current = currentNode;
          store.dispatch(setCurChessboardNode(currentNode));
          if (currentNode.info.info.type === CheckerboardType.TREASURE) {
            setTreasureOpen(true);
          } else {
            updatePlayerInformation(address);
            setShowAdd(true);
          }
        }
      }, ANIMATION_DURATION);
    }
  };

  const getList = (node: ICheckerboardItem, nodePosition: [number, number]) => {
    const current = {
      row: nodePosition[0],
      column: nodePosition[1],
      info: node,
    };

    linkedList.current?.append(current);

    if (node.arrow) {
      let nextPosition: any = [];
      switch (node.arrow) {
        case ArrowDirection.LEFT:
          nextPosition = [nodePosition[0], nodePosition[1] - 1];
          break;
        case ArrowDirection.RIGHT:
          nextPosition = [nodePosition[0], nodePosition[1] + 1];
          break;
        case ArrowDirection.TOP:
          nextPosition = [nodePosition[0] - 1, nodePosition[1]];
          break;
        case ArrowDirection.BOTTOM:
          nextPosition = [nodePosition[0] + 1, nodePosition[1]];
          break;
      }

      if (nextPosition[0] === firstNodePosition[0] && nextPosition[1] === firstNodePosition[1]) {
        return;
      } else {
        getList(checkerboardData![nextPosition[0]][nextPosition[1]], nextPosition);
      }
    }
  };

  const jump = (step: number) => {
    if (linkedList.current) {
      const next = linkedList.current.jump({
        step,
        // animation: animationRef.current!,
        baseWidth: translateRef.current.x,
        baseHeight: translateRef.current.y,
      });
      next(({ x, y, state, currentNode }) =>
        updatePosition({
          x,
          y,
          state,
          currentNode,
        }),
      );
    }
  };

  const hideAdd = () => {
    setShowAdd(false);
  };

  const resetPosition = () => {
    setTranslate({
      x: ((currentNodeRef.current?.info.column ?? 4) - 4) * translateRef.current.x,
      y: ((currentNodeRef.current?.info.row ?? 5) - 5) * translateRef.current.y,
    });
  };

  const initCheckerboard = () => {
    resetPosition();
    setResetStart(chessboardResetStart);
    store.dispatch(setChessboardResetStart(chessboardResetStart));
    // animationRef.current?.pause();
    translateRef.current = {
      x: document.getElementById('animationId')?.clientWidth || 0,
      y: document.getElementById('animationId')?.clientHeight || 0,
    };
    linkedList.current = new CheckerboardList({
      baseWidth: translateRef.current.x,
      baseHeight: translateRef.current.y,
      animationDuration: ANIMATION_DURATION,
    });

    if (curChessboardNode) {
      linkedList.current.updateCurrentNode(curChessboardNode);
    }

    getList(firstNode, firstNodePosition);
  };

  const updateCheckerboard = () => {
    setRoleAnimationDuration(0);
    translateRef.current = {
      x: document.getElementById('animationId')?.clientWidth || 0,
      y: document.getElementById('animationId')?.clientHeight || 0,
    };
    resetPosition();
    linkedList.current?.resize(translateRef.current.x, translateRef.current.y);
  };
  useDebounce(updateCheckerboard, 500, [width, height]);

  const go = async () => {
    setRoleAnimationDuration(ANIMATION_DURATION);
    if (goStatus !== Status.NONE) {
      if (!hasNft) {
        setBeanPassModalType(GetBeanPassStatus.Need);
        setBeanPassModalVisible(true);
        return;
      }
      if (hasNft && playableCount === 0) {
        setCountDownModalOpen(true);
        return;
      }
      return;
    }
    try {
      setGoLoading(true);
      showMessage.loading('Generating random step numbers on-chain');
      console.log('=====Play resetStart', resetStart);
      const res = await Play(resetStart);
      console.log('=====Play res', res);
      if (res?.TransactionId) {
        const boutInformation = await GetBoutInformation(res?.TransactionId);
        console.log('=====Play GetBoutInformation', boutInformation);
        updateStep();
        setResetStart(false);
        store.dispatch(setChessboardResetStart(false));

        const blockGap = Number(boutInformation.expectedBlockHeight) - res.TxResult.BlockNumber;
        const waitTime = blockGap * 0.5 - (Date.now() - res.startTime) / 1000;
        console.log(waitTime, blockGap, res.startTime);

        if (waitTime > 0.1) {
          await sleep(waitTime * 1000);
        }

        const blockRes = await getBlockHeight(
          configInfo!.curChain as ChainId,
          0,
          configInfo!.rpcUrl,
          boutInformation.expectedBlockHeight,
        );
        if (blockRes) {
          const bingoRes = await GetBingoReward(res.TransactionId);
          console.log('=====Play GetBingoReward', bingoRes);
          const step = bingoRes.gridNum;
          setScore(bingoRes.score);
          setStep(step);
          setOpen(true);
        }
      } else {
        setMoving(false);
        setGoLoading(false);
      }
    } catch (error) {
      console.error('=====error', error);
      const resError = error as IContractError;
      showMessage.error(formatErrorMsg(resError).errorMessage?.message);
      setMoving(false);
      setGoLoading(false);
    }
    showMessage.hideLoading();
  };

  const checkBeanPassStatus = useCallback(async () => {
    let beanPassClaimClaimableRes;
    try {
      beanPassClaimClaimableRes = await getBeanPassClaimClaimable({
        caAddress: address,
      });
      console.log('BeanPassClaimClaimableRes', beanPassClaimClaimableRes);
      showMessage.hideLoading();
    } catch (err) {
      showMessage.hideLoading();
      console.log('checkBeanPassStatusError:', err);
      return;
    }
    if (!beanPassClaimClaimableRes) return;
    const { claimable, reason } = beanPassClaimClaimableRes;

    if (claimable) {
      setBeanPassModalType(GetBeanPassStatus.Abled);
    } else {
      if (reason === BeanPassResons.Claimed) {
        setBeanPassModalType(GetBeanPassStatus.Noneleft);
      } else if (reason === BeanPassResons.InsufficientElfAmount) {
        setBeanPassModalType(GetBeanPassStatus.Recharge);
      } else if (reason === BeanPassResons.DoubleClaim) {
        setBeanPassModalType(GetBeanPassStatus.Notfound);
      }
    }
    setBeanPassModalVisible(true);
  }, [address]);

  const initCheckBeanPass = useCallback(async () => {
    try {
      console.log('=====CheckBeanPass address', address);
      const hasBeanPass = await CheckBeanPass(address);
      console.log(hasBeanPass);
      if (hasBeanPass && hasBeanPass.value) {
        setHasNft(true);
        setOpacity(1);
        showMessage.hideLoading();
      } else {
        setHasNft(false);
        checkBeanPassStatus();
      }
    } catch (error) {
      showMessage.hideLoading();
      console.error('=====CheckBeanPass error', error);
    }
  }, [address]);

  const handleConfirm = async () => {
    if (beanPassModalType === GetBeanPassStatus.Abled) {
      showMessage.loading();
      const getNFTRes = await receiveBeanPassNFT({
        caAddress: address,
      });
      const { claimable, reason } = getNFTRes;
      if (!claimable) {
        showMessage.error(reason);
        return;
      }
      setBeanPassModalVisible(false);
      setNFTModalType(ShowBeanPassType.Success);

      await sleep(configInfo?.stepUpdateDelay || 3000);
      updatePlayerInformation(address);
      setIsShowNFT(true);
      showMessage.hideLoading();
    } else if (beanPassModalType === GetBeanPassStatus.Recharge) {
      if (walletType === WalletType.discover || walletType === WalletType.unknown) {
        return;
      }
      router.push('/asset');
    } else {
      setBeanPassModalVisible(false);
    }
  };

  useEffect(() => {
    if (address) {
      initCheckBeanPass();
    }
  }, [address]);

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    } else {
      if (walletType !== WalletType.unknown && walletInfo) {
        initializeContract();
      }
    }
  }, [initializeContract, isLogin, router, walletInfo, walletType]);

  useEffect(() => {
    initCheckerboard();
  }, [checkerboardData, hasNft]);

  useEffectOnce(() => {
    showMessage.loading();

    setResetStart(chessboardResetStart);
    currentNodeRef.current = curChessboardNode;
    if (curChessboardNode) {
      setOpacity(0);
      updateCheckerboard();
      setTimeout(() => {
        setOpacity(1);
      }, 25);
    }
  });

  useDeepCompareEffect(() => {
    setPlayableCount(playerInfo?.playableCount || 0);
    if (!hasNft || !sumScore || moving) {
      return setGoStatus(Status.DISABLED);
    }
    if (goLoading) {
      setGoStatus(Status.LOADING);
      return;
    }
    if (playerInfo?.playableCount && playerInfo?.playableCount > 0) {
      setGoStatus(Status.NONE);
    } else {
      setGoStatus(Status.DISABLED);
    }
  }, [hasNft, moving, goLoading, playerInfo]);

  const onShowNFTModalCancel = () => {
    if (nftModalType === ShowBeanPassType.Success) {
      initCheckBeanPass();
    }
    setIsShowNFT(false);
  };

  const onNftClick = () => {
    if (hasNft) {
      setNFTModalType(ShowBeanPassType.Display);
      setIsShowNFT(true);
    } else {
      showMessage.loading();
      checkBeanPassStatus();
    }
  };

  const diceModalOnClose = () => {
    setOpen(false);
    setMoving(true);
    setShowAdd(false);
    jump(step);
  };

  const recreationModalOnClose = () => {
    updatePlayerInformation(address);
    setTreasureOpen(false);
  };

  return (
    <>
      <div className={`${styles.game} cursor-custom relative z-[1] ${isMobile && 'flex-col'}`}>
        {!isMobile && (
          <div className={styles['game__pc__side']}>
            <div
              className={`${styles['game__pc__blur']}`}
              style={{
                backgroundImage: `url(${imageResources?.aloginBgPc})`,
              }}></div>
            <BoardLeft />
          </div>
        )}
        <div
          className={`${styles['game__content']} flex overflow-hidden ${
            isMobile ? 'w-full flex-1' : 'h-full w-[40%] min-w-[500Px] max-w-[784Px]'
          }`}>
          {isMobile && <Board hasNft={hasNft} onNftClick={onNftClick} />}
          <SideBorder side="left" />
          <div className="w-full overflow-y-auto overflow-x-hidden">
            <div className={`flex-1 pl-[16px] ${isMobile ? 'pt-[41px]' : 'pt-[80px]'}`}>
              <div className="relative z-[30]">
                <Role
                  id="animationId"
                  width={`calc(100% / ${checkerboardData?.[0]?.length})`}
                  translate={translate}
                  bean={score}
                  opacity={opacity}
                  position={{
                    x: currentNodeRef.current?.info.row,
                    y: currentNodeRef.current?.info.column,
                  }}
                  animationDuration={roleAnimationDuration}
                  showAdd={showAdd}
                  hideAdd={hideAdd}>
                  {/* <Lottie lottieRef={animationRef} animationData={dataAnimation} /> */}
                  <img className="w-full h-full" src={roleImg} alt="role" />
                </Role>

                {checkerboardData?.map((row, index) => {
                  return (
                    <div key={index} className="flex">
                      {row.map((column) => {
                        return (
                          <div
                            key={column.id}
                            style={{
                              width: `calc(100% / ${row.length})`,
                            }}>
                            <Checkerboard value={column} />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div className="ml-[-16px] mt-[-50px] w-full">
                <Bus className={`${isMobile ? 'h-[120px] w-[120px]' : 'h-[240px] w-[240px]'}`} />
              </div>
            </div>
          </div>

          <SideBorder side="right" />
        </div>
        {!isMobile && (
          <div className={`${styles['game__pc__side']}`}>
            <div
              className={`${styles['game__pc__blur']} ${styles['game__pc__blur__right']}`}
              style={{
                backgroundImage: `url(${imageResources?.aloginBgPc})`,
              }}></div>
            <div className="z-30 h-full w-full">
              <Board
                hasNft={hasNft}
                onNftClick={onNftClick}
                playableCount={playableCount}
                sumScore={hasNft ? sumScore : 0}
                status={goStatus}
                go={go}
              />
            </div>
          </div>
        )}

        {isMobile && (
          <GoButton playableCount={playableCount} sumScore={hasNft ? sumScore : 0} status={goStatus} go={go} />
        )}

        <RecreationModal open={open} onClose={diceModalOnClose} type={RecreationModalType.DICE} step={step} />
        <RecreationModal
          open={treasureOpen}
          onClose={recreationModalOnClose}
          type={RecreationModalType.TREASURE}
          step={step}
          bean={score}
        />
        <GetBeanPassModal
          type={beanPassModalType}
          open={beanPassModalVisible}
          onCancel={() => setBeanPassModalVisible(false)}
          onConfirm={handleConfirm}
        />

        <ShowNFTModal open={isShowNFT} onCancel={onShowNFTModalCancel} type={nftModalType} />
        <CountDownModal
          open={countDownModalOpen}
          onCancel={() => setCountDownModalOpen(false)}
          onConfirm={() => setCountDownModalOpen(false)}
        />
      </div>

      <Leaderboard />
      <GameRecord />
      <PageLoading />
    </>
  );
}
