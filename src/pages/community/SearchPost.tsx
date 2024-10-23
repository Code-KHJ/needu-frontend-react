import React, { useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ico_pencil from "@/assets/images/btn_write_modal.png";
import ico_level from "@/assets/images/ico_level_default.png";
import ico_view from "@/assets/images/ico_view.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_reply from "@/assets/images/ico_reply.png";
import ico_setting from "@/assets/images/ico_setting.png";
import ico_wb from "@/assets/images/ico_wb.png";
import ico_hide from "@/assets/images/ico_hide.png";
import ico_edit from "@/assets/images/ico_edit.png";
import ico_del from "@/assets/images/ico_del.png";
import PostItem from "./components/PostItem";
import { Topic } from "@/interface/Topic";
import communityApi from "@/apis/community";
import noticeApi from "@/apis/notice";
import { PublicNotice } from "@/interface/Notice";
import agoDate from "@/utils/agoDate";
import stripHtml from "@/utils/stripHtml";
import Pagination from "@/components/Pagination";
import { useLoading } from "@/contexts/LoadingContext";
import { useUser } from "@/contexts/UserContext";
import { useConfirm } from "@/contexts/ConfirmContext";
import ProfileImage from "@/components/ProfileImage";

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
  //@ts-ignore
  const { user } = useUser();
  const { customConfirm } = useConfirm();
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
        navigate("/error", {
          state: { previous: location.pathname + location.search },
        });
      }
      setPostList(response.data);
    };
    getTopic();
    getNotice();
    getPostList();
    scrollView();
    hideLoading();
  }, [filters]);

  const scrollView = () => {
    window.scrollTo(0, 0);
  };

  //관리자도구
  useEffect(() => {
    setShowToggle(false);
    setCheckedPost([]);
  }, []);

  const [showToggle, setShowToggle] = useState(false);
  const handleToggle = () => {
    setShowToggle(!showToggle);
  };
  const [checkedPost, setCheckedPost] = useState<number[]>([]);
  const handleCheckbox = (postId: number) => {
    setCheckedPost((prevCheckedPost) =>
      prevCheckedPost.includes(postId)
        ? prevCheckedPost.filter((id) => id !== postId)
        : [...prevCheckedPost, postId]
    );
  };

  const submitWeeklyBest = async () => {
    if (user.authority !== 100) {
      alert("권한이 없습니다.");
      window.location.reload();
      return;
    }
    if (checkedPost.length < 1) {
      alert("선택한 게시글이 없습니다.");
      return;
    }
    const confirmed = await customConfirm(
      `${checkedPost.length}개의 게시글을 Weekly Best로 채택하시겠습니까?`
    );
    if (confirmed) {
      showLoading();
      const resultmsg: string[] = [];
      for (const postId of checkedPost) {
        //@ts-ignore
        const post = postList.result.filter((post) => post.id === postId);
        //@ts-ignore
        if (post[0].wbAccepted) {
          try {
            const response: any = await communityApi.unacceptWeeklyBest(postId);
            if (response.status === 200) {
              resultmsg.push(`PostId: ${postId} 게시글 WB 채택 취소 성공`);
            }
          } catch (error) {
            resultmsg.push(`PostId: ${postId} 게시글 WB 채택 취소 실패`);
          }
        } else {
          try {
            const response: any = await communityApi.acceptWeeklyBest(postId);
            if (response.data.msg === "중복채택") {
              resultmsg.push(
                `PostId: ${postId} 게시글은 이미 채택된 게시글입니다.`
              );
            } else if (response.status === 201) {
              resultmsg.push(`PostId: ${postId} 게시글 WB 채택 성공`);
            }
          } catch (error) {
            resultmsg.push(`PostId: ${postId} 게시글 WB 채택 실패`);
          }
        }
      }
      hideLoading();
      alert(resultmsg.join("\n"));
      window.location.reload();
    }
  };

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
                <button
                  className={`mo_show_flex ${styles.btn_to_write}`}
                  onClick={() =>
                    navigate(
                      type === 1
                        ? "/community/free/write"
                        : type === 2
                        ? "/community/question/write"
                        : "",
                      {
                        state: {
                          previous: location.pathname + location.search,
                        },
                      }
                    )
                  }
                >
                  <img src={ico_pencil} alt="to_write" />새 글 쓰기
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
                <button
                  className={`tab_show_flex ${styles.btn_to_write}`}
                  onClick={() =>
                    navigate(
                      type === 1
                        ? "/community/free/write"
                        : type === 2
                        ? "/community/question/write"
                        : "",
                      {
                        state: {
                          previous: location.pathname + location.search,
                        },
                      }
                    )
                  }
                >
                  <img src={ico_pencil} alt="to_write" />새 글 쓰기
                </button>
              </div>
            </div>
            <div className={styles.sort_wrap}>
              {user.authority === 100 && (
                <div className={styles.admin_option}>
                  <button className={styles.toggle} onClick={handleToggle}>
                    <img src={ico_setting} alt="관리자 설정" />
                  </button>
                  <div
                    className={styles.options}
                    style={!showToggle ? { display: "none" } : {}}
                  >
                    <button className="body2" onClick={submitWeeklyBest}>
                      <img src={ico_wb} alt="Weekly Best" />
                      W.B
                    </button>
                    <button className="body2">
                      <img src={ico_hide} alt="가림" />
                      가림
                    </button>
                    <button className="body2">
                      <img src={ico_edit} alt="수정" />
                      수정
                    </button>
                    <button className="body2">
                      <img src={ico_del} alt="삭제" />
                      삭제
                    </button>
                  </div>
                </div>
              )}
              <select value={filters.order} onChange={handleFilterBySelect}>
                <option value="recents">최신순</option>
                <option value="likes">좋아요순</option>
                <option value="comments">
                  {type === 1 ? "댓글순" : type === 2 ? "답변순" : ""}
                </option>
                <option value="views">조회순</option>
              </select>
            </div>
          </div>
          <div className={styles.content_wrap}>
            {notice.length > 0 && (
              <div
                className={styles.notice}
                style={type === 1 ? { flexDirection: "column" } : {}}
              >
                <div className={`body2 ${styles.label}`}>공지</div>
                <div className={styles.notice_content}>
                  <div className={styles.info}>
                    <ProfileImage src={notice[0]?.writer.profile_image} />
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
                  <div
                    className={styles.content}
                    onClick={() => navigate(`/notice/${notice[0]?.id}`)}
                  >
                    {stripHtml(notice[0]?.content)}
                  </div>
                  <div className={styles.reaction}>
                    <span className={`body2`} style={{ color: "#aaa" }}>
                      <img
                        src={ico_like}
                        alt="like"
                        style={{ width: "16px" }}
                      />
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
            )}
            <ul className={styles.post_list}>
              {postList.result.map((post, index) => (
                <li className={styles.post_item} key={index}>
                  {user.authority === 100 && (
                    <div className={styles.for_admin}>
                      {/* @ts-ignore */}
                      {post.wbAccepted && (
                        <div className={`body2 ${styles.wb}`}>W.B</div>
                      )}
                      <div className={`body2 ${styles.post_id}`}>
                        {/* @ts-ignore */}
                        {post.id}
                      </div>
                      <input
                        type="checkbox"
                        //@ts-ignore
                        onChange={() => handleCheckbox(post.id)}
                        //@ts-ignore
                        checked={checkedPost.includes(post.id)}
                      />
                    </div>
                  )}
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
