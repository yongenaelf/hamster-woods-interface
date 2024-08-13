import Leaderboard from 'components/Leaderboard';

import PageLoading from 'components/PageLoading';
import GameRecord from 'components/GameRecord';
import NoticeModal from 'components/NoticeModal';
import Task from 'components/Task';

export default function GlobalCom() {
  return (
    <>
      <Leaderboard />
      <GameRecord />
      <PageLoading />
      <NoticeModal />
      <Task />
    </>
  );
}
