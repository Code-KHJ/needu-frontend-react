import React, { useEffect, useState } from "react";
import styles from "./View.module.scss";
import ico_profile from "@/assets/images/ico_login_gray.png";
import ico_level from "@/assets/images/ico_level_default.png";
import ico_view from "@/assets/images/ico_view.png";
import btn_share from "@/assets/images/ico_share.png";
import btn_kebab from "@/assets/images/btn_kebab.png";
import ico_facebook from "@/assets/images/ico_facebook.svg";
import ico_kakao from "@/assets/images/ico_kakao.svg";
import ico_X from "@/assets/images/ico_sns_X.png";
import ico_url from "@/assets/images/ico_url.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_like_on from "@/assets/images/like_on.png";
import ico_dislike from "@/assets/images/ico_dislike.png";
import ico_dislike_on from "@/assets/images/ico_dislike_on.png";
import ico_arrow_down from "@/assets/images/ico_arrow_down_gnb.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import communityApi from "@/apis/community";
import {
  CommentContent,
  CommentCreateDto,
  LikePostDto,
  PostContent,
} from "@/interface/Community";
import dompurify from "@/utils/dompurify";
import KebabPost from "@/components/KebabPost";
import agoDate from "@/utils/agoDate";
import KebabComment from "@/components/KebabComment";

const ViewPost = () => {
  const pathname = useLocation().pathname.split("/");
  const postType = pathname[pathname.length - 2];
  const postId = parseFloat(pathname[pathname.length - 1]);
  //@ts-ignore
  const { user } = useUser();
  const navigate = useNavigate();

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
    const getPost = async (postId: number) => {
      const response: any = await communityApi.getPost(postId);
      if (response.status !== 200) {
        if (response.status === 404) {
          alert("존재하지 않는 게시글입니다.");
        }
        navigate("/");
      }
      if (response.data.msg) {
        alert(response.data.msg);
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
        like: response.data.postLikes.filter((item: any) => item.type === 1)
          .length,
        dislike: response.data.postLikes.filter((item: any) => item.type === -1)
          .length,
      });
      setIsLike({
        like: response.data.postLikes.some(
          (item: any) => item.user_id === user.id && item.type === 1
        ),
        dislike: response.data.postLikes.some(
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
  }, [user, postId]);

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

  // 댓글 Section
  const [comments, setComments] = useState<CommentContent[]>({});
  useEffect(() => {
    const getComments = async (postId: number) => {
      const response: any = await communityApi.getComments(postId);
      if (response.status !== 200) {
        alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      setComments(response.data);
      console.log(response.data);

      const updatedCommentLike = response.data.reduce(
        (acc: { [key: number]: CommentLike }, comment: CommentContent) => {
          const { id, commentLikes } = comment;
          acc[id] = {
            like: 0,
            dislike: 0,
            isLike: false,
            isDislike: false,
          };
          commentLikes.forEach((like) => {
            if (like.type === 1) {
              acc[id].like += 1;
            } else if (like.type === -1) {
              acc[id].dislike += 1;
            }
            if (user.id === like.user_id) {
              if (like.type === 1) {
                acc[id].isLike = true;
              } else if (like.type === -1) {
                acc[id].isDislike = true;
              }
            }
          });
          return acc;
        },
        {}
      );
      setCommentLike(updatedCommentLike);
    };
    getComments(postId);
    setCommentValues({
      ...commentValues,
      post_id: postId,
      user_id: user.id,
    });
  }, [user, postId]);

  //댓글 작성
  const [commentValues, setCommentValues] = useState<CommentCreateDto>({
    post_id: 0,
    user_id: 0,
    parent_id: null,
    content: "",
  });
  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommentValues({
      ...commentValues,
      [name]: value,
    });
  };
  const [commentValid, setCommentValid] = useState({
    post_id: false,
    user_id: false,
    content: false,
  });
  useEffect(() => {
    setCommentValid({
      post_id: commentValues.post_id > 0,
      user_id: commentValues.user_id > 0,
      content: commentValues.content !== "",
    });
  }, [commentValues]);
  const [isSubmitDisabledComment, setIsSubmitDisabledComment] = useState(false);
  useEffect(() => {
    const isSubmit = Object.values(commentValid).every((value) => value);
    setIsSubmitDisabledComment(!isSubmit);
  }, [commentValues, commentValid]);
  const handleSubmitComment = async () => {
    const confirmed = confirm("댓글을 등록하시겠습니까?");
    if (confirmed) {
      const response: any = await communityApi.createComment(commentValues);
      if (response.status !== 201) {
        if (response.data.msg === "Invalid content") {
          alert(
            "댓글에 부절절한 표현이 포함되어 있습니다. 수정 후 다시 시도해주세요."
          );
          return;
        }
        alert("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      alert("댓글이 작성되었습니다.");
      return;
    }
  };

  //댓글 수정
  const [isEditComment, setIsEditComment] = useState<{
    [key: number]: boolean;
  }>({});
  const handleIsEditComment = (comment_id: number) => {
    setIsEditComment((prevState) => ({
      ...prevState,
      [comment_id]: !prevState[comment_id],
    }));
  };

  //댓글 좋아요
  interface CommentLike {
    like: number;
    dislike: number;
    isLike: boolean;
    isDislike: boolean;
  }
  const [commentLike, setCommentLike] = useState<{
    [key: number]: CommentLike;
  }>({});
  console.log(commentLike);

  return (
    <div className={styles.view_wrap}>
      <div className={styles.topic}>
        <h4>
          <span className={styles.gray}>{post?.postType}</span>
          <span className={styles.gray}>|</span>
          <span>{post?.topicType}</span>
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
                  <div className="body2">
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
                  <div className="caption" style={{ color: "#aaa" }}>
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
                <div className={styles.share}>
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
                    <div className="body2">
                      <img src={ico_facebook} alt="facebook" />
                      Facebook
                    </div>
                    <div className="body2">
                      <img src={ico_X} alt="X(Twitter)" />
                      X(Twitter)
                    </div>
                    <div className="body2">
                      <img src={ico_kakao} alt="KakaoTalk" />
                      KakaoTalk
                    </div>
                    <div className="body2">
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
        <div className={styles.comment_wrap}>
          <p>댓글 {comments.length}</p>
          <div className={styles.comment_write}>
            <img src={ico_profile} alt="profile" />
            <input
              name="content"
              type="textarea"
              placeholder="댓글을 작성해주세요."
              onChange={handleComment}
            />
            <button
              type="button"
              disabled={isSubmitDisabledComment}
              onClick={handleSubmitComment}
            >
              등록
            </button>
          </div>
          <div className={styles.comment_list}>
            {comments.length > 0 &&
              comments.map((comment) => {
                if (!comment.parent_id) {
                  return (
                    <div className={styles.comment_item} key={comment.id}>
                      <div className={styles.comment_header}>
                        <div className={styles.user_info}>
                          <div className={styles.profile}>
                            <img src={ico_profile} alt="profile" />
                          </div>
                          <div>
                            <div className="body2">
                              <span>{comment.writer.nickname}</span>
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
                            <div style={{ color: "#aaa" }}>
                              {agoDate(comment.created_at)}
                            </div>
                          </div>
                        </div>
                        <KebabComment
                          target_id={comment.id}
                          target_parent_id={comment.parent_id}
                          target_writer={comment.writer.id}
                          user_id={user.id}
                          onEditClick={() => handleIsEditComment(comment.id)}
                        />
                      </div>
                      <div className={styles.comment_body}>
                        {isEditComment[comment.id] ? (
                          <div
                            className={styles.comment_content}
                            dangerouslySetInnerHTML={{
                              __html: dompurify(comment.content as string),
                            }}
                          ></div>
                        ) : (
                          <div
                            className={styles.comment_content}
                            dangerouslySetInnerHTML={{
                              __html: dompurify(comment.content as string),
                            }}
                          ></div>
                        )}
                        <div className={styles.likes}>
                          <button>
                            <img src={ico_like} alt="좋아요" />
                            <span>0</span>
                          </button>
                          <button>
                            <img src={ico_dislike} alt="싫어요" />
                            <span>0</span>
                          </button>
                          <button>댓글달기</button>
                        </div>
                        <div className={styles.child_wrap}>
                          <button>
                            <img
                              src={ico_arrow_down}
                              alt="arrow"
                              style={{
                                width: "16px",
                                height: "8px",
                                marginRight: "8px",
                                transform: "rotate(180deg)",
                              }}
                            />
                            댓글 0개
                          </button>
                          <div className={styles.child_list}>
                            <div className={styles.child_item}>
                              <div className={styles.child_header}>
                                <div className={styles.user_info}>
                                  <div className={styles.profile}>
                                    <img src={ico_profile} alt="profile" />
                                  </div>
                                  <div>
                                    <div className="body2">
                                      <span>닉네임</span>
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
                                    <div style={{ color: "#aaa" }}>30분 전</div>
                                  </div>
                                </div>
                                <div className={styles.kebab}>
                                  <img
                                    src={btn_kebab}
                                    alt="kebab"
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                      cursor: "pointer",
                                    }}
                                  />
                                  <div className={styles.kebab_list}>
                                    {/* <div>Facebook</div>
                    <div>X(Twitter)</div>
                    <div>KakaoTalk</div>
                    <div>Copy URL</div> */}
                                  </div>
                                </div>
                              </div>
                              <div className={styles.child_body}>
                                <div className={styles.child_content}>
                                  감동적인 장면이 많아서 마음이 따뜻해져요ㅎㅎ
                                  전개가 빠르고 흥미진진해서 눈을 뗄 수가
                                  없어요! 스토리가 독특하고 신선해요. 계속 보게
                                  됨ㅋㅋㅋㅋ 초반엔 좀 지루했는데 중반부터 완전
                                  빠져들었어요ㅋㅋ 감동적인 장면이 많아서 마음이
                                  따뜻해져요ㅎㅎ 현실적인 내용이라 공감 많이
                                  됨ㅎㅎ
                                </div>
                                <div className={styles.likes}>
                                  <button>
                                    <img src={ico_like} alt="좋아요" />
                                    <span>0</span>
                                  </button>
                                  <button>
                                    <img src={ico_dislike} alt="싫어요" />
                                    <span>0</span>
                                  </button>
                                  <button>댓글달기</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
      <div>페이지네이션</div>
    </div>
  );
};

export default ViewPost;
