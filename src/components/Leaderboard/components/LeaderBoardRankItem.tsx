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
      className={[
        "w-full rounded-3xl shadow-inner border border-[#003658] flex p-1 items-center mb-2 relative before:absolute before:top-2 before:left-2 before:right-2 before:bg-white before:bg-opacity-30 before:rounded-2xl",
        bgClassName,
        isMobile ? "h-24 before:h-10" : "h-32 before:h-14",
      ].join(" ")}
      style={{
        boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.12), 0px -3px 0px 0px ${shadowInsetColor} inset`,
      }}
    >
      <img className="h-full" src={src} />
      <div
        className={[
          "text-white font-normal leading-none flex-grow ml-2 font-paytone",
          textClassName,
          isMobile ? "text-2xl" : "text-4xl",
        ].join(" ")}
      >
        {address}
      </div>
      <div
        className={[
          "text-white font-normal leading-none font-paytone",
          textClassName,
          isMobile ? "text-2xl" : "text-4xl",
        ].join(" ")}
      >
        {beans.toLocaleString()}
      </div>
      <img
        className={isMobile ? "h-8 mx-3" : "h-16 mx-8"}
        src={require("../images/bean.png").default.src}
      />
    </div>
  );
};
