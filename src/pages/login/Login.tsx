import React from "react";
import "./Login.scss";

const Login = () => {
  return (
    <>
      <div className="main_wrap">
        <div className="login_wrap">
          <h1>사회복지기관 리뷰 플랫폼 NEEDU</h1>
          <div className="login_box" id="form_login_user">
            <div className="login_input_wrap">
              <form id="form_user" method="post" action="/login">
                <fieldset>
                  <input
                    type="text"
                    name="id"
                    id="userid"
                    placeholder="아이디(이메일형식)를 입력하세요"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    id="userpw"
                    autoComplete="off"
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
                </fieldset>
              </form>
              <div className="login_option">
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
              className=""
              id="submit_user"
              form="form_user"
              disabled
            >
              로그인
            </button>
          </div>
          <div className="to_signup">
            아직 회원이 아니신가요?<a href="/signup">회원가입</a>
          </div>
        </div>
        <div className="ad_wrap mo_none pc_show">
          {/* <img className="ad" src="/styles/images/needU_login_banner.jpg" alt="광고배너"> */}
        </div>
      </div>
    </>
  );
};

export default Login;
