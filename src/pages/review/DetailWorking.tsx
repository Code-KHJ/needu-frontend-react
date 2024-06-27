import React from 'react';
import styles from './Detail.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import ScoreStar from '@/components/ScoreStar';
import { StarList } from '@/common/StarList';
import ScoreBar from '@/components/ScoreBar';

const DetailWorking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const corpName = queryParams.get('name');
  const navigate = useNavigate();
  console.log(corpName);
  const clickTab = (type: string) => {
    navigate(`/review/detail/${type}?name=${corpName}`);
  };

  const starList = StarList.working;

  return (
    <div className={styles.detail_working_wrap}>
      <div className={styles.corp_info}>
        <h1 className={styles.corp_name}>서울특별시사회복지사협회</h1>
        <p className={`.body1 ${styles.corp_location}`}>서울시 영등포구</p>
        <p className={styles.hashtag}>해시태그</p>
      </div>
      <section>
        <div className={styles.tab}>
          <div
            className={`${
              location.pathname == '/review/detail/working'
                ? styles.current
                : ''
            }`}
            onClick={() => clickTab('working')}
          >
            <h4>전현직리뷰</h4>
          </div>
          <div
            className={`${
              location.pathname == '/review/detail/training'
                ? styles.current
                : ''
            }`}
            onClick={() => clickTab('training')}
          >
            <h4>실습리뷰</h4>
          </div>
        </div>
        <div className={styles.summary_wrap}>
          <div className={styles.star_wrap}>
            <div className={styles.total}>
              <ScoreStar
                name="total_score"
                tabsize="40px"
                readonly={true}
                value={3}
                onChange={() => {}}
              />
              <h1>3.0</h1>
              <span className={`body1 ${styles.cnt}`}>000개 리뷰</span>
            </div>
            <div className={styles.score_list}>
              {starList.map((item) => (
                <div className={styles.score_item}>
                  <h5>{item.ko}</h5>
                  <div className={styles.score_score}>
                    <p>3.0</p>
                    <ScoreBar width="160px" value={3.5}></ScoreBar>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.write_review}>
            <p>이 기관에 대해 나눠주실 경험이 있으신가요?</p>
            <button type="button">리뷰하러 가기</button>
          </div>
        </div>
        <div>리뷰 리스트</div>
      </section>
    </div>
  );
};

export default DetailWorking;
