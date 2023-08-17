export default function SideBorder({ side = 'left' }: { side?: 'left' | 'right' }) {
  const sideBg = {
    left: 'bg-[url(/images/recreation/side-bg-left.svg)]',
    right: 'bg-[url(/images/recreation/side-bg-right.svg)]',
  };
  return <div className={`h-full w-[16px] ${sideBg[side]} bg-[100%_auto] bg-repeat-y`}></div>;
}
