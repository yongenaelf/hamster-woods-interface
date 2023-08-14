import { Disclosure } from '@headlessui/react';
import { IGameItem } from '../data/useGameHis';
import { parseISO, format } from 'date-fns';
import { useMemo } from 'react';
import { copyText } from 'utils/copyText';
import { middleEllipsis } from 'utils/middleEllipsis';
import { useIsMobile } from 'redux/selector/mobile';

const Wrapper = (props: React.HTMLProps<HTMLDivElement>) => (
  <div
    {...props}
    className="mb-2 w-full rounded-2xl bg-[#5197FF] p-4 font-roboto shadow-[0px_1px_2px_0px_#64A2FF_inset,0px_-1px_2px_0px_#3A80E8_inset]"
  />
);

export const GameRecordItem = ({ data }: { data: IGameItem }) => {
  const isMobile = useIsMobile();
  const { GridNum, Score, TranscationFee, PlayTransactionInfo, BingoTransactionInfo } = data;

  const playTransactionDate = useMemo(
    () => parseISO(PlayTransactionInfo.TriggerTime),
    [PlayTransactionInfo.TriggerTime],
  );
  const bingoTransactionDate = useMemo(
    () => parseISO(BingoTransactionInfo.TriggerTime),
    [BingoTransactionInfo.TriggerTime],
  );

  return (
    <Disclosure as={Wrapper}>
      {({ open }) => (
        <>
          <div className="flex justify-between pb-4">
            <div
              className={`text-lg font-bold leading-normal text-white ${isMobile ? 'text-[1rem]' : 'text-[2.5rem]'}`}>
              {format(bingoTransactionDate, 'dd MMM')}
            </div>
            <div className="text-md text-right text-white text-opacity-60">
              {format(bingoTransactionDate, 'HH:mm:ss')}
            </div>
          </div>
          <table className="mb-4 w-full">
            <thead>
              <tr className={`text-white text-opacity-60 ${isMobile ? 'text-[1rem]' : 'text-md'}`}>
                <th className="pb-2 text-left">Random step result</th>
                <th className="text-left">Earn points</th>
                <th className="text-right">Transaction Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-bold text-white">
                <td>{GridNum}</td>
                <td>{Score}</td>
                <td className="text-right">{TranscationFee} ELF</td>
              </tr>
            </tbody>
          </table>
          {!open ? (
            <Disclosure.Button className="py-2 font-bold text-[#003658]">More &#x25BC;</Disclosure.Button>
          ) : null}
          <Disclosure.Panel>
            {[PlayTransactionInfo, BingoTransactionInfo].map((i, key) => (
              <div key={key} className="mb-2 w-full rounded-2xl bg-[#144CEA] p-4 text-white">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="pb-4 text-left">Roll</th>
                      <th className="pb-4 text-right">
                        <a href="#" className="text-white underline" target="_blank" rel="noopener noreferrer">
                          View on Explore
                        </a>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-white text-opacity-60">Date</td>
                      <td className="text-right">{format(playTransactionDate, 'MMM dd HH:mm:ss')}</td>
                    </tr>
                    <tr>
                      <td className="text-white text-opacity-60">Status</td>
                      <td className="text-right">Confirmed</td>
                    </tr>
                    <tr>
                      <td className="text-white text-opacity-60">Transaction Fee</td>
                      <td className="text-right">{i.TranscationFee} ELF</td>
                    </tr>
                    <tr>
                      <td className="text-white text-opacity-60">Transaction ID</td>
                      <td className="text-right">
                        {middleEllipsis(i.TransactionId)}{' '}
                        <button onClick={() => copyText(i.TransactionId)}>
                          <img src={require('assets/images/copy.png').default.src} alt="copy" className="h-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
            {open ? <Disclosure.Button className="py-2 text-[#003658]">Pack up &#x25B2;</Disclosure.Button> : null}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
