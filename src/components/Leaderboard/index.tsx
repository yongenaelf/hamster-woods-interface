import { useState, Fragment } from "react";
import { WeeklyTabContent } from "./components/WeeklyTabContent";
import { SeasonTabContent } from "./components/SeasonTabContent";
import { Modal } from "components/Modal";
import { PastRecordContent } from "./components/PastRecordContent";
import { useIsMobile } from "redux/selector/mobile";

enum Tabs {
  Weekly = "Weekly",
  Season = "Season",
  PastRecord = "Past Record",
}

const _tabClassName =
  "w-1/3 rounded-tl-lg rounded-tr-lg shadow-inner text-white flex items-center justify-center text-stroke-black font-paytone";

export const Leaderboard = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tabs>(Tabs.Weekly);
  const isMobile = useIsMobile();

  const tabClassName = [
    _tabClassName,
    isMobile ? "text-md p-2" : "text-4xl p-4",
  ].join(" ");

  return (
    <Fragment>
      <button className="fixed top-32 right-0" onClick={() => setOpen(true)}>
        <img
          className={isMobile ? "w-32" : "w-64"}
          src={require("./images/leaderboard-icon.png").default.src}
          alt="open Leaderboard"
        />
      </button>
      <Modal isOpen={open} title="Leader Board" onClose={() => setOpen(false)}>
        <div className="flex mx-10">
          <button
            className={[
              tabClassName,
              tab === Tabs.Weekly ? "bg-blue-400" : "bg-blue-700",
            ].join(" ")}
            onClick={() => setTab(Tabs.Weekly)}
          >
            {Tabs.Weekly}
          </button>
          <button
            className={[
              tabClassName,
              tab === Tabs.Season ? "bg-blue-400" : "bg-blue-700",
            ].join(" ")}
            onClick={() => setTab(Tabs.Season)}
          >
            {Tabs.Season}
          </button>
          <button
            className={[
              tabClassName,
              tab === Tabs.PastRecord ? "bg-blue-400" : "bg-blue-700",
            ].join(" ")}
            onClick={() => setTab(Tabs.PastRecord)}
          >
            {Tabs.PastRecord}
          </button>
        </div>
        {tab === Tabs.Weekly ? <WeeklyTabContent /> : null}
        {tab === Tabs.Season ? <SeasonTabContent /> : null}
        {tab === Tabs.PastRecord ? <PastRecordContent /> : null}
      </Modal>
    </Fragment>
  );
};

export default Leaderboard;
