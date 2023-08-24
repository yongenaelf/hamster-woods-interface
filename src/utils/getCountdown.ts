const MILLISECOND_CONVERT_SECOND = 1000;
const SECOND_CONVERT_HOUR = 60 * 60;

export default function getCountdown() {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  // tomorrow.setUTCHours(0, 0, 0, 0);

  const timeDiff = tomorrow.getTime() - now.getTime();

  const seconds = Math.floor(timeDiff / MILLISECOND_CONVERT_SECOND);

  let hours = Math.floor(seconds / SECOND_CONVERT_HOUR);
  const minutes = Math.floor((seconds % SECOND_CONVERT_HOUR) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 24) {
    hours -= 24;
  }

  return {
    hours: hours,
    minutes: minutes,
    seconds: remainingSeconds,
  };
}
