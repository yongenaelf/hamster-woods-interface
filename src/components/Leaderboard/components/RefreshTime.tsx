import Countdown from 'react-countdown';

interface IRefreshTime {
  refreshTime: string;
  text: string;
}
export const RefreshTime = ({ refreshTime, text }: IRefreshTime) => {
  return (
    <>
      <span className="mr-4 inline-flex h-[1.2em] w-[1.2em] justify-center rounded-full bg-[#5197FF] font-fonarto text-white text-stroke-black font-bold">
        i
      </span>
      <span className="text-white opacity-60">
        {text}
        <Countdown
          date={refreshTime}
          zeroPadDays={1}
          renderer={({ days, formatted: { hours, minutes, seconds } }) => (
            <span>
              {days}d {hours}:{minutes}:{seconds}
            </span>
          )}
        />
      </span>
    </>
  );
};
