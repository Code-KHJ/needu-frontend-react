import React, { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import { RegionList } from '@/common/Region';
import sharedApi from '@/apis/shared';
import corpApi from '@/apis/corp';
import { CorpDto } from '@/interface/Corp';
import Pagination from '@/components/Pagination';

type Filters = {
  region: string;
  corp_name: string;
  score: number[];
  hashtags: number[];
  order: string;
  page: number;
};

const SearchWorking = () => {
  const [corps, setCorps] = useState<CorpDto[]>([]);
  const [pages, setPages] = useState<number>();

  const [filters, setFilters] = useState<Filters>({
    region: '',
    corp_name: '',
    score: [],
    hashtags: [],
    order: 'avg',
    page: 1,
  });
  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  const handleList = (name: keyof Filters, value: number) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[name] as number[];
      const filter = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return { ...prevFilters, [name]: filter };
    });
  };
  const handlePage = (value: number) => {
    setFilters({
      ...filters,
      page: value,
    });
  };
  useEffect(() => {
    fetchFilterData();
  }, [filters.page, filters.order]);

  //필터기능
  const [filterBtn, setFilterBtn] = useState(false);
  const handleFilterBtn = () => {
    setFilterBtn(!filterBtn);
  };
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setFilterBtn(true);
    } else {
      setFilterBtn(false);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //해시태그
  const [shared, setShared] = useState({
    hashtagList: [],
  });
  useEffect(() => {
    const getShared = async () => {
      const hashtagList: any = await sharedApi.getHashtagList();
      if (hashtagList.status === 200) {
        setShared({
          hashtagList: hashtagList.data,
        });
      }
    };
    getShared();
    fetchFilterData();
  }, []);

  const resetFilters = () => {
    setFilters({
      region: '',
      corp_name: '',
      score: [],
      hashtags: [],
      order: '',
      page: 1,
    });
  };

  const fetchFilterData = async () => {
    const queryParams = new URLSearchParams(filters as any);
    const response = await corpApi.getListWithWorking(
      `?${queryParams.toString()}`
    );
    setCorps(response.data.result);
    setPages(response.data.totalPages);
  };
  const search = async () => {
    if (filters.page === 1) {
      fetchFilterData();
    } else {
      setFilters({
        ...filters,
        page: 1,
      });
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      search();
    }
  };

  return (
    <div className={styles.search_wrap}>
      <div className={styles.filter_wrap}>
        <div className={styles.header}>
          <h4>기관검색</h4>
          <div className={styles.detail_filter} onClick={handleFilterBtn}>
            상세검색
          </div>
        </div>
        <div className={styles.filter} onKeyDown={handleKeyPress}>
          <div className={styles.contents}>
            <div className={styles.region_corp}>
              <div className={styles.item}>
                <label>
                  <h5>지역</h5>
                </label>
                <select
                  name="region"
                  className={styles.value}
                  value={filters.region}
                  onChange={handleFilter}
                >
                  <option value="">전체</option>
                  {RegionList.map((item) => (
                    <option value={item.name} key={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.item}>
                <label>
                  <h5>기관명</h5>
                </label>
                <input
                  name="corp_name"
                  className={styles.value}
                  type="text"
                  placeholder="기관명을 입력해주세요"
                  value={filters.corp_name}
                  onChange={handleFilter}
                ></input>
              </div>
            </div>
            <div
              style={
                window.innerWidth >= 768
                  ? { display: 'block' }
                  : filterBtn
                  ? { display: 'block' }
                  : { display: 'none' }
              }
            >
              <div className={styles.item}>
                <label>
                  <h5>별점</h5>
                </label>
                <div className={styles.list}>
                  {[1, 2, 3, 4, 5].map((score) => (
                    <span
                      className={`${styles.list_item} ${
                        filters.score.includes(score) ? styles.selected : ''
                      }`}
                      key={score}
                      onClick={() => handleList('score', score)}
                    >
                      <img
                        src={`/src/assets/images/Star_${score}.png`}
                        alt={`score ${score}`}
                      />
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.item}>
                <label>
                  <h5>해시태그</h5>
                </label>
                <div className={styles.list}>
                  {shared.hashtagList.map((item) => (
                    <span
                      className={`${styles.list_item} ${
                        filters.hashtags.includes(item.id)
                          ? styles.selected
                          : ''
                      }`}
                      key={item.id}
                      onClick={() => handleList('hashtags', item.id)}
                    >
                      {item.content}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.reset} onClick={resetFilters}>
              초기화
            </button>
            <button className={styles.search} onClick={search}>
              검색
            </button>
          </div>
        </div>
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.sort}>
          <select name="order" value={filters.order} onChange={handleFilter}>
            <option value="avg">별점 높은 순</option>
            <option value="cnt">리뷰 많은 순</option>
          </select>
        </div>
        <div className={styles.corp_list}>
          <ul>
            {corps.map((corp) => (
              <li className={styles.corp_item} key={corp.no}>
                <div className={styles.info}>
                  <div className={`body2 ${styles.region}`}>
                    <span>
                      {RegionList.find((item) => item.name === corp.city)?.sido}
                    </span>
                    <span>{corp.gugun}</span>
                  </div>
                  <div className={styles.corp}>
                    <h4>{corp.corpname}</h4>
                    <div className={styles.hashtag}>
                      {corp.hashtag !== null && corp.hashtag !== undefined
                        ? corp.hashtag.map((id) => (
                            <span className="body2" key={id}>
                              {
                                shared.hashtagList.find(
                                  (item) => item.id === id
                                )?.content
                              }
                            </span>
                          ))
                        : ''}
                    </div>
                  </div>
                </div>
                <div className={styles.star}>
                  <img src="/src/assets/images/Star_1.png" alt="star" />
                  <h4>{corp.avg}</h4>
                  <span className="body2">({corp.cnt})</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.pagination}>
        <Pagination
          currentPage={filters.page}
          totalPages={pages}
          onPageChange={handlePage}
        />
      </div>
    </div>
  );
};

export default SearchWorking;
