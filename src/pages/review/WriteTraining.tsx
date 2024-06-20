import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Write.module.scss';
import InputDate from '@/components/elements/InputDate';
import Input from '../../components/elements/Input';
import ScoreStar from '@/components/ScoreStar';
import Button from '@/components/elements/Button';
import test from 'node:test';

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
      <form className={styles.form_wrap}>
        <div className={styles.multiple_choice}>
          <div className={styles.work_info_wrap}>
            <h1 className="title">근무정보</h1>
            <div className={styles.work_info_content}>
              <div className={styles.period}>
                <div className={styles.label}>
                  <div className="subtitle">근무기간</div>
                  <div>
                    <input type="checkbox" />
                    <label>재직중</label>
                  </div>
                </div>
                <div className={styles.date_pickr}>
                  <InputDate name="start_date" minDate="1950-01-01"></InputDate>
                  <InputDate name="end_date" minDate="2000-01-01"></InputDate>
                </div>
              </div>
              <div className={styles.work_type}>
                <div className="subtitle">근무직종</div>
                <select>
                  <option selected disabled hidden>
                    직종 선택
                  </option>
                  <option>직종 선택</option>
                </select>
              </div>
              <div>
                <div className="subtitle">키워드 선택</div>
                <div className={styles.keyword}></div>
              </div>
            </div>
          </div>
          <div className={styles.score_wrap}>
            <h1 className="title">평가하기</h1>
            <div className={styles.score_content}>
              <div className={styles.score_item}>
                <div className="subtitle">성장가능성</div>
                <div className={styles.score_star}>
                  <ScoreStar
                    readonly={false}
                    fontsize={'40px'}
                    value={3.5}
                  ></ScoreStar>
                  <div className="banner_title">3.5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.total_score}>
          <h1 className="title">총점</h1>
          <ScoreStar readonly={true} fontsize={'40px'} value={3.0}></ScoreStar>
          <div className="banner_title">3.0</div>
        </div>
        <div className={styles.subjective}>
          <h1 className="title">상세평가</h1>
          <div className={styles.subjective_content}>
            <div className={styles.subjective_item}>
              <h1 className="subtitle">한줄평</h1>
              <textarea
                minLength={2}
                maxLength={50}
                placeholder="한줄평을 2~15자로 작성해주세요"
              ></textarea>
            </div>
            <div className={styles.subjective_item}>
              <h1 className="subtitle">근무기관 장점</h1>
              <textarea
                className={styles.long_text}
                rows={10}
                minLength={30}
                maxLength={2000}
                placeholder="근무했던 기관의 장점을 작성해주세요.(최소 30자)"
              ></textarea>
              <p className="subtxt">현재 글자수: 000자</p>
            </div>
            <div className={styles.subjective_item}>
              <h1 className="subtitle">근무기관 단점</h1>
              <textarea
                className={styles.long_text}
                rows={10}
                minLength={30}
                maxLength={2000}
                placeholder="근무했던 기관의 단점을 작성해주세요.(최소 30자)"
              ></textarea>
              <p className="subtxt">현재 글자수: 000자</p>
            </div>
          </div>
        </div>
        <div className={styles.submit_btn}>
          <Button
            children="제출"
            className={`${'btn_condition_false'}`}
            style={{ minWidth: '110px', height: '60px' }}
            isDisabled={true}
            onClick={test}
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default WriteTraining;
