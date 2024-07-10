import React from "react";
import styles from "./Search.module.scss";

const SearchWorking = () => {
  return (
    <div className={styles.search_wrap}>
      <div className={styles.filter_wrap}>
        <div className={styles.header}>
          <h4>기관검색</h4>
          <div className={styles.detail_filter}>상세검색</div>
        </div>
        <div className={styles.filter}>
          <div className={styles.contents}>
            <div className={styles.region_corp}>
              <div className={styles.item}>
                <label>
                  <h5>지역</h5>
                </label>
                <select name="region" className={styles.value}>
                  <option value="" disabled hidden>
                    시&middot;도
                  </option>
                  <option value="서울">서울</option>
                </select>
              </div>
              <div className={styles.item}>
                <label>
                  <h5>기관명</h5>
                </label>
                <input
                  className={styles.value}
                  type="text"
                  placeholder="기관명을 입력해주세요"
                ></input>
              </div>
            </div>
            <div className={styles.item}>
              <label>
                <h5>별점</h5>
              </label>
              <div className={styles.list}>
                <span className={styles.list_item}>
                  <img src="/src/assets/images/Star_1.png" />
                </span>
                <span className={styles.list_item}>
                  <img src="/src/assets/images/Star_2.png" />
                </span>
                <span className={styles.list_item}>
                  <img src="/src/assets/images/Star_3.png" />
                </span>
                <span className={styles.list_item}>
                  <img src="/src/assets/images/Star_4.png" />
                </span>
                <span className={styles.list_item}>
                  <img src="/src/assets/images/Star_5.png" />
                </span>
              </div>
            </div>
            <div className={styles.item}>
              <label>
                <h5>해시태그</h5>
              </label>
              <div className={styles.list}>
                <span className={styles.list_item}>#역세권위치</span>
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.reset}>초기화</button>
            <button className={styles.search}>검색</button>
          </div>
        </div>
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.sort}>
          <select>
            <option>별점 높은 순</option>
            <option>리뷰 많은 순</option>
          </select>
        </div>
        <div className={styles.corp_list}>
          <ul>
            <li className={styles.corp_item}>
              <div className={styles.info}>
                <div className={styles.region}>
                  <span>서울특별시</span>
                  <span>영등포구</span>
                </div>
                <div className={styles.corp}>
                  <h4>기관명입니다</h4>
                  <div>해시태그들</div>
                </div>
              </div>
              <div className={styles.star}>
                <img src="/src/assets/images/Star_1.png" alt="star" />
                <h4>4.3</h4>
                <span className="body2">(3)</span>
              </div>
            </li>
            <li className={styles.corp_item}>
              <div className={styles.info}>
                <div className={styles.region}>
                  <span>서울특별시</span>
                  <span>영등포구</span>
                </div>
                <div className={styles.corp}>
                  <h4>기관명입니다</h4>
                  <div>해시태그들</div>
                </div>
              </div>
              <div className={styles.star}>
                <img src="/src/assets/images/Star_1.png" alt="star" />
                <h4>4.3</h4>
                <span className="body2">(3)</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.pagenation}>페이지</div>
    </div>
  );
};

export default SearchWorking;
