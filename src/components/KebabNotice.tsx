import React, { useEffect, useRef, useState } from "react";
import btn_kebab from "@/assets/images/btn_kebab.png";
import { useNavigate } from "react-router-dom";
import communityApi from "@/apis/community";
import { useUser } from "@/contexts/UserContext";

interface KebabNoticeProps {
  target_id: number;
}

const KebabNotice: React.FC<KebabNoticeProps> = ({ target_id }) => {
  //@ts-ignore
  const { user } = useUser();
  const navigate = useNavigate();

  const [showKebab, setShowKebab] = useState(false);
  const handleKebab = () => {
    setShowKebab(!showKebab);
  };

  const editContent = () => {
    if (user.authority !== 100) {
      alert("권한이 없습니다.");
      return;
    }
    navigate(`/notice/edit/${target_id}`);
  };

  const deleteContent = async () => {
    if (user.authority !== 100) {
      alert("권한이 없습니다.");
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
      navigate("/");
    }
  };

  const kebabRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (kebabRef.current && !kebabRef.current.contains(e.target as Node)) {
        setShowKebab(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [kebabRef]);

  return (
    <>
      {user.authority === 100 ? (
        <div style={{ position: "relative" }}>
          <img
            src={btn_kebab}
            style={{ cursor: "pointer" }}
            alt="kebab"
            onClick={() => handleKebab()}
          />
          {showKebab && (
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
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default KebabNotice;
