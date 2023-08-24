import { useCallback, useEffect, useRef, useState } from 'react';
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
import { LottieRefCurrentProps } from 'lottie-react';
import Role from './components/Role';

import { checkerboardData } from './mockdata';

import Bus from 'assets/images/recreation/bus.svg';
import RoleImg from 'assets/images/recreation/role.svg';
import Board from './components/Board';
import GoButton, { Status } from './components/GoButton';
import { ANIMATION_DURATION } from 'constants/animation';
import useGetState from 'redux/state/useGetState';
import RecreationModal, { RecreationModalType } from './components/RecreationModal';
import { useEffectOnce } from 'react-use';
import { CheckBeanPass, GetBingoReward, GetPlayerInformation, Play } from 'contract/bingo';
import { sleep } from '@portkey/utils';
import { GetBeanPassStatus, ShowBeanPassType } from 'components/CommonModal/type';
import GetBeanPassModal from 'components/CommonModal/GetBeanPassModal';
import { useAddress } from 'hooks/useAddress';
import { useRouter } from 'next/navigation';
import { getBeanPassClaimClaimable, receiveBeanPassNFT } from 'api/request';
import useWebLogin from 'hooks/useWebLogin';
import { BeanPassResons, WalletType } from 'types';
import { message } from 'antd';
import ShowNFTModal from 'components/CommonModal/ShowNFTModal';
import CountDownModal from 'components/CommonModal/CountDownModal';
import { store } from 'redux/store';
import { setAssetVisible } from 'redux/reducer/info';

export default function Game() {
  const [translate, setTranslate] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const address = useAddress();
  const router = useRouter();
  const { initializeContract } = useWebLogin({});

  const firstNode = checkerboardData[5][4];
  const firstNodePosition: [number, number] = [5, 4];
  const linkedList = useRef<CheckerboardList>();

  const [currentNode, setCurrentNode] = useState<CheckerboardNode>();
  const [score, setScore] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);
  const [treasureOpen, setTreasureOpen] = useState<boolean>(false);

  const [playableCount, setPlayableCount] = useState<number>(0);
  const [sumScore] = useState<number>(5);
  const [hasNft, setHasNft] = useState<boolean>(false);
  const [resetStart, setResetStart] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);

  const { isMobile, isLogin, walletType } = useGetState();

  const [goStatus, setGoStatus] = useState<Status>(Status.DISABLED);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const [beanPassModalVisible, setBeanPassModalVisible] = useState(false);

  const [beanPassModalType, setBeanPassModalType] = useState<GetBeanPassStatus>(GetBeanPassStatus.Abled);

  const [isShowNFT, setIsShowNFT] = useState(false);
  const [nftModalType, setNFTModalType] = useState<ShowBeanPassType>(ShowBeanPassType.Display);

  const [countDownModalOpen, setCountDownModalOpen] = useState(false);

  const animationRef = useRef<LottieRefCurrentProps>(null);
  const translateRef = useRef<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const updatePosition = ({ x, y, state, currentNode }: IJumpCallbackParams) => {
    setTranslate({
      x: x,
      y: y,
    });
    if (!state) {
      const timer = setTimeout(() => {
        setGoStatus(Status.NONE);
        setShowAdd(true);
        clearTimeout(timer);
        if (currentNode) {
          setCurrentNode(currentNode);
          if (currentNode.info.info.type === CheckerboardType.TREASURE) {
            setTreasureOpen(true);
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
        getList(checkerboardData[nextPosition[0]][nextPosition[1]], nextPosition);
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

  const initCheckerboard = () => {
    setTranslate({
      x: 0,
      y: 0,
    });
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
    getList(firstNode, firstNodePosition);
  };

  const go = async () => {
    if (goStatus !== Status.NONE) {
      if (!hasNft) {
        console.log('no nft modal'); // TODO
        return;
      }
      if (hasNft && playableCount === 0) {
        console.log('countdown modal'); // TODO
        return;
      }
    }
    try {
      setGoStatus(Status.LOADING);
      const res = await Play(resetStart);
      setResetStart(false);

      if (res.TransactionId) {
        await sleep(4000);
        const bingoRes = await GetBingoReward(res.TransactionId);
        const step = bingoRes.gridNum;
        setScore(bingoRes.score);
        init();
        setStep(step);
        setOpen(true);
        await sleep(1500);
        setOpen(false);
        setGoStatus(Status.DISABLED);
        setShowAdd(false);
        jump(step);
      }
    } catch (error) {
      console.error('=====error', error);
      setGoStatus(Status.NONE);
    }
  };

  const init = async () => {
    try {
      const res = await GetPlayerInformation('2wLEEDc7wcAP2YmZRJ4RK8uZB7GLDkSDK8jhF74iN46ufmGe6Y'); // TODO
      console.log('=====GetPlayerInformation res', res);
      setPlayableCount(res.playableCount);

      if (res.playableCount === 0) {
        setGoStatus(Status.DISABLED);
      } else {
        setGoStatus(Status.NONE);
      }
    } catch (error) {
      console.error('=====GetPlayerInformation error', error);
      /* empty */
    }
  };

  const checkBeanPassStatus = useCallback(async () => {
    let beanPassClaimClaimableRes;
    try {
      beanPassClaimClaimableRes = await getBeanPassClaimClaimable({
        caAddress: address,
      });
      console.log('BeanPassClaimClaimableRes', beanPassClaimClaimableRes);
    } catch (err) {
      console.log('checkBeanPassStatusError:', err);
      return;
    }
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
      const hasBeanPass = await CheckBeanPass(address);
      console.log(hasBeanPass);
      if (hasBeanPass && hasBeanPass.value) {
        setHasNft(true);
        setNFTModalType(ShowBeanPassType.Display);
        setIsShowNFT(true);
      } else {
        setGoStatus(Status.DISABLED);
        checkBeanPassStatus();
      }
    } catch (error) {
      console.error('=====CheckBeanPass error', error);
    }
  }, [address]);

  const handleConfirm = async () => {
    if (beanPassModalType === GetBeanPassStatus.Abled) {
      const getNFTRes = await receiveBeanPassNFT({
        caAddress: address,
      });
      const { claimable, reason } = getNFTRes;
      if (!claimable) {
        message.error(reason);
        return;
      }
      setBeanPassModalVisible(false);
      setNFTModalType(ShowBeanPassType.Success);
      setIsShowNFT(true);
    } else if (beanPassModalType === GetBeanPassStatus.Recharge) {
      if (walletType === WalletType.discover || walletType === WalletType.unknown) {
        return;
      }
      router.push('/asset');
    }
  };

  useEffect(() => {
    if (address) {
      init();
      initCheckBeanPass();
    }
  }, [address]);

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    } else {
      initializeContract();
    }
  }, [isLogin, router]);

  useEffect(() => {
    initCheckerboard();
  }, [checkerboardData, hasNft]);

  useEffectOnce(() => {
    setResetStart(true);
    window.addEventListener('resize', initCheckerboard);
    return () => {
      window.removeEventListener('resize', initCheckerboard);
    };
  });

  return (
    <div className={`${styles.game} relative ${isMobile && 'flex-col'}`}>
      {!isMobile && (
        <div className={styles['game__pc__side']}>
          <div className={styles['game__pc__blur']}></div>
        </div>
      )}
      <div
        className={`${styles['game__content']} flex overflow-y-auto ${
          isMobile ? 'w-full flex-1' : 'h-full w-[784px]'
        }`}>
        <SideBorder side="left" />
        <div className={`flex-1 pl-[16px] ${isMobile ? 'pt-[41px]' : 'pb-[72px] pt-[80px]'}`}>
          <div className="relative z-[30]">
            {isMobile && <Board />}

            {hasNft && (
              <Role
                id="animationId"
                width={`calc(100% / ${checkerboardData?.[0]?.length})`}
                translate={translate}
                bean={score}
                position={{
                  x: currentNode?.info.row,
                  y: currentNode?.info.column,
                }}
                animationDuration={ANIMATION_DURATION}
                showAdd={showAdd}
                hideAdd={hideAdd}>
                {/* <Lottie lottieRef={animationRef} animationData={dataAnimation} /> */}
                <RoleImg />
              </Role>
            )}

            {checkerboardData.map((row, index) => {
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
        <SideBorder side="right" />
      </div>
      {!isMobile && (
        <div className={`${styles['game__pc__side']}`}>
          <div className={`${styles['game__pc__blur']} ${styles['game__pc__blur__right']}`}></div>
          <div className="z-10 h-full w-full">
            <Board playableCount={playableCount} sumScore={hasNft ? sumScore : 0} status={goStatus} go={go} />
          </div>
        </div>
      )}

      {isMobile && (
        <GoButton playableCount={playableCount} sumScore={hasNft ? sumScore : 0} status={goStatus} go={go} />
      )}

      <RecreationModal open={open} type={RecreationModalType.DICE} step={step} />
      <RecreationModal
        open={treasureOpen}
        onClose={() => setTreasureOpen(false)}
        type={RecreationModalType.TREASURE}
        step={step}
        bean={score}
      />
      <GetBeanPassModal
        type={beanPassModalType}
        open={beanPassModalVisible}
        onCancel={() => {
          setBeanPassModalVisible(false);
        }}
        onConfirm={handleConfirm}
      />

      <ShowNFTModal
        open={isShowNFT}
        onCancel={() => {
          setIsShowNFT(false);
        }}
        type={nftModalType}
      />
      <CountDownModal
        open={countDownModalOpen}
        onCancel={() => {
          setCountDownModalOpen(false);
        }}
        onConfirm={() => {
          setCountDownModalOpen(false);
        }}></CountDownModal>
    </div>
  );
}
