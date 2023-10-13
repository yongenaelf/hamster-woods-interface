import Countdown from 'react-countdown';

interface IRefreshTime {
  refreshTime: string;
  text: string;
}
export const RefreshTime = ({ refreshTime, text }: IRefreshTime) => {
  const date = !refreshTime.endsWith('Z') ? `${refreshTime}Z` : refreshTime;

  return (
    <>
      {text}
      <Countdown
        date={date}
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
