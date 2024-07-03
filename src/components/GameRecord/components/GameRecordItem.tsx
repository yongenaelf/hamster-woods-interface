import { Disclosure } from '@headlessui/react';
import { BuyChanceItem, IGameItem, ITransactionInfo } from '../data/useGameHistory';
import { copyText } from 'utils/copyText';
import { middleEllipsis } from 'utils/middleEllipsis';
import { useIsMobile } from 'redux/selector/mobile';
import { getDateFormat } from 'utils/getDateFormat';
import { formatElfValue } from 'utils/formatElfValue';
import { useSelector, AppState } from 'redux/store';
import useGetState from 'redux/state/useGetState';
import openPage from 'utils/openPage';
import Image from 'next/image';
import copy from 'assets/images/copy-grey.png';
import { divDecimalsStr } from 'utils/calculate';

const explorerSelector = (state: AppState) => state.configInfo.configInfo?.explorerBaseUrl;

const GameRecordItemChild = ({ data, title }: { data: ITransactionInfo | null; title: string }) => {
  const explorerBaseUrl = useSelector(explorerSelector);

  const { isMobile } = useGetState();

  if (!data) return null;

  return (
    <div className={`mb-2 w-full rounded-2xl bg-[#DEC49D] p-4 text-[#AE694C] ${isMobile ? 'text-xs' : ''}`}>
      <table className="w-full">
        <thead>
          <tr>
            <th className="pb-4">{title}</th>
            <th className="pb-4 text-right">
              <a
                className="text-[#AE694C] underline"
                onClick={() => openPage(`${explorerBaseUrl}${data.transactionId}`)}
                target="_blank"
                rel="noopener noreferrer">
                View on Explorer
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-[#AE694C] text-opacity-60">Time</td>
            <td className="text-right">{getDateFormat(data.triggerTime, 'MMM dd HH:mm:ss')}</td>
          </tr>
          <tr>
            <td className="text-[#AE694C] text-opacity-60">Status</td>
            <td className="text-right">Confirmed</td>
          </tr>
          <tr>
            <td className="text-[#AE694C] text-opacity-60">Transaction Fee</td>
            <td className="text-right">{formatElfValue(data.transactionFee)} ELF</td>
          </tr>
          <tr>
            <td className="text-[#AE694C] text-opacity-60">Transaction ID</td>
            <td className="text-right">
              {middleEllipsis(data.transactionId)}{' '}
              <button onClick={() => copyText(data.transactionId)}>
                <Image alt="copy" src={copy || ''} width={14} height={14} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Wrapper = (props: React.HTMLProps<HTMLDivElement>) => (
  <div {...props} className="mb-2 w-full rounded-2xl bg-[#E8D1AE] p-4" />
);

export const GameRecordItem = ({ data }: { data: IGameItem }) => {
  const isMobile = useIsMobile();
  const { gridNum, score, transcationFee, playTransactionInfo, bingoTransactionInfo } = data;

  const triggerTime = playTransactionInfo?.triggerTime || bingoTransactionInfo?.triggerTime;

  return (
    <Disclosure as={Wrapper}>
      {({ open }) => (
        <div className="text-left bg-[#E8D1AE] ">
          <div className="flex justify-between pb-4">
            {triggerTime && (
              <div
                className={`text-lg font-bold  leading-normal text-[#AE694C] ${
                  isMobile ? 'text-[1rem]' : 'text-[2.5rem]'
                }`}>
                {getDateFormat(triggerTime, 'dd MMM')}
              </div>
            )}
            {triggerTime && (
              <div className="text-md text-right text-[#AE694C] text-opacity-60">
                {getDateFormat(triggerTime, 'HH:mm:ss')}
              </div>
            )}
          </div>
          <table className="mb-4 w-full">
            <thead>
              <tr className={`text-[#AE694C] text-opacity-60 ${isMobile ? 'text-[.7rem]' : 'text-md'}`}>
                <th>Random step result</th>
                <th>$ACORNS earned</th>
                <th className="text-right">Transaction fee</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-bold text-[#AE694C]">
                <td>{gridNum}</td>
                <td>{score}</td>
                <td className="text-right">{formatElfValue(transcationFee)} ELF</td>
              </tr>
            </tbody>
          </table>
          {!open ? (
            <Disclosure.Button className="py-2 font-bold text-[#953D22]">More &#x25BC;</Disclosure.Button>
          ) : null}
          <Disclosure.Panel>
            <GameRecordItemChild data={playTransactionInfo} title="Play" />
            {bingoTransactionInfo ? <GameRecordItemChild data={bingoTransactionInfo} title="Bingo" /> : null}
            {open ? <Disclosure.Button className="py-2 text-[#953D22]">Pack up &#x25B2;</Disclosure.Button> : null}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export const BuyRecordItem = ({ data }: { data: BuyChanceItem }) => {
  const isMobile = useIsMobile();
  const { cost, chance, decimals, transactionFee, transactionInfo } = data;

  const triggerTime = transactionInfo?.triggerTime || transactionInfo?.triggerTime;

  return (
    <Disclosure as={Wrapper}>
      {({ open }) => (
        <div className="text-left bg-[#E8D1AE] ">
          <div className="flex justify-between pb-4">
            {triggerTime && (
              <div
                className={`text-lg font-bold  leading-normal text-[#AE694C] ${
                  isMobile ? 'text-[1rem]' : 'text-[2.5rem]'
                }`}>
                {getDateFormat(triggerTime, 'dd MMM')}
              </div>
            )}
            {triggerTime && (
              <div className="text-md text-right text-[#AE694C] text-opacity-60">
                {getDateFormat(triggerTime, 'HH:mm:ss')}
              </div>
            )}
          </div>
          <table className="mb-4 w-full">
            <thead>
              <tr className={`text-[#AE694C] text-opacity-60 ${isMobile ? 'text-[.7rem]' : 'text-md'}`}>
                <th>Hopping chance purchased</th>
                <th>$ACORNS cost</th>
                <th className="text-right">Transaction fee</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-bold text-[#AE694C]">
                <td>{chance}</td>
                <td>{divDecimalsStr(cost, decimals)}</td>
                <td className="text-right">{formatElfValue(transactionFee)} ELF</td>
              </tr>
            </tbody>
          </table>
          {!open ? (
            <Disclosure.Button className="py-2 font-bold text-[#953D22]">More &#x25BC;</Disclosure.Button>
          ) : null}
          <Disclosure.Panel>
            <GameRecordItemChild data={transactionInfo} title="Play" />
            {transactionInfo ? <GameRecordItemChild data={transactionInfo} title="Bingo" /> : null}
            {open ? <Disclosure.Button className="py-2 text-[#953D22]">Pack up &#x25B2;</Disclosure.Button> : null}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};
