import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Write.module.scss';

const WriteTraining = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  console.log(name);
  return (
    <div className={styles.write_training_wrap}>
      <div className={styles.corp_info}>
        <h1 className={`banner_title ${styles.corp_name}`}>
          서울특별시사회복지사협회
        </h1>
        <p className={`banner_subtitle ${styles.corp_location}`}>기관 주소</p>
        <p className={`banner_subtitle ${styles.corp_review_cnt}`}>
          이 기관에 <strong className={`banner_title`}>000</strong>개 리뷰가
          있어요!
        </p>
      </div>
      <div className={styles.guide}>
        <p>입력하신 모든 정보는 익명으로 처리됩니다.</p>
        <p>
          NEEDU{' '}
          <a
            href="https://neighborly-arithmetic-8e6.notion.site/NEEDU-d7cb722b6a6247d38594aff27c31c036?pvs=4"
            target="_blank"
          >
            운영가이드
          </a>
          에 위배되는 리뷰는 운영자에 의해 조치될 수 있습니다.
        </p>
        <p>
          <strong>(주의)</strong> 특정인을 향한 비방, 욕설은 법적인 문자게
          발생할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default WriteTraining;
