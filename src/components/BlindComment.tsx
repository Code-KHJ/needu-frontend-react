import { BlindType } from "@/common/BlindType";
import React from "react";

interface BlindCommentProps {
  type: number;
}

const BlindComment: React.FC<BlindCommentProps> = ({ type }) => {
  const blindType = BlindType;

  const createMarkup = (htmlString: any) => {
    return { __html: htmlString };
  };

  return (
    <div
      style={{
        background: "#d9d9d9",
        border: "1px solid #d9d9d9",
        borderRadius: "5px",
        padding: "20px",
      }}
    >
      <h5 style={{ textAlign: "center" }}>게시가 중단된 리뷰입니다.</h5>
      <div style={{ marginTop: "40px" }}>
        <span>
          <h5 style={{ display: "inline", marginRight: "8px" }}>
            게시 중단 사유
          </h5>
          {blindType.find((item) => item.index === type)?.reason}로 인한 게시
          중단
        </span>
        <ul
          style={{
            marginTop: "8px",
            paddingLeft: "20px",
            listStyleType: "disc",
          }}
        >
          <li
            dangerouslySetInnerHTML={createMarkup(
              blindType.find((item) => item.index === type)?.comment
            )}
          ></li>
        </ul>
      </div>
    </div>
  );
};

export default BlindComment;
