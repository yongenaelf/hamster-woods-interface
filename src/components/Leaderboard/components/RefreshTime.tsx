import Countdown from 'react-countdown';

interface IRefreshTime {
  refreshTime: string;
  text: string;
}
export const RefreshTime = ({ refreshTime, text }: IRefreshTime) => {
  return (
    <>
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
    </>
  );
};
