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
    <div className="w-full flex-grow bg-blue-400 rounded-2xl shadow-inner p-2 mb-2">
      <div className="w-full h-full bg-blue-700 shadow-inner rounded-2xl p-4 flex flex-col">
        <div className="flex justify-between mb-4 mt-2">
          <div
            className={[
              "opacity-60 text-white font-roboto",
              isMobile ? "text-md" : "text-3xl",
            ].join(" ")}
          >
            Refresh Time: {refreshTime}
          </div>
          <div
            className={[
              "opacity-60 text-right text-white underline leading-none font-roboto",
              isMobile ? "text-md" : "text-3xl",
            ].join(" ")}
          >
            Reward
          </div>
        </div>
        <div className="flex-grow overflow-y-scroll h-1 -mr-8">
          <div className="overflow-y-auto h-full">
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
              "bg-white rounded-3xl text-center font-bold text-slate-500 p-1 ml-4",
              isMobile ? "w-16 text-3xl mr-4" : "w-24 text-4xl mr-6",
            ].join(" ")}
          >
            {data?.selfRank.rank || 100 > 99 ? "99+" : data?.selfRank.rank}
          </div>
          <div
            className={[
              "text-white",
              isMobile ? "mr-2 text-md" : "mr-4 text-3xl",
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
              "text-white font-normal leading-none",
              isMobile ? "text-2xl" : "text-3xl",
            ].join(" ")}
          >
            {(data?.selfRank.score || 0).toLocaleString()}
          </div>
          <img
            className={isMobile ? "h-8 mx-3" : "h-16 mx-8"}
            src={require("../images/bean.png").default.src}
          />
        </div>
      </div>
    </div>
  );
};
