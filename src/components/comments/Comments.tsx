import React, { useEffect, useState } from "react";
import styles from "./Comments.module.scss";
import ico_profile from "@/assets/images/ico_login_gray.png";
import ico_arrow_down from "@/assets/images/ico_arrow_down_gnb.png";
import { TextField } from "@mui/material";
import { useUser } from "@/contexts/UserContext";
import { CommentContent, CommentCreateDto } from "@/interface/Community";
import communityApi from "@/apis/community";
import Comment from "./Comment";
import noticeApi from "@/apis/notice";

interface CommentsProps {
  postId: number;
  type: string;
}

const Comments: React.FC<CommentsProps> = ({ postId, type }) => {
  //@ts-ignore
  const { user } = useUser();
  const [fetch, setFetch] = useState(false);
  const refreshComments = () => {
    setFetch(!fetch);
  };
  const [comments, setComments] = useState<CommentContent[]>([]);
  useEffect(() => {
    if (!postId) return;
    const getComments = async (postId: number) => {
      const response: any =
        type === "notice"
          ? await noticeApi.getComments(postId)
          : await communityApi.getComments(postId);
      if (response.status !== 200) {
        alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      setComments(response.data);
    };
    getComments(postId);
    setCommentValues({
      ...commentValues,
      post_id: postId,
      user_id: user.id,
    });
  }, [user, postId, fetch]);

  //댓글 작성
  const [commentValues, setCommentValues] = useState<CommentCreateDto>({
    post_id: 0,
    user_id: 0,
    parent_id: null,
    content: "",
  });
  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    if (!user || user.id === null) {
      alert("로그인 후 이용이 가능합니다.");
      return;
    }
    const confirmed = confirm("댓글을 등록하시겠습니까?");
    if (confirmed) {
      const response: any =
        type === "notice"
          ? await noticeApi.createComment(commentValues)
          : await communityApi.createComment(commentValues);
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
      setCommentValues({
        ...commentValues,
        content: "",
      });
      refreshComments();
      return;
    }
  };

  interface CommentShow {
    list: boolean;
    form: boolean;
    expand: boolean;
  }
  //대댓글 Show
  const [childCommentShow, setChildCommentShow] = useState<{
    [key: number]: CommentShow;
  }>({});
  const handleChildCommentShow = (
    e: React.MouseEvent<HTMLButtonElement>,
    parent_id: number,
    value: boolean
  ) => {
    const { name } = e.target as HTMLButtonElement;
    setChildCommentShow((prevState) => ({
      ...prevState,
      [parent_id]: {
        ...prevState[parent_id],
        [name]: value,
      },
    }));
  };

  //대댓글 작성
  const [childCommentValues, setChildCommentValues] = useState<{
    [key: number]: CommentCreateDto;
  }>({});
  const handleChildComment = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    parent_id: number
  ) => {
    const { value } = e.target;
    setChildCommentValues((prevValues) => ({
      ...prevValues,
      [parent_id]: {
        post_id: postId,
        user_id: user.id,
        parent_id: parent_id,
        content: value,
      },
    }));
  };
  const handleSubmitChildComment = async (parent_id: number) => {
    if (!user || user.id === null) {
      alert("로그인 후 이용이 가능합니다.");
      return;
    }
    if (
      !childCommentValues[parent_id] ||
      childCommentValues[parent_id]?.content === ""
    ) {
      alert("내용을 입력해주세요.");
      return;
    }
    const confirmed = confirm("댓글을 등록하시겠습니까?");
    if (confirmed) {
      const response: any =
        type === "notice"
          ? await noticeApi.createComment(childCommentValues[parent_id])
          : await communityApi.createComment(childCommentValues[parent_id]);
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
      setChildCommentValues((prevValues) => ({
        ...prevValues,
        [parent_id]: {
          ...prevValues[parent_id],
          content: "",
        },
      }));
      refreshComments();
      return;
    }
  };

  return (
    <div className={styles.comment_wrap}>
      <p>댓글 {comments.length}</p>
      <div className={styles.comment_write}>
        <img src={ico_profile} alt="profile" />
        <TextField
          name="content"
          placeholder={
            user.id ? "댓글을 작성해주세요." : "로그인 후 이용해주세요."
          }
          multiline
          fullWidth
          minRows={1}
          maxRows={6}
          value={commentValues.content}
          onChange={handleComment}
          disabled={user.id ? false : true}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#aaa",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6269F5",
                borderWidth: "1px",
              },
            },
          }}
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
                <div className={styles.comment} key={comment.id}>
                  <Comment
                    postType={type}
                    parent_id={comment.id}
                    comment={comment}
                    onAction={refreshComments}
                    isDeletable={
                      !comments.filter((item) => item.parent_id === comment.id)
                        .length
                    }
                    handleChildCommentShow={handleChildCommentShow}
                  />
                  <div className={styles.child_wrap}>
                    <button
                      name="list"
                      type="button"
                      onClick={(e) =>
                        handleChildCommentShow(
                          e,
                          comment.id,
                          childCommentShow[comment.id]?.list !== false
                            ? false
                            : true
                        )
                      }
                    >
                      <img
                        src={ico_arrow_down}
                        alt="arrow"
                        style={{
                          width: "16px",
                          height: "8px",
                          marginRight: "8px",
                          transform:
                            childCommentShow[comment.id]?.list !== false
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      />
                      댓글{" "}
                      {
                        comments.filter((item) => item.parent_id === comment.id)
                          .length
                      }
                      개
                    </button>
                    {childCommentShow[comment.id]?.list !== false && (
                      <>
                        {comments
                          .filter((child) => child.parent_id === comment.id)
                          .slice(
                            0,
                            childCommentShow[comment.id]?.expand
                              ? comments.length
                              : 4
                          )
                          .map((child) => (
                            <div className={styles.child_list} key={child.id}>
                              <Comment
                                postType={type}
                                parent_id={comment.id}
                                comment={child}
                                onAction={refreshComments}
                                isDeletable={true}
                                handleChildCommentShow={handleChildCommentShow}
                              />
                            </div>
                          ))}
                        {comments.filter(
                          (child) => child.parent_id === comment.id
                        ).length > 4 && (
                          <button
                            style={{
                              width: "100%",
                              marginTop: "10px",
                            }}
                            name="expand"
                            type="button"
                            onClick={(e) =>
                              handleChildCommentShow(
                                e,
                                comment.id,
                                childCommentShow[comment.id]?.expand !== true
                                  ? true
                                  : false
                              )
                            }
                          >
                            {childCommentShow[comment.id]?.expand ? (
                              <></>
                            ) : (
                              <>
                                <img
                                  src={ico_arrow_down}
                                  alt="arrow"
                                  style={{
                                    width: "16px",
                                    height: "8px",
                                    marginRight: "8px",
                                    transform:
                                      childCommentShow[comment.id]?.expand !==
                                      true
                                        ? "rotate(0deg)"
                                        : "rotate(180deg)",
                                  }}
                                />
                                더보기
                              </>
                            )}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  {childCommentShow[comment.id]?.form ? (
                    <div className={styles.write_child}>
                      <div className={styles.form}>
                        <img src={ico_profile} alt="profile" />
                        <TextField
                          placeholder={
                            user.id
                              ? "댓글을 작성해주세요."
                              : "로그인 후 이용해주세요."
                          }
                          multiline
                          fullWidth
                          minRows={1}
                          maxRows={4}
                          value={childCommentValues[comment.id]?.content || ""}
                          onChange={(e) => handleChildComment(e, comment.id)}
                          disabled={user.id ? false : true}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#aaa",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#6269F5",
                                borderWidth: "1px",
                              },
                            },
                          }}
                        />
                        <button
                          type="button"
                          disabled={
                            childCommentValues[comment.id]?.content === ""
                          }
                          onClick={() => handleSubmitChildComment(comment.id)}
                        >
                          등록
                        </button>
                      </div>
                      <button
                        name="form"
                        type="button"
                        onClick={(e) =>
                          handleChildCommentShow(e, comment.id, false)
                        }
                      >
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
                        댓글 닫기
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Comments;
