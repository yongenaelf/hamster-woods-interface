export function formatTime({
  minDigits = 2,
  showSecond = true,
  hours,
  minutes,
  seconds,
}: {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
  showSecond?: boolean;
  minDigits?: number;
}) {
  if (minDigits === 1) {
    return `${hours}:${minutes}${showSecond ? `:${seconds}` : ''}`;
  } else {
    return `${timeFillDigits(hours)}:${timeFillDigits(minutes)}${showSecond ? `:${timeFillDigits(seconds)}` : ''}`;
  }
}

export function timeFillDigits(n: number | string) {
  return `${String(n).length < 2 ? `0${n}` : n}`;
}
