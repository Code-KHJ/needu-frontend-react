import React, { useEffect, useState } from "react";
import { regEmail, regPw } from "@/utils/validation";
import "./Login.scss";
import axios from "axios";

const Login = () => {
  const [userid, setUserid] = useState<string>("");
  const [userpw, setUserpw] = useState<string>("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleUserid = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserid(event.target.value);
    if (!regEmail.test(event.target.value)) {
      event.target.classList.add("unvalid");
      return;
    }
    event.target.classList.remove("unvalid");
  };
  const handleUserpw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserpw(event.target.value);
    if (!regPw.test(event.target.value)) {
      event.target.classList.add("unvalid");
      return;
    }
    event.target.classList.remove("unvalid");
  };

  useEffect(() => {
    const isUseridValid = regEmail.test(userid);
    const isUserpwValid = regPw.test(userpw);
    setIsSubmitDisabled(!(isUseridValid && isUserpwValid));
  }, [userid, userpw]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await axios.post(
      "https://needu.site:3000/login",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  };

  return (
    <>
      <div className="main-wrap">
        <div className="login-wrap">
          <h1>사회복지기관 리뷰 플랫폼 NEEDU</h1>
          <div className="login-box" id="form_login_user">
            <div className="login-input-wrap">
              <form id="form_user" onSubmit={handleSubmit}>
                <fieldset>
                  <input
                    type="text"
                    name="id"
                    id="userid"
                    placeholder="아이디(이메일형식)를 입력하세요"
                    value={userid}
                    onInput={handleUserid}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    id="userpw"
                    autoComplete="off"
                    placeholder="비밀번호를 입력하세요"
                    value={userpw}
                    onInput={handleUserpw}
                    required
                  />
                </fieldset>
              </form>
              <div className="login-option">
                {/* <div className="save_id">
                  <input type="checkbox" id="saveId">
                  <label for="saveId">아이디 저장</label>  
                </div> */}
                <button type="button">아이디 찾기</button>
                <button type="button">비밀번호 찾기</button>
              </div>
            </div>
            <button
              type="submit"
              className={`btn_login ${isSubmitDisabled ? "" : "btn-able"}`}
              id="btn_login"
              form="form_user"
              disabled={isSubmitDisabled}
            >
              로그인
            </button>
          </div>
          <div className="to-signup">
            아직 회원이 아니신가요?<a href="/signup">회원가입</a>
          </div>
        </div>
        <div className="ad-wrap mo-none pc-show">
          {/* <img className="ad" src="/styles/images/needU_login_banner.jpg" alt="광고배너"> */}
        </div>
      </div>
    </>
  );
};

export default Login;
