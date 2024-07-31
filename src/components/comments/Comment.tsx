import React, { useEffect, useState } from "react";
import styles from "./Comments.module.scss";
import ico_profile from "@/assets/images/ico_login_gray.png";
import ico_level from "@/assets/images/ico_level_default.png";
import ico_like from "@/assets/images/ico_like.png";
import ico_like_on from "@/assets/images/like_on.png";
import ico_dislike from "@/assets/images/ico_dislike.png";
import ico_dislike_gray from "@/assets/images/ico_dislike_gray.png";
import dompurify from "@/utils/dompurify";
import agoDate from "@/utils/agoDate";
import KebabComment from "@/components/KebabComment";
import { useUser } from "@/contexts/UserContext";
import { CommentContent, LikeCommentDto } from "@/interface/Community";
import communityApi from "@/apis/community";

interface CommentProps {
  parent_id: number;
  comment: CommentContent;
  onAction: () => void;
  isDeletable: boolean;
  handleChildCommentShow: (
    e: React.MouseEvent<HTMLButtonElement>,
    parent_id: number,
    value: boolean
  ) => void;
}

const Comment: React.FC<CommentProps> = ({
  parent_id,
  comment,
  onAction,
  isDeletable,
  handleChildCommentShow,
}) => {
  //@ts-ignore
  const { user } = useUser();

  useEffect(() => {
    if (!comment) return;
    const likeState = {
      like: 0,
      dislike: 0,
      isLike: false,
      isDislike: false,
    };
    comment.commentLikes.forEach((like) => {
      if (like.type === 1) {
        likeState.like += 1;
      } else if (like.type === -1) {
        likeState.dislike += 1;
      }
      if (user.id === like.user_id) {
        if (like.type === 1) {
          likeState.isLike = true;
        } else if (like.type === -1) {
          likeState.isDislike = true;
        }
      }
    });
    setCommentLikeState(likeState);
  }, [comment]);

  const [commentLikeState, setCommentLikeState] = useState({
    like: 0,
    dislike: 0,
    isLike: false,
    isDislike: false,
  });
  let isProcessingCommentLike = false;
  const likeComment = async (type: string, commentId: number) => {
    if (isProcessingCommentLike) return alert("이전 요청을 처리중입니다.");
    isProcessingCommentLike = true;

    try {
      if (!user || user.id === null) {
        alert("로그인 후 이용이 가능합니다.");
        return;
      }
      if (type === "like" && commentLikeState.isDislike) {
        alert("이미 리액션을 하셨습니다. 리액션을 취소 후 다시 시도해주세요.");
        return;
      }
      if (type === "dislike" && commentLikeState.isLike) {
        alert("이미 리액션을 하셨습니다. 리액션을 취소 후 다시 시도해주세요.");
        return;
      }
      const likeDto: LikeCommentDto = {
        comment_id: commentId,
        user_id: user.id,
        type: type,
      };
      const response: any =
        type === "notice" ? "" : await communityApi.updateCommentLike(likeDto);
      if (response.status !== 200) {
        alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      if (response.data.msg === "타입오류") {
        alert("이미 리액션을 하셨습니다. 리액션을 취소 후 다시 시도해주세요.");
        return;
      }
      if (likeDto.type === "like") {
        setCommentLikeState((prevState) => ({
          ...prevState,
          like:
            response.data.msg === "좋아요"
              ? prevState.like + 1
              : prevState.like - 1,
          isLike: response.data.msg === "좋아요" ? true : false,
        }));
        return;
      }
      if (likeDto.type === "dislike") {
        setCommentLikeState((prevState) => ({
          ...prevState,
          dislike:
            response.data.msg === "싫어요"
              ? prevState.dislike + 1
              : prevState.dislike - 1,
          isDislike: response.data.msg === "싫어요" ? true : false,
        }));
        return;
      }
    } catch (error) {
      alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      isProcessingCommentLike = false;
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

  //댓글 삭제
  const deleteContent = async () => {
    if (comment.writer.id !== user.id) {
      alert("본인이 작성한 댓글만 삭제가 가능합니다.");
      return;
    }
    if (isDeletable === false) {
      alert("댓글이 존재하는 게시물은 삭제할 수 없습니다.");
      return;
    }
    const confirmed = confirm(
      "삭제한 댓글은 복구할 수 없습니다. 정말로 댓글을 삭제하시겠습니까?"
    );
    if (confirmed) {
      const response: any = await communityApi.deleteComment(comment.id);
      if (response.status !== 200) {
        alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      alert("댓글이 삭제되었습니다.");
      onAction();
    }
  };

  return (
    <div className={styles.comment_item}>
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
            <div style={{ color: "#aaa" }}>{agoDate(comment.created_at)}</div>
          </div>
        </div>
        <KebabComment
          target_id={comment.id}
          target_parent_id={comment.parent_id}
          target_writer={comment.writer.id}
          user_id={user.id}
          onEditClick={() => handleIsEditComment(comment.id)}
          onDeleteClick={deleteContent}
        />
      </div>
      <div className={styles.comment_body}>
        {isEditComment[comment.id] ? (
          <div
            className={styles.comment_content}
            dangerouslySetInnerHTML={{
              __html: dompurify(comment.content),
            }}
          ></div>
        ) : (
          <div
            className={styles.comment_content}
            dangerouslySetInnerHTML={{
              __html: dompurify(comment.content),
            }}
          ></div>
        )}
        <div className={styles.likes}>
          <button onClick={() => likeComment("like", comment.id)}>
            <img
              src={commentLikeState.isLike ? ico_like_on : ico_like}
              alt="좋아요"
            />
            <span style={commentLikeState.isLike ? { color: "#6269f5" } : {}}>
              {commentLikeState.like}
            </span>
          </button>
          <button onClick={() => likeComment("dislike", comment.id)}>
            <img
              src={commentLikeState.isDislike ? ico_dislike_gray : ico_dislike}
              alt="싫어요"
            />
            <span>{commentLikeState.dislike}</span>
          </button>
          <button
            name="form"
            type="button"
            onClick={(e) => handleChildCommentShow(e, parent_id, true)}
          >
            댓글달기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
