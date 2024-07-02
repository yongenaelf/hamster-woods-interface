import Image from 'next/image';
import styles from './style.module.css';
import CommonBtn from 'components/CommonBtn';
import { useState } from 'react';
import useGetState from 'redux/state/useGetState';
import CustomModal from 'components/CustomModal';
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
      <CustomModal
        open={rulesVisible}
        title="Game Rules"
        onCancel={() => {
          setRulesVisible(false);
        }}
        className={`${styles.rulesModal}`}>
        <div
          className={`h-[312px] overflow-auto text-left text-base leading-6 md:h-[288px] md:text-[24px] md:leading-[32px] w-full ${
            isMobile ? 'text-base leading-6' : styles.content
          }`}>
          {configInfo?.gameRules.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </div>
        <CommonBtn
          title="I know"
          className={`font-fonarto flex items-center justify-center ${
            isMobile
              ? 'mt-[24px] text-[20px] leading-[20px]'
              : 'mt-[40px] mx-[64px] !text-[32px] !leading-[40px] !h-[76px]'
          }`}
          onClick={() => {
            setRulesVisible(false);
          }}></CommonBtn>
      </CustomModal>
    </>
  );
}
