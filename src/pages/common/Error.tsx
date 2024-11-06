import img_error from "@/assets/images/img_error.png";
import { Link, useLocation } from "react-router-dom";
import Helmets from "../helmets";

const Error = () => {
  const previousPage = useLocation().state?.previous;
  return (
    <>
      <Helmets title={"Error"} description=""></Helmets>
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
        <img
          src={img_error}
          alt="error"
          style={{
            width: "100%",
            maxWidth: "400px",
          }}
        />
        <p className="body1" style={{ marginTop: "80px" }}>
          죄송합니다. 예상치 못한 오류가 발생하였습니다.
        </p>
        <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
          {previousPage && (
            <Link className="subtitle" to={previousPage}>
              이전 페이지로 돌아가기
            </Link>
          )}
          <Link to="/">메인 페이지로 가기</Link>
        </div>
      </div>
    </>
  );
};

export default Error;
