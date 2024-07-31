import React, { useEffect, useRef, useState } from "react";
import btn_kebab from "@/assets/images/btn_kebab.png";
import { useNavigate } from "react-router-dom";
import communityApi from "@/apis/community";
import ReportModal from "./modal/ReportModal";

interface KebabPostProps {
  target: string;
  target_id: number;
  target_writer: number;
  user_id: number;
  isDeletable: boolean;
}

const KebabPost: React.FC<KebabPostProps> = ({
  target,
  target_id,
  target_writer,
  user_id,
  isDeletable,
}) => {
  const navigate = useNavigate();

  const [showKebab, setShowKebab] = useState(false);
  const handleKebab = () => {
    setShowKebab(!showKebab);
  };

  const editContent = () => {
    navigate(`/community/${target}/edit/${target_id}`);
  };

  const deleteContent = async () => {
    if (target_writer !== user_id) {
      alert("본인이 작성한 게시글만 삭제가 가능합니다.");
      return;
    }
    if (isDeletable === false) {
      alert("댓글이 존재하는 게시물은 삭제할 수 없습니다.");
      return;
    }
    const confirmed = confirm(
      "삭제한 게시글은 복구할 수 없습니다. 정말로 게시글을 삭제하시겠습니까?"
    );
    if (confirmed) {
      const response: any = await communityApi.deletePost(target_id);
      if (response.status !== 200) {
        alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }
      alert("게시글이 삭제되었습니다.");
      window.location.reload();
    }
  };

  const [modal, setModal] = useState({
    isOpen: false,
    target:
      target === "free"
        ? "자유게시판"
        : target === "question"
        ? "질문&답변"
        : "",
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
                onClick={() => editContent()}
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
                onClick={() => deleteContent()}
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
  );
};

export default KebabPost;
