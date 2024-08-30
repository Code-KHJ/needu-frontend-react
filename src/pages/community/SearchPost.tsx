import React, { useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ico_pencil from "@/assets/images/btn_write_modal.png";
import ico_profile from "@/assets/images/ico_login_gray.png";
import ico_level from "@/assets/images/ico_level_default.png";
import ico_view from "@/assets/images/ico_view.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";
import PostItem from "./components/PostItem";
import { Topic } from "@/interface/Topic";
import communityApi from "@/apis/community";
import noticeApi from "@/apis/notice";
import { PublicNotice } from "@/interface/Notice";
import agoDate from "@/utils/agoDate";
import stripHtml from "@/utils/stripHtml";
import Pagination from "@/components/Pagination";
import { useLoading } from "@/contexts/LoadingContext";

interface SearchPostProps {
  type: number;
}

type Filters = {
  type: number;
  topic: number;
  search: string;
  order: string;
  page: number;
};

const SearchPost: React.FC<SearchPostProps> = ({ type }) => {
  const { showLoading, hideLoading, isLoading } = useLoading();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const initialFilters: Filters = {
    type: type,
    topic: Number(queryParams.get("topic")) || 0,
    search: queryParams.get("search") || "",
    order: queryParams.get("order") || "recent",
    page: Number(queryParams.get("page")) || 1,
  };

  // 검색 필터
  const [filters, setFilters] = useState<Filters>(initialFilters);
  useEffect(() => {
    setFilters(initialFilters);
  }, [type, location.search]);
  const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = e.currentTarget;
    setFilters({
      ...filters,
      [name]: value,
    });
    const newFilters = { ...filters, [name]: value };
    handleSearch(newFilters);
  };
  const handleFilterBySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      order: e.target.value,
    });
    const newFilters = { ...filters, order: e.target.value };
    handleSearch(newFilters);
  };
  const handlePage = (value: number) => {
    setFilters({
      ...filters,
      page: value,
    });
    const newFilters = { ...filters, page: value };
    handleSearch(newFilters);
  };
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    setSearchValue(filters.search);
  }, [filters.search]);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchButtonRef.current) {
        searchButtonRef.current.click();
      }
    }
  };
  const handleSearch = (newFilters: Filters) => {
    const queryParams = new URLSearchParams(newFilters as any);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };
  // 데이터 init
  const [topics, setTopics] = useState<Topic[]>([]);
  const [notice, setNotice] = useState<PublicNotice[]>([]);
  const [postList, setPostList] = useState<{ result: []; totalPages: number }>({
    result: [],
    totalPages: 1,
  });
  useEffect(() => {
    showLoading();
    const getTopic = async () => {
      const response: any = await communityApi.getTopic(type);
      if (response.status === 200) {
        setTopics(response.data);
      }
    };
    const getNotice = async () => {
      const response: any = await noticeApi.getPublicNotice();
      if (response.status === 200) {
        setNotice(response.data);
      }
    };
    const getPostList = async () => {
      const queryParams = new URLSearchParams(filters as any);
      const response: any = await communityApi.getPostList(
        `?${queryParams.toString()}`
      );
      if (response.status !== 200) {
        alert("오류가 발생하였습니다");
        navigate("/");
      }
      setPostList(response.data);
    };
    getTopic();
    getNotice();
    getPostList();
    hideLoading();
  }, [filters]);

  return (
    <>
      {isLoading ? (
        <div style={{ height: "1000px" }}></div>
      ) : (
        <div className={styles.wrap}>
          <div className={styles.header}>
            <div className={styles.topic_wrap}>
              <div className={styles.post_type}>
                <h5 onClick={() => navigate("/community")}>커뮤니티 &gt; </h5>
                <h5>
                  {type === 1 ? "자유게시판" : type === 2 ? "질문&답변" : ""}
                </h5>
              </div>
              <div className={styles.post_topic}>
                <button
                  className={Number(filters.topic) === 0 ? styles.select : ""}
                  name="topic"
                  value={0}
                  onClick={handleFilter}
                >
                  <h5>전체</h5>
                </button>
                {topics.map((item) => (
                  <button
                    className={
                      Number(filters.topic) === Number(item.id)
                        ? styles.select
                        : ""
                    }
                    key={item.id}
                    name="topic"
                    value={item.id}
                    onClick={handleFilter}
                  >
                    <h5>{item.topic}</h5>
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.search_wrap} onKeyDown={handleKeyPress}>
              <input
                type="text"
                placeholder="검색어를 입력해주세요"
                value={searchValue}
                onChange={handleSearchValue}
              />
              <div>
                <button className={`mo_show ${styles.btn_to_write}`}>
                  <img src={ico_pencil} alt="to_write" />
                  <Link
                    to={
                      type === 1
                        ? "/community/free/write"
                        : type === 2
                        ? "/community/question/write"
                        : ""
                    }
                  ></Link>
                </button>
                <button
                  className={styles.btn_search}
                  name="search"
                  value={searchValue}
                  onClick={handleFilter}
                  ref={searchButtonRef}
                >
                  검색
                </button>
                <button className={`tab_show ${styles.btn_to_write}`}>
                  <Link
                    to={
                      type === 1
                        ? "/community/free/write"
                        : type === 2
                        ? "/community/question/write"
                        : ""
                    }
                  >
                    <img src={ico_pencil} alt="to_write" />
                  </Link>
                </button>
              </div>
            </div>
            <div className={styles.sort_wrap}>
              <select value={filters.order} onChange={handleFilterBySelect}>
                <option value="recent">최신순</option>
                <option value="like">좋아요순</option>
                <option value="comment">
                  {type === 1 ? "댓글순" : type === 2 ? "답변순" : ""}
                </option>
                <option value="view">조회순</option>
              </select>
            </div>
          </div>
          <div className={styles.content_wrap}>
            <div className={styles.notice}>
              <div className={`body2 ${styles.label}`}>공지</div>
              <div className={styles.notice_content}>
                <div className={styles.info}>
                  <img src={ico_profile} alt="profile_image" />
                  <span className={`body2`}>
                    {notice[0]?.writer.nickname}
                    <img
                      src={ico_level}
                      alt="레벨"
                      style={{ width: "16px", marginLeft: "4px" }}
                    />
                  </span>
                  <span className={`caption`} style={{ color: "#aaa" }}>
                    {agoDate(notice[0]?.created_at)}
                  </span>
                  <span className={`caption`} style={{ color: "#aaa" }}>
                    <img
                      src={ico_view}
                      alt="views"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "2px",
                      }}
                    />
                    {notice[0]?.view}
                  </span>
                </div>
                <h5
                  className={styles.title}
                  onClick={() => navigate(`/notice/${notice[0]?.id}`)}
                >
                  {notice[0]?.title}
                </h5>
                <div className={styles.content}>
                  {stripHtml(notice[0]?.content)}
                </div>
                <div className={styles.reaction}>
                  <span className={`body2`} style={{ color: "#aaa" }}>
                    <img src={ico_like} alt="like" style={{ width: "16px" }} />
                    {notice[0]?.like_cnt}
                  </span>
                  <span className={`body2`} style={{ color: "#aaa" }}>
                    <img
                      src={ico_reply}
                      alt="reply"
                      style={{ width: "20px" }}
                    />
                    {notice[0]?.comment_cnt}
                  </span>
                </div>
              </div>
            </div>
            <ul className={styles.post_list}>
              {postList.result.map((post, index) => (
                <li className={styles.post_item} key={index}>
                  <PostItem post={post} />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.pagination}>
            <Pagination
              currentPage={filters.page}
              totalPages={postList.totalPages}
              onPageChange={handlePage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPost;
