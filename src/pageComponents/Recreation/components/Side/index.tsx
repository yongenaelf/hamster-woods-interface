export default function Side({ side = 'left' }: { side?: 'left' | 'right' }) {
  const sideBg = {
    left: 'bg-[url(/images/recreation/side-bg-left.svg)]',
    right: 'bg-[url(/images/recreation/side-bg-right.svg)]',
  };
  return <div className={`w-[1.6rem] h-full ${sideBg[side]} bg-repeat-y`}></div>;
}
