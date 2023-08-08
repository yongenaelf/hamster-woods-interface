import { useIsMobile } from "redux/selector/mobile";
import { IRankResult } from "../data/rankResult";
import { LeaderBoardItem } from "./LeaderBoardItem";

export const TabContent = ({
  data,
  refreshTime,
}: {
  data?: IRankResult;
  refreshTime: string;
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="mb-2 w-full flex-grow rounded-2xl bg-blue-400 p-2 shadow-inner">
      <div className="flex h-full w-full flex-col rounded-2xl bg-blue-700 p-4 shadow-inner">
        <div className="mb-4 mt-2 flex justify-between">
          <div
            className={`font-roboto text-white opacity-60 ${
              isMobile ? "text-md" : "text-3xl"
            }`}
          >
            Refresh Time: {refreshTime}
          </div>
          <div
            className={`text-right font-roboto leading-none text-white underline opacity-60 ${
              isMobile ? "text-md" : "text-3xl"
            }`}
          >
            Reward
          </div>
        </div>
        <div className="-mr-8 h-1 flex-grow overflow-y-scroll">
          <div className="h-full overflow-y-auto">
            {data?.rankingList.map((i) => (
              <LeaderBoardItem
                key={i.rank}
                rank={i.rank}
                address={i.caAddress}
                beans={i.score}
              />
            ))}
          </div>
        </div>
        <div className="flex h-24 items-center">
          <div
            className={[
              "ml-4 rounded-3xl bg-white p-1 text-center font-bold text-slate-500",
              isMobile ? "mr-4 w-16 text-3xl" : "mr-6 w-24 text-4xl",
            ].join(" ")}
          >
            {data?.selfRank.rank || 100 > 99 ? "99+" : data?.selfRank.rank}
          </div>
          <div
            className={[
              "text-white",
              isMobile ? "text-md mr-2" : "mr-4 text-3xl",
            ].join(" ")}
          >
            {data?.selfRank.caAddress}
          </div>
          <div className="flex-grow">
            <img
              className="w-16"
              src={require("../images/me.png").default.src}
              alt="me"
            />
          </div>
          <div
            className={[
              "font-normal leading-none text-white",
              isMobile ? "text-2xl" : "text-3xl",
            ].join(" ")}
          >
            {(data?.selfRank.score || 0).toLocaleString()}
          </div>
          <img
            className={isMobile ? "mx-3 h-8" : "mx-8 h-16"}
            src={require("../images/bean.png").default.src}
          />
        </div>
      </div>
    </div>
  );
};
