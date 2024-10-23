import React from "react";
import img_error from "@/assets/images/404.png";
import { Link, useLocation } from "react-router-dom";

const Error = () => {
  const previousPage = useLocation().state?.previous;
  console.log(previousPage);
  return (
    <div
      style={{
        width: "70%",
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>죄송합니다. 예상치 못한 오류가 발생하였습니다.</h3>
      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        {previousPage && <Link to={previousPage}>이전 페이지로 돌아가기</Link>}
        <Link to="/">메인 페이지로 가기</Link>
      </div>
      <img
        src={img_error}
        alt="error"
        style={{ width: "100%", maxWidth: "325px", marginTop: "100px" }}
      />
    </div>
  );
};

export default Error;
