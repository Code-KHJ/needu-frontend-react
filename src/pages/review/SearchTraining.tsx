import React, { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import { RegionList } from '@/common/Region';
import corpApi from '@/apis/corp';
import { CorpWithTrainingDto } from '@/interface/Corp';
import Pagination from '@/components/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';

type Filters = {
  region: string;
  corp_name: string;
  score: number[];
  number_of_participants: number[];
  cost: number[];
  duration: number[];
  order: string;
  page: number;
};

const SearchTraining = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultRef = useRef<HTMLDivElement>(null);
  const [corps, setCorps] = useState<CorpWithTrainingDto[]>([]);
  const [pages, setPages] = useState<number>();
  const options = {
    number_of_participants: ['1-3명', '4-6명', '7-9명', '10-12명', '13명 이상'],
    cost: ['10만원 미만', '10-15만원', '15-20만원', '20만원 이상'],
    duration: ['160시간 미만', '160-200시간', '200시간 이상'],
  };
  const queryParams = new URLSearchParams(location.search);
  if (!queryParams.toString()) {
    const defaultFilters = {
      region: '',
      corp_name: '',
      score: [],
      number_of_participants: [],
      cost: [],
      duration: [],
      order: 'avg',
      page: 1,
    };
    const defaultQueryParams = new URLSearchParams(
      defaultFilters as any
    ).toString();
    window.location.replace(`/review/search/training?${defaultQueryParams}`);
  }

  const [filters, setFilters] = useState<Filters>({
    region: queryParams.get('region') || '',
    corp_name: queryParams.get('corp_name') || '',
    score:
      queryParams
        .get('score')
        ?.split(',')
        .filter((item) => item !== '')
        .map(Number) || [],
    number_of_participants:
      queryParams
        .get('number_of_participants')
        ?.split(',')
        .filter((item) => item !== '')
        .map(Number) || [],
    cost:
      queryParams
        .get('cost')
        ?.split(',')
        .filter((item) => item !== '')
        .map(Number) || [],
    duration:
      queryParams
        .get('duration')
        ?.split(',')
        .filter((item) => item !== '')
        .map(Number) || [],
    order: queryParams.get('order') || 'avg',
    page: Number(queryParams.get('page')) || 1,
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
      const currentValues = prevFilters[name];
      if (Array.isArray(currentValues)) {
        const filter = currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value];

        return { ...prevFilters, [name]: filter };
      }
      return prevFilters;
    });
  };
  const handlePage = (value: number) => {
    setFilters({
      ...filters,
      page: value,
    });
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  useEffect(() => {
    const getCorps = async () => {
      const queryParams = new URLSearchParams(filters as any);
      const response = await corpApi.getListWithTraining(
        `?${queryParams.toString()}`
      );
      setCorps(response.data.result);
      setPages(response.data.totalPages);
    };
    getCorps();
  }, [location.search]);

  const resetFilters = () => {
    setFilters({
      region: '',
      corp_name: '',
      score: [],
      number_of_participants: [],
      cost: [],
      duration: [],
      order: 'avg',
      page: 1,
    });
  };
  const handleSearch = () => {
    const queryParams = new URLSearchParams(filters as any);
    navigate(`/review/search/training?${queryParams.toString()}`);
  };

  useEffect(() => {
    handleSearch();
  }, [filters.page, filters.order]);

  const search = async () => {
    if (filters.page === 1) {
      handleSearch();
    } else {
      setFilters({
        ...filters,
        page: 1,
      });
    }
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      search();
    }
  };
  const moveDetail = (corpName: string) => {
    navigate(`/review/detail/training?name=${corpName}`);
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
                  <h5 className={styles.people}>실습인원</h5>
                </label>
                <div className={styles.list}>
                  {options.number_of_participants.map((item, index) => (
                    <span
                      className={`${styles.list_item} ${
                        filters.number_of_participants.includes(index)
                          ? styles.selected
                          : ''
                      }`}
                      key={index}
                      onClick={() =>
                        handleList('number_of_participants', index)
                      }
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.item}>
                <label>
                  <h5 className={styles.cost}>실습비</h5>
                </label>
                <div className={styles.list}>
                  {options.cost.map((item, index) => (
                    <span
                      className={`${styles.list_item} ${
                        filters.cost.includes(index) ? styles.selected : ''
                      }`}
                      key={index}
                      onClick={() => handleList('cost', index)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.item}>
                <label>
                  <h5 className={styles.duration}>실습기간</h5>
                </label>
                <div className={styles.list}>
                  {options.duration.map((item, index) => (
                    <span
                      className={`${styles.list_item} ${
                        filters.duration.includes(index) ? styles.selected : ''
                      }`}
                      key={index}
                      onClick={() => handleList('duration', index)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttons} ref={resultRef}>
            <button className={styles.reset} onClick={resetFilters}>
              초기화
            </button>
            <button className={styles.search} onClick={search}>
              검색
            </button>
          </div>
        </div>
      </div>
      {corps.length > 0 && (
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
                        {
                          RegionList.find((item) => item.name === corp.city)
                            ?.sido
                        }
                      </span>
                      <span>{corp.gugun}</span>
                    </div>
                    <div className={styles.corp}>
                      <h4 onClick={() => moveDetail(corp.corpname)}>
                        {corp.corpname}
                      </h4>
                      <div className={styles.detail_info}>
                        <span className="body2">
                          <img
                            src="/src/assets/images/ico_people.png"
                            alt="실습인원"
                          />
                          {corp.number_of_participants > 0
                            ? corp.number_of_participants
                            : '0'}
                          명
                        </span>
                        <span className="body2">
                          <img
                            src="/src/assets/images/ico_money.png"
                            alt="실습비"
                          />
                          {corp.cost > 0 ? corp.cost : '0'}만원
                        </span>
                        <span className="body2">
                          <img
                            src="/src/assets/images/ico_clock.png"
                            alt="실습시간"
                          />
                          {corp.duration > 0 ? corp.duration : '0'}시간
                        </span>
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
      )}
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

export default SearchTraining;
