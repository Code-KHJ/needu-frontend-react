import React from "react";
import ico_rising_01 from "@/assets/images/ico_rising_01.png";
import ico_rising_02 from "@/assets/images/ico_rising_02.png";
import ico_rising_03 from "@/assets/images/ico_rising_03.png";
import ico_rising_04 from "@/assets/images/ico_rising_04.png";
import ico_rising_05 from "@/assets/images/ico_rising_05.png";
import ico_rising_06 from "@/assets/images/ico_rising_06.png";
import ico_rising_07 from "@/assets/images/ico_rising_07.png";
import ico_rising_08 from "@/assets/images/ico_rising_08.png";
import ico_rising_09 from "@/assets/images/ico_rising_09.png";
import ico_rising_10 from "@/assets/images/ico_rising_10.png";
import ico_rising_11 from "@/assets/images/ico_rising_11.png";

interface HotCorpsProps {
  criteria: string;
}
const HotCorps: React.FC<HotCorpsProps> = ({ criteria }) => {
  switch (criteria) {
    case "working5":
      return (
        <>
          <img src={ico_rising_01} />
          <span>전현직 만점 평가 기관</span>
        </>
      );
    case "training5":
      return (
        <>
          <img src={ico_rising_01} />
          <span>실습생 만점 평가 기관</span>
        </>
      );
    case "working4":
      return (
        <>
          <img src={ico_rising_02} />
          <span>전현직 우수 평가 기관</span>
        </>
      );
    case "training4":
      return (
        <>
          <img src={ico_rising_02} />
          <span>실습생 우수 평가 기관</span>
        </>
      );
    case "growth":
      return (
        <>
          <img src={ico_rising_03} />
          <span>성장성 우수 기관</span>
        </>
      );
    case "worth":
      return (
        <>
          <img src={ico_rising_04} />
          <span>일 가치 우수 기관</span>
        </>
      );
    case "leadership":
      return (
        <>
          <img src={ico_rising_05} />
          <span>리더십 우수 기관</span>
        </>
      );
    case "reward":
      return (
        <>
          <img src={ico_rising_06} />
          <span>급여 우수 기관</span>
        </>
      );
    case "culture":
      return (
        <>
          <img src={ico_rising_07} />
          <span>조직문화 우수 기관</span>
        </>
      );
    case "worklife":
      return (
        <>
          <img src={ico_rising_02} />
          <span>워라밸 우수 기관</span>
        </>
      );
    case "recommend":
      return (
        <>
          <img src={ico_rising_08} />
          <span>실습생 추천 우수 기관</span>
        </>
      );
    case "supervisor":
      return (
        <>
          <img src={ico_rising_09} />
          <span>수퍼비전 우수 기관</span>
        </>
      );
    case "workingReviews":
      return (
        <>
          <img src={ico_rising_10} />
          <span>전현직 리뷰 다수 기관</span>
        </>
      );
    case "trainingReviews":
      return (
        <>
          <img src={ico_rising_10} />
          <span>실습생 리뷰 다수 기관</span>
        </>
      );
    default:
      return (
        <>
          <img src={ico_rising_11} />
          <span>리뷰 진행중 기관</span>
        </>
      );
  }
};

export default HotCorps;
