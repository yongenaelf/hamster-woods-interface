import { IWeeklyRankResult, ISeasonRankResult } from '../data/types';
import styles from './style.module.css';
import useGetState from 'redux/state/useGetState';
import { useIsMobile } from 'redux/selector/mobile';
import { useCallback, useMemo } from 'react';
import { LeaderboardTextColors, RankEnum } from '../data/constant';
import { middleEllipsis } from 'utils/middleEllipsis';
import { divDecimalsStr } from 'utils/calculate';

type IData = IWeeklyRankResult;
interface ILeaderBoardItemList {
  data?: IData;
}

const SettleRankItem = ({
  src,
  bgClassName,
  textClassName,
  shadowInsetColor,
  address = '-',
  score = 0,
  decimals = 0,
  isCurrentUserRank,
  imageUrl,
  balance,
}: {
  src: string;
  bgClassName: string;
  textClassName: LeaderboardTextColors;
  shadowInsetColor: string;
  address: string;
  score: number;
  decimals: number;
  imageUrl: string;
  balance: number;
  isCurrentUserRank?: boolean;
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`relative flex w-full items-center justify-between rounded-2xl border border-[#003658] p-1 shadow-inner before:absolute before:bg-white before:bg-opacity-30 ${
        isMobile
          ? 'h-12 mb-2 before:h-6 before:left-1 before:right-1 before:top-0 before:rounded-full'
          : 'h-12 mb-3 before:h-8 before:left-1 before:right-1 before:top-1 before:rounded-2xl'
      } ${bgClassName}`}
      style={{
        boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.12), 0px -3px 0px 0px ${shadowInsetColor} inset`,
      }}>
      <div className="flex-1 flex items-center">
        <img
          width={40}
          height={40}
          className={`w-[40px] h-[40px] z-10 h-full ${isMobile ? '' : 'mx-2'}`}
          src={src}
          alt="rank"
        />
        <div className={`${isMobile ? 'text-[12px]' : 'text-[20px]'} ${LeaderboardTextColors.White} font-fonarto`}>
          {middleEllipsis(address)}
        </div>
        {isCurrentUserRank ? (
          <img
            width={32}
            height={16}
            className={`z-10 ml-2`}
            src={require('assets/images/me.png').default.src}
            alt="me"
          />
        ) : null}
      </div>
      <div className="flex-1 flex justify-end items-center text-right ">
        <div className={`${isMobile ? 'text-[16px]' : 'text-[20px]'} font-fonarto ${textClassName}`}>
          {divDecimalsStr(score, decimals) ?? '-'}
        </div>
        <img width={20} className="z-10 ml-[5px] mr-4" src={require('assets/images/neat.png').default.src} alt="neat" />
      </div>
      <div className="w-[96px] mr-[24px] flex items-center justify-end gap-2">
        <img
          width={30}
          className="w-[30px] h-[30px]"
          src={require('assets/images/king-hamster.png').default.src}
          alt="neat"
        />
        <div className="text-[20px] text-white font-black">{`*${balance}`}</div>
      </div>
    </div>
  );
};

const SettleNormalItem = ({
  leftText,
  centerText,
  imageUrl,
  balance,
  decimals,
}: {
  leftText: string;
  centerText: string;
  imageUrl: string;
  balance: number;
  decimals: number;
}) => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex w-full items-center rounded-full p-1 h-10 bg-[#DEC49D] font-fonarto ${
        isMobile ? 'mb-2' : 'mb-3'
      }`}>
      <div className="flex-1 ml-2 my-2">
        <span className="max-w-fit flex justify-center items-center px-[16px] py-[2px] bg-[#B26C27] rounded-full text-[16px] text-white font-fonarto">
          {leftText}
        </span>
      </div>
      <div className="flex-1 flex justify-end items-center gap-[5px]">
        <div className="text-[20px] text-[#B26C27]">{centerText}</div>
        <img
          width={20}
          height={20}
          className="ml-[5px] mr-4 w-[20px] h-[20px]"
          src={require('assets/images/neat.png').default.src}
          alt="neat"
        />
      </div>
      <div className="w-[96px] mr-[24px] flex items-center justify-end gap-2">
        <img
          width={24}
          className="w-[24px] h-[24px]"
          src={require('assets/images/king-hamster.png').default.src}
          alt="neat"
        />
        <div className="text-[16px] text-white font-black">{`*${divDecimalsStr(balance, decimals)}`}</div>
      </div>
    </div>
  );
};

export const LeaderBoardSettleList = ({ data }: ILeaderBoardItemList) => {
  const renderSettleItem = useCallback((item: any) => {
    if (item.fromRank && item.toRank) {
      return (
        <SettleNormalItem
          leftText={`Top ${item.fromRank}-${item.toRank}`}
          centerText={`${item.fromScore?.toLocaleString()}-${item.toScore?.toLocaleString()}`}
          balance={item?.rewardNftInfo?.balance}
          decimals={item?.rewardNftInfo?.decimals}
          imageUrl={item.rewardNftInfo?.imageUrl}
        />
      );
    } else {
      if (item.rank === RankEnum.First) {
        return (
          <SettleRankItem
            src={require('assets/images/gold.png').default.src}
            bgClassName="bg-[#F5BF49]"
            textClassName={LeaderboardTextColors.Gold}
            shadowInsetColor="#DE7B3D"
            address={item.caAddress}
            score={item.score}
            decimals={item.decimals}
            balance={item.rewardNftInfo.balance}
            imageUrl={item.rewardNftInfo.imageUrl}
            isCurrentUserRank={true}
          />
        );
      }
      if (item.rank === RankEnum.Second) {
        return (
          <SettleRankItem
            src={require('assets/images/silver.png').default.src}
            bgClassName="bg-[#CEDFF7]"
            textClassName={LeaderboardTextColors.Silver}
            shadowInsetColor="#B8B8EB"
            address={item.caAddress}
            score={item.score}
            decimals={item.decimals}
            balance={item.rewardNftInfo.balance}
            imageUrl={item.rewardNftInfo.imageUrl}
            isCurrentUserRank={false}
          />
        );
      }
      if (item.rank === RankEnum.Third) {
        return (
          <SettleRankItem
            src={require('assets/images/bronze.png').default.src}
            bgClassName="bg-[#E97D3C]"
            textClassName={LeaderboardTextColors.Bronze}
            shadowInsetColor="#B5412C"
            address={item.caAddress}
            score={item.score}
            decimals={item.decimals}
            balance={item.rewardNftInfo.balance}
            imageUrl={item.rewardNftInfo.imageUrl}
            isCurrentUserRank={false}
          />
        );
      }
      return (
        <SettleNormalItem
          leftText={item.rank}
          centerText={item.score?.toLocaleString()}
          balance={item.rewardNftInfo.balance}
          decimals={item.rewardNftInfo.decimals}
          imageUrl={item.rewardNftInfo.imageUrl}
        />
      );
    }
  }, []);

  const list = useMemo(() => {
    return data?.settleDayRankingList ? data?.settleDayRankingList : data?.rankingList;
  }, [data?.rankingList, data?.settleDayRankingList]);

  return (
    <div className={`flex flex-grow w-full flex-col`}>
      <div className="h-[4px] flex-grow overflow-y-hidden">
        <div className={`${styles.scrollbar} h-full overflow-y-auto`}>
          {list?.map((item, i) => (
            <div key={i}>{renderSettleItem(item)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
