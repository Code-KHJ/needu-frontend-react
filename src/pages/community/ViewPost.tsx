import { useEffect, useRef, useState } from "react";
import styles from "./View.module.scss";
import ico_profile from "@/assets/images/ico_login_gray.png";
import ico_level from "@/assets/images/ico_level_default.png";
import ico_view from "@/assets/images/ico_view.png";
import btn_share from "@/assets/images/ico_share.png";
import ico_facebook from "@/assets/images/ico_facebook.svg";
import ico_kakao from "@/assets/images/ico_kakao.svg";
import ico_X from "@/assets/images/ico_sns_X.png";
import ico_url from "@/assets/images/ico_url.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_like_on from "@/assets/images/like_on.png";
import ico_dislike from "@/assets/images/ico_dislike.png";
import ico_dislike_on from "@/assets/images/ico_dislike_on.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import communityApi from "@/apis/community";
import { LikePostDto, PostContent } from "@/interface/Community";
import { dompurify, extractTextFromHTML } from "@/utils/dompurify";
import KebabPost from "@/components/KebabPost";
import agoDate from "@/utils/agoDate";
import Comments from "@/components/comments/Comments";
import { copyClipboard, fbShare, kakaoShare, xShare } from "@/utils/snsShare";
import { Topic } from "@/interface/Topic";
import { useLoading } from "@/contexts/LoadingContext";

//@ts-ignore
const ViewPost = ({ type }) => {
  const { showLoading, hideLoading } = useLoading();
  const previousPage = useLocation().state?.previous;
  console.log(previousPage);
  const pathname = useLocation().pathname.split("/");
  const postType = pathname[pathname.length - 2];
  const postId = parseFloat(pathname[pathname.length - 1]);
  //@ts-ignore
  const { user } = useUser();
  const navigate = useNavigate();
  const [fetch, setFetch] = useState(false);
  const refreshPost = () => {
    setFetch(!fetch);
  };

  const [topics, setTopics] = useState<Topic>();
  const [post, setPost] = useState<PostContent>();
  const [likes, setLikes] = useState({
    like: 0,
    dislike: 0,
  });

  useEffect(() => {
    if (!postId) {
      navigate("/");
      return;
    }
    showLoading();
    const getPost = async (postId: number) => {
      const response: any = await communityApi.getPost(postId);
      if (response.status !== 200) {
        if (response.status === 404) {
          alert("존재하지 않는 게시글입니다.");
        }
        navigate("/");
      }
      if (response.data.msg === "is_del") {
        alert("삭제된 게시글입니다.");
        navigate("/");
        return;
      }
      if (postType === "free") {
        if (response.data.postType !== "자유게시판") {
          alert("존재하지 않는 게시글입니다.");
          navigate("/");
        }
      }
      if (postType === "question") {
        if (response.data.postType !== "질문&답변") {
          alert("존재하지 않는 게시글입니다.");
          navigate("/");
        }
      }
      setPost(response.data);
      setLikes({
        like: response.data.postLikes?.filter((item: any) => item.type === 1)
          .length,
        dislike: response.data.postLikes?.filter(
          (item: any) => item.type === -1
        ).length,
      });
      setIsLike({
        like: response.data.postLikes?.some(
          (item: any) => item.user_id === user.id && item.type === 1
        ),
        dislike: response.data.postLikes?.some(
          (item: any) => item.user_id === user.id && item.type === -1
        ),
      });
    };
    const updateView = async (postId: number) => {
      const response: any = await communityApi.updateView(postId);
      if (response.status !== 200) {
        if (response.status === 404) {
          alert("존재하지 않는 게시글입니다.");
        }
        navigate("/");
      }
    };
    getPost(postId);
    updateView(postId);
    hideLoading();
  }, [postId, fetch]);
  useEffect(() => {
    const getTopic = async () => {
      const response: any = await communityApi.getTopic(type);
      if (response.status === 200) {
        const topic = response.data.find((topic: any) => {
          return topic.topic === post?.topicType;
        });
        setTopics(topic);
      }
    };
    getTopic();
  }, [post]);

  const [isLike, setIsLike] = useState({
    like: false,
    dislike: false,
  });
  let isProcessingLike = false;
  const likePost = async (type: string) => {
    if (isProcessingLike) return alert("이전 요청을 처리중입니다.");
    isProcessingLike = true;

    try {
      if (!user || user.id === null) {
        alert("로그인 후 이용이 가능합니다.");
        return;
      }
      if (type === "like" && isLike.dislike) {
        alert("이미 리액션을 하셨습니다. 리액션을 취소 후 다시 시도해주세요.");
        return;
      }
      if (type === "dislike" && isLike.like) {
        alert("이미 리액션을 하셨습니다. 리액션을 취소 후 다시 시도해주세요.");
        return;
      }
      const likeDto: LikePostDto = {
        post_id: postId,
        user_id: user.id,
        type: type,
      };
      const response: any = await communityApi.updatePostLike(likeDto);
      if (response.status !== 200) {
        alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      if (response.data.msg === "타입오류") {
        alert("이미 리액션을 하셨습니다. 리액션을 취소 후 다시 시도해주세요.");
        return;
      }
      if (likeDto.type === "like") {
        setLikes({
          ...likes,
          like:
            response.data.msg === "좋아요" ? likes.like + 1 : likes.like - 1,
        });
        setIsLike({
          ...isLike,
          like: response.data.msg === "좋아요" ? true : false,
        });
        return;
      }
      if (likeDto.type === "dislike") {
        setLikes({
          ...likes,
          dislike:
            response.data.msg === "싫어요"
              ? likes.dislike + 1
              : likes.dislike - 1,
        });
        setIsLike({
          ...isLike,
          dislike: response.data.msg === "싫어요" ? true : false,
        });
        return;
      }
    } catch (error) {
      alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      isProcessingLike = false;
    }
  };

  const [showShare, setShowShare] = useState(false);
  const handleShare = () => {
    setShowShare(!showShare);
  };
  const shareRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareRef]);

  return (
    <div className={styles.view_wrap}>
      <div className={styles.topic}>
        <h4>
          <span
            className={styles.gray}
            onClick={() => navigate(`/community/${postType}`)}
          >
            {post?.postType}
          </span>
          <span className={styles.gray}>|</span>
          <span
            onClick={() => {
              navigate(`/community/${postType}?topic=${topics?.id}`);
            }}
          >
            {post?.topicType}
          </span>
        </h4>
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.post_wrap}>
          <div className={styles.post_header}>
            <h3>{post?.title}</h3>
            <div className={styles.post_header_info}>
              <div className={styles.writer_info}>
                <img src={ico_profile} alt="profile_image" />
                <div>
                  <div>
                    <span>{post?.writer.nickname}</span>
                    <img
                      src={ico_level}
                      alt="레벨"
                      style={{
                        width: "16px",
                        height: "16px",
                        marginLeft: "4px",
                      }}
                    />
                  </div>
                  <div className="body2" style={{ color: "#aaa" }}>
                    <span>{agoDate(post?.created_at as Date)}</span>
                    <img
                      src={ico_view}
                      alt="views"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "8px",
                        marginRight: "4px",
                      }}
                    />
                    <span>{post?.view}</span>
                  </div>
                </div>
              </div>
              <div className={styles.options}>
                <div className={styles.share} ref={shareRef}>
                  <img
                    src={btn_share}
                    alt="share"
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                    onClick={() => handleShare()}
                  />
                  <div
                    className={styles.share_list}
                    style={showShare ? {} : { display: "none" }}
                  >
                    <div
                      className="body2"
                      onClick={() => fbShare(window.location.href)}
                    >
                      <img src={ico_facebook} alt="facebook" />
                      Facebook
                    </div>
                    <div
                      className="body2"
                      onClick={() => xShare(window.location.href)}
                    >
                      <img src={ico_X} alt="X(Twitter)" />
                      X(Twitter)
                    </div>
                    <div
                      className="body2"
                      onClick={() =>
                        kakaoShare(
                          post?.title as string,
                          extractTextFromHTML(post?.content as string),
                          window.location.href,
                          likes.like,
                          post?.comment_cnt as number
                        )
                      }
                    >
                      <img src={ico_kakao} alt="KakaoTalk" />
                      KakaoTalk
                    </div>
                    <div
                      className="body2"
                      onClick={() => copyClipboard(window.location.href)}
                    >
                      <img src={ico_url} alt="Copy URL" />
                      Copy URL
                    </div>
                  </div>
                </div>
                <KebabPost
                  target={postType}
                  target_id={post?.id as number}
                  target_writer={post?.writer.id as number}
                  user_id={user.id}
                  isDeletable={!post?.comment_cnt}
                ></KebabPost>
              </div>
            </div>
          </div>
          <div
            className={styles.post_content}
            dangerouslySetInnerHTML={{
              __html: dompurify(post?.content as string),
            }}
          ></div>
          <div className={styles.likes}>
            <button
              className={isLike.like ? styles.like_on : ""}
              onClick={() => likePost("like")}
            >
              <img src={isLike.like ? ico_like_on : ico_like} alt="좋아요" />
              <span className="body2">{likes.like}</span>
            </button>
            <button
              className={isLike.dislike ? styles.dislike_on : ""}
              onClick={() => likePost("dislike")}
            >
              <img
                src={isLike.dislike ? ico_dislike_on : ico_dislike}
                alt="싫어요"
              />
              <span className="body2">{likes.dislike}</span>
            </button>
          </div>
        </div>
        <Comments
          postId={post?.id as number}
          type={postType}
          accepted_id={
            user.id === post?.writer.id ? post?.commentAccepted : null
          }
          refresh={refreshPost}
        />
      </div>
      <div className={styles.btn_list}>
        <button
          onClick={() =>
            previousPage
              ? navigate(previousPage)
              : navigate(`/community/${postType}`)
          }
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default ViewPost;
