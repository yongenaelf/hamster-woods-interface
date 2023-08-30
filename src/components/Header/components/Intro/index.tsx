import Image from 'next/image';
import styles from './style.module.css';
import CommonBtn from 'components/CommonBtn';
import CommonModal from 'components/CommonModal';
import { useState } from 'react';
import useGetState from 'redux/state/useGetState';
export default function Intro() {
  const [rulesVisible, setRulesVisible] = useState(false);
  const { isMobile, configInfo } = useGetState();

  return (
    <>
      <Image
        src={require('assets/images/header-intro.png')}
        alt=""
        className={`${isMobile ? styles.intro : styles['intro-pc']}`}
        onClick={() => setRulesVisible(true)}
      />
      <CommonModal
        open={rulesVisible}
        title="Game Rules"
        width={850}
        onCancel={() => {
          setRulesVisible(false);
        }}
        className={styles.rulesModal}>
        <div className="h-[312px] overflow-auto text-left text-base leading-6 md:h-[288px] md:text-[24px] md:leading-[32px]">
          {configInfo?.gameRules.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
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
