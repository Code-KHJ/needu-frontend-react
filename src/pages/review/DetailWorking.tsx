import React from 'react';
import styles from './Detail.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const DetailWorking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const corpName = queryParams.get('name');
  const navigate = useNavigate();
  console.log(corpName);
  const clickTab = (type: string) => {
    navigate(`/review/detail/${type}?name=${corpName}`);
  };
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
            전현직리뷰
          </div>
          <div
            className={`${
              location.pathname == '/review/detail/training'
                ? styles.current
                : ''
            }`}
            onClick={() => clickTab('training')}
          >
            실습리뷰
          </div>
        </div>
        <div>
          <div>기관정보</div>
          <div>리뷰쓰러 가기</div>
        </div>
        <div>리뷰 리스트</div>
      </section>
    </div>
  );
};

export default DetailWorking;
