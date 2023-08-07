import { useIsMobile } from "redux/selector/mobile";

export const LeaderBoardNormalItem = ({
  rank = 4,
  address = "-",
  beans = 0,
}: {
  rank: number;
  address: string;
  beans: number;
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={[
        "w-full rounded-3xl shadow-inner border border-[#003658] flex p-1 items-center mb-2 bg-[#81A2D7]",
        "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.12),0px_-3px_0px_0px_#6D8EC3_inset]",
        isMobile ? "h-20" : "h-28",
      ].join(" ")}
    >
      <div
        className={[
          "bg-[#4F6C9B] text-white font-bold p-2 rounded-3xl ml-2 text-center font-paytone",
          isMobile ? "text-2xl w-16 mr-3" : "text-4xl w-24 mr-4",
        ].join(" ")}
      >
        {rank}
      </div>
      <div
        className={[
          "text-white flex-grow ml-2 font-roboto font-bold",
          isMobile ? "text-xl" : "text-3xl",
        ].join(" ")}
      >
        {address}
      </div>
      <div
        className={[
          "text-white font-roboto font-bold",
          isMobile ? "text-xl" : "text-3xl",
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
