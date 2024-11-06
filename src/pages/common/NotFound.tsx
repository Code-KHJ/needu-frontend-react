import img_error from "@/assets/images/img_404.png";
import { Link, useLocation } from "react-router-dom";
import Helmets from "../helmets";

const NotFound = () => {
  const previousPage = useLocation().state?.previous || "/";

  return (
    <>
      <Helmets title={"NotFound"} description=""></Helmets>
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
          style={{ width: "100%", maxWidth: "400px" }}
        />
        <p className="body1" style={{ marginTop: "80px" }}>
          죄송합니다. 해당 페이지를 찾을 수 없습니다.
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

export default NotFound;
