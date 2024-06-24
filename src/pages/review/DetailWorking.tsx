import React from 'react';
import styles from './Detail.module.scss';

const DetailWorking = () => {
  return (
    <div className={styles.detail_working_wrap}>
      <div className={styles.corp_info}>
        <h1 className={`banner_title ${styles.corp_name}`}>
          서울특별시사회복지사협회
        </h1>
        <p className={`banner_subtitle ${styles.corp_location}`}>
          서울시 영등포구
        </p>
        <p className={styles.hashtag}>해시태그</p>
      </div>
    </div>
  );
};

export default DetailWorking;
