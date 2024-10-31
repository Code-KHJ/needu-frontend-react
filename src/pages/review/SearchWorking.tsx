import corpApi from "@/apis/corp";
import sharedApi from "@/apis/shared";
import Star_1 from "@/assets/images/Star_1.png";
import Star_2 from "@/assets/images/Star_2.png";
import Star_3 from "@/assets/images/Star_3.png";
import Star_4 from "@/assets/images/Star_4.png";
import Star_5 from "@/assets/images/Star_5.png";
import { RegionList } from "@/common/Region";
import Pagination from "@/components/Pagination";
import { useLoading } from "@/contexts/LoadingContext";
import { CorpDto } from "@/interface/Corp";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Search.module.scss";

type Filters = {
  region: string;
  corp_name: string;
  score: number[];
  hashtags: number[];
  order: string;
  page: number;
};

const SearchWorking = () => {
  const { showLoading, hideLoading } = useLoading();
  const location = useLocation();
  const navigate = useNavigate();
  const resultRef = useRef<HTMLDivElement>(null);
  const [corps, setCorps] = useState<CorpDto[]>([]);
  const [pages, setPages] = useState<number>();
  const queryParams = new URLSearchParams(location.search);

  const starImages: { [key: string]: string } = {
    1: Star_1,
    2: Star_2,
    3: Star_3,
    4: Star_4,
    5: Star_5,
  };

  if (!queryParams.toString()) {
    const defaultFilters = {
      region: "",
      corp_name: "",
      score: [],
      hashtags: [],
      order: "avg",
      page: 1,
    };
    const defaultQueryParams = new URLSearchParams(
      defaultFilters as any
    ).toString();
    window.location.replace(`/review/search/working?${defaultQueryParams}`);
  }

  const [filters, setFilters] = useState<Filters>({
    region: queryParams.get("region") || "",
    corp_name: queryParams.get("corp_name") || "",
    score:
      queryParams
        .get("score")
        ?.split(",")
        .filter((item) => item !== "")
        .map(Number) || [],
    hashtags:
      queryParams
        .get("hashtags")
        ?.split(",")
        .filter((item) => item !== "")
        .map(Number) || [],
    order: queryParams.get("order") || "avg",
    page: Number(queryParams.get("page")) || 1,
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
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  //필터기능
  const [filterBtn, setFilterBtn] = useState(false);
  const lastWidth = useRef(window.innerWidth);
  const handleFilterBtn = () => {
    setFilterBtn(!filterBtn);
  };
  const handleResize = () => {
    const currentWidth = window.innerWidth;
    if (currentWidth !== lastWidth.current) {
      if (window.innerWidth >= 768) {
        setFilterBtn(true);
      } else {
        setFilterBtn(false);
      }
      lastWidth.current = currentWidth;
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  interface Hashtag {
    id: number;
    content: string;
  }
  interface Shared {
    hashtagList: Hashtag[];
  }
  //해시태그
  const [shared, setShared] = useState<Shared>({
    hashtagList: [],
  });
  useEffect(() => {
    showLoading();
    const getShared = async () => {
      const hashtagList: any = await sharedApi.getHashtagList();
      if (hashtagList.status === 200) {
        setShared({
          hashtagList: hashtagList.data,
        });
      }
    };
    const getCorps = async () => {
      const queryParams = new URLSearchParams(filters as any);
      const response: any = await corpApi.getListWithWorking(
        `?${queryParams.toString()}`
      );
      setCorps(response.data.result);
      setPages(response.data.totalPages);
    };
    getShared();
    getCorps();
    hideLoading();
  }, [location.search]);

  const resetFilters = () => {
    setFilters({
      region: "",
      corp_name: "",
      score: [],
      hashtags: [],
      order: "avg",
      page: 1,
    });
  };
  const handleSearch = () => {
    const queryParams = new URLSearchParams(filters as any);
    navigate(`/review/search/working?${queryParams.toString()}`);
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
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      search();
    }
  };
  const moveDetail = (corpName: string) => {
    const encodedCorpName = encodeURIComponent(corpName).replace(/%2B/g, "%2B");
    navigate(`/review/detail/working?name=${encodedCorpName}`);
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
                  ? { display: "block" }
                  : filterBtn
                  ? { display: "block" }
                  : { display: "none" }
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
                        filters.score.includes(score) ? styles.selected : ""
                      }`}
                      key={score}
                      onClick={() => handleList("score", score)}
                    >
                      <img src={starImages[score]} alt={`score ${score}`} />
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
                          : ""
                      }`}
                      key={item.id}
                      onClick={() => handleList("hashtags", item.id)}
                    >
                      {item.content}
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
      {pages !== undefined &&
        (pages > 0 ? (
          <div className={styles.content_wrap}>
            <div className={styles.sort}>
              <select
                name="order"
                value={filters.order}
                onChange={handleFilter}
              >
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
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div className={styles.star}>
                      <img src={Star_1} alt="star" />
                      <h4>{corp.avg}</h4>
                      <span className="body2">({corp.cnt})</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div
            style={{ marginTop: "120px", textAlign: "center", color: "#888" }}
          >
            찾으시는 기관이 없나요?{" "}
            <a
              href="https://forms.gle/R1nGsYURtngudXBJ7"
              target="_blank"
              style={{ color: "#6269f5" }}
            >
              기관 등록하기
            </a>
          </div>
        ))}
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
