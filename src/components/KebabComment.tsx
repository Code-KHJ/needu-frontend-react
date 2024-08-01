import React, { useEffect, useRef, useState } from "react";
import btn_kebab from "@/assets/images/btn_kebab.png";
import ReportModal from "./modal/ReportModal";
import { useUser } from "@/contexts/UserContext";

interface KebabCommentProps {
  postType: string;
  target_id: number;
  target_parent_id: number;
  target_writer: number;
  user_id: number;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const KebabComment: React.FC<KebabCommentProps> = ({
  postType,
  target_id,
  target_writer,
  user_id,
  onEditClick,
  onDeleteClick,
}) => {
  //@ts-ignore
  const { user } = useUser();
  const [showKebab, setShowKebab] = useState(false);
  const handleKebab = () => {
    setShowKebab(!showKebab);
  };

  const [modal, setModal] = useState({
    isOpen: false,
    target:
      postType === "notice"
        ? "공지사항 댓글"
        : postType === "free"
        ? "자유게시판 댓글"
        : postType === "question"
        ? "질문&답변 댓글"
        : "댓글",
    target_id: target_id,
  });
  const handleModalTarget = () => {
    setModal({
      ...modal,
      isOpen: true,
    });
  };
  const closeModal = () => {
    setModal({
      ...modal,
      isOpen: false,
    });
  };

  const kebabRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !modal.isOpen &&
        kebabRef.current &&
        !kebabRef.current.contains(e.target as Node)
      ) {
        setShowKebab(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [kebabRef, modal]);

  return (
    <>
      {user.id ? (
        <div style={{ position: "relative" }}>
          <img
            src={btn_kebab}
            style={{ cursor: "pointer" }}
            alt="kebab"
            onClick={() => handleKebab()}
          />
          {user_id === target_writer
            ? showKebab && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    position: "absolute",
                    right: "4px",
                  }}
                  ref={kebabRef}
                >
                  <div
                    style={{
                      padding: "6px 12px",
                      whiteSpace: "nowrap",
                      backgroundColor: "#fff",
                      border: "1px solid #aaa",
                      borderRadius: "5px",
                      color: "#222",
                      cursor: "pointer",
                    }}
                    onClick={() => onEditClick()}
                  >
                    수정
                  </div>
                  <div
                    style={{
                      padding: "6px 12px",
                      whiteSpace: "nowrap",
                      backgroundColor: "#fff",
                      border: "1px solid #aaa",
                      borderRadius: "5px",
                      color: "#222",
                      cursor: "pointer",
                    }}
                    onClick={() => onDeleteClick()}
                  >
                    삭제
                  </div>
                </div>
              )
            : showKebab && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    position: "absolute",
                    right: "4px",
                  }}
                  ref={kebabRef}
                >
                  <div
                    style={{
                      padding: "6px 12px",
                      whiteSpace: "nowrap",
                      backgroundColor: "#fff",
                      border: "1px solid #aaa",
                      borderRadius: "5px",
                      color: "#222",
                      cursor: "pointer",
                    }}
                    onClick={() => handleModalTarget()}
                  >
                    신고
                  </div>
                  <ReportModal
                    target={modal.target}
                    target_id={modal.target_id}
                    modalOpen={modal.isOpen}
                    closeModal={closeModal}
                  />
                </div>
              )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default KebabComment;
