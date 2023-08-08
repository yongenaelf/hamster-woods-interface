import { useIsMobile } from "redux/selector/mobile";

export const LeaderBoardRankItem = ({
  src,
  bgClassName,
  textClassName,
  shadowInsetColor,
  address = "-",
  beans = 0,
}: {
  src: string;
  bgClassName: string;
  textClassName: string;
  shadowInsetColor: string;
  address: string;
  beans: number;
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`relative mb-2 flex w-full items-center rounded-3xl border border-[#003658] p-1 shadow-inner before:absolute before:left-2 before:right-2 before:top-2 before:rounded-2xl before:bg-white before:bg-opacity-30 ${bgClassName} ${
        isMobile ? "h-24 before:h-10" : "h-32 before:h-14"
      }`}
      style={{
        boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.12), 0px -3px 0px 0px ${shadowInsetColor} inset`,
      }}
    >
      <img className="h-full" src={src} />
      <div
        className={`ml-2 flex-grow font-paytone font-normal leading-none text-white ${textClassName} ${
          isMobile ? "text-2xl" : "text-4xl"
        }`}
      >
        {address}
      </div>
      <div
        className={`font-paytone font-normal leading-none text-white ${textClassName} ${
          isMobile ? "text-2xl" : "text-4xl"
        }`}
      >
        {beans.toLocaleString()}
      </div>
      <img
        className={isMobile ? "mx-3 h-8" : "mx-8 h-16"}
        src={require("../images/bean.png").default.src}
      />
    </div>
  );
};
