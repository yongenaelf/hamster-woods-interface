import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDirection, CheckerboardNode, ICheckerboardItem, IJumpCallbackParams } from './checkerboard';
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
import GoButton from './components/GoButton';
import { ANIMATION_DURATION } from 'contract/animation';
import useGetState from 'redux/state/useGetState';
import { GetBeanPassStatus, ShowBeanPassType } from 'components/CommonModal/type';
import GetBeanPassModal from 'components/CommonModal/GetBeanPassModal';
import { CheckBeanPass } from 'contract/bingo';
import { useAddress } from 'hooks/useAddress';
import { useRouter } from 'next/navigation';
import { getBeanPassClaimClaimable, receiveBeanPassNFT } from 'api/request';
import useWebLogin from 'hooks/useWebLogin';
import { BeanPassResons } from 'types';
import { message } from 'antd';
import ShowNFTModal from 'components/CommonModal/ShowNFTModal';
import CountDownModal from 'components/CommonModal/CountDownModal';

export default function Game() {
  const [translate, setTranslate] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const firstNode = checkerboardData[5][4];
  const firstNodePosition: [number, number] = [5, 4];
  const linkedList = useRef<CheckerboardList>();

  const [currentNode, setCurrentNode] = useState<CheckerboardNode>();

  const { isMobile, isLogin } = useGetState();

  const [disabled, setDisabled] = useState<boolean>(false);
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
        setDisabled(false);
        setShowAdd(true);
        clearTimeout(timer);
      }, ANIMATION_DURATION);
    }

    if (currentNode) {
      setCurrentNode(currentNode);
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

  const go = () => {
    if (disabled) return;
    setDisabled(true);
    setShowAdd(false);
    jump(3);
  };

  const address = useAddress();

  const router = useRouter();

  const initCheckBeanPass = useCallback(async () => {
    const hasBeanPass: any = await CheckBeanPass('2HXqRXoAVdJmGbhpwuRFUKgACBypE9gMU696qoyhZzh348gyNt');
    console.log('hasBeanPass', hasBeanPass); //{value:true/false}
    // if (hasBeanPass.value) {
    //   setBeanPassModalType(GetBeanPassStatus.Display);
    //   setBeanPassModalVisible(true);
    //   return;
    // }
    // const BeanPassClaimClaimableRes = await getBeanPassClaimClaimable({
    //   token: '',
    //   caAddress: address,
    //   CaHash: '',
    // });
    // console.log('BeanPassClaimClaimableRes', BeanPassClaimClaimableRes);
    // const { claimable, reason } = BeanPassClaimClaimableRes;
    // if (claimable) {
    //   setBeanPassModalType(GetBeanPassStatus.Abled);
    // } else {
    //   if (reason === BeanPassResons.Claimed) {
    //     setBeanPassModalType(GetBeanPassStatus.Noneleft);
    //   } else if (reason === BeanPassResons.InsufficientElfAmount) {
    //     setBeanPassModalType(GetBeanPassStatus.Recharge);
    //   } else if (reason === BeanPassResons.DoubleClaim) {
    //     setBeanPassModalType(GetBeanPassStatus.Notfound);
    //   }
    // }
    // setBeanPassModalVisible(true);
  }, [address]);

  const handleConfirm = async () => {
    if (beanPassModalType === GetBeanPassStatus.Abled) {
      const getNFTRes = await receiveBeanPassNFT({
        token: '',
        caAddress: address,
        CaHash: '',
      });
      const { claimable, reason } = getNFTRes;
      if (!claimable) {
        message.error(reason);
      }
    } else if (beanPassModalType === GetBeanPassStatus.Recharge) {
      //open asset
    }
  };

  const { initializeContract } = useWebLogin({});

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    } else {
      initializeContract();
    }
  }, [isLogin, router]);

  useEffect(() => {
    initCheckBeanPass();
    initCheckerboard();
  }, [checkerboardData]);

  useEffect(() => {
    window.addEventListener('resize', initCheckerboard);
    return () => {
      window.removeEventListener('resize', initCheckerboard);
    };
  }, []);

  return (
    <div className={`${styles.game} ${isMobile && 'flex-col'}`}>
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
          <div className="relative z-30">
            {isMobile && <Board />}

            <Role
              id="animationId"
              width={`calc(100% / ${checkerboardData?.[0]?.length})`}
              translate={translate}
              bean={currentNode?.info.info.bean}
              animationDuration={ANIMATION_DURATION}
              showAdd={showAdd}
              hideAdd={hideAdd}>
              {/* <Lottie lottieRef={animationRef} animationData={dataAnimation} /> */}
              <RoleImg />
            </Role>

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
            <Board go={go} />
          </div>
        </div>
      )}

      {isMobile && <GoButton disabled={disabled} go={go} />}
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
