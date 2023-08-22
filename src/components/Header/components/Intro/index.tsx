import Image from 'next/image';
import styles from './style.module.css';
import CommonBtn from 'components/CommonBtn';
import CommonModal from 'components/CommonModal';
import { useState } from 'react';
export default function Intro() {
  const [rulesVisible, setRulesVisible] = useState(false);
  return (
    <>
      <Image
        src={require('assets/images/header-intro.png')}
        alt=""
        className={styles.intro}
        onClick={() => setRulesVisible(true)}
      />
      <CommonModal
        open={rulesVisible}
        title="Game Rules"
        onCancel={() => {
          setRulesVisible(false);
        }}
        className={styles.rulesModal}>
        <div className="h-[312px] overflow-auto text-left text-base leading-6 md:h-[288px] md:text-[24px] md:leading-[32px]">
          <p>1.Game Start: Each player initially has 1,500 yuan as an asset or 15,000 yuan as an asset.</p>
          <p>
            2.Roll Dice: Roll two dice at the same time each time. if the two dice have the same number of points, you
            can roll one more time. If you are imprisoned in this turn, the extra turn will be cancelled. Directly
            imprisoned for three consecutive identical points.
          </p>
          <p> 3.Game Start: Each player initially has 1,500 yuan as an asset or 15,000 yuan as an asset.</p>
        </div>
        <CommonBtn
          title="I know"
          className="mx-3 mx-auto mt-6 md:!h-[77.5px] md:w-[360px] md:!rounded-[38.75px] md:!text-[32px] md:!leading-[77.5px]"
          onClick={() => {
            setRulesVisible(false);
          }}></CommonBtn>
      </CommonModal>
    </>
  );
}
