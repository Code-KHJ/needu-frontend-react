import React from "react";
import "./Signup.scss";

const Signup = () => {
  return (
    <>
      <div className="signin_container">
        {/* <!-- 회원가입 입력폼 --> <!-- name 부분은 DB 필드이름하고 매치--> */}
        <div className="signup">
          <form name="frm" id="frm" method="post" action="/signup">
            <div className="write_base">
              {/* <!-- 아이디 --> */}
              <div className="item">
                <label htmlFor="id">
                  이메일(ID)<span style={{ color: "red" }}>*</span>
                </label>
                <div>
                  <input
                    type="email"
                    name="id"
                    id="id"
                    className=""
                    maxLength={40}
                    style={{ imeMode: "disabled" }}
                    autoCapitalize="off"
                    autoComplete="off"
                    placeholder="이메일(ID)를 입력해주세요."
                    required
                  />
                  <button type="button" className="req-btn" disabled>
                    인증요청
                  </button>
                </div>
                <div
                  className="checkmsg"
                  id="checkidmsg"
                  style={{ display: "none" }}
                ></div>
              </div>
              <div className="item checkEmail">
                <div>
                  <input
                    type="text"
                    className="authCode-input"
                    maxLength={40}
                    style={{ imeMode: "disabled" }}
                    autoCapitalize="off"
                    autoComplete="off"
                    placeholder="인증번호를 입력해주세요."
                    required
                  />
                  <button type="button" className="confirm-btn" disabled>
                    확인
                  </button>
                </div>
                <div
                  className="checkmsg"
                  id="checkidmsg"
                  style={{ display: "none" }}
                ></div>
              </div>
              {/* <!-- 비밀번호 --> */}
              <div className="item">
                <label htmlFor="password1">
                  비밀번호<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password1"
                  className=""
                  maxLength={16}
                  style={{ imeMode: "disabled" }}
                  autoComplete="off"
                  placeholder="비밀번호(8~16자리) 영문 대소문자, 숫자, 특수문자 조합"
                  required
                />
                <div
                  className="checkmsg"
                  id="checkpw1msg"
                  style={{ display: "none" }}
                ></div>
              </div>
              {/* <!-- 비밀번호 확인 --> */}
              <div className="item">
                <label htmlFor="password2">
                  비밀번호 확인<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  id="password2"
                  className=""
                  maxLength={16}
                  style={{ imeMode: "disabled" }}
                  autoComplete="off"
                  placeholder="비밀번호를 다시 한번 입력해주세요"
                  required
                />
                <div
                  className="checkmsg"
                  id="checkpw2msg"
                  style={{ display: "none" }}
                ></div>
              </div>
              {/* <!-- 휴대폰 번호 --> */}
              <div className="item">
                <label htmlFor="phonenumber">
                  휴대폰<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="phonenumber"
                  id="phonenumber"
                  className=""
                  autoComplete="off"
                  placeholder="휴대전화 번호('-'빼고 숫자만 입력)"
                  required
                />
                <div
                  className="checkmsg"
                  id="checkPnmsg"
                  style={{ display: "none" }}
                ></div>
              </div>
              {/* <!-- 닉네임 --> */}
              <div className="item">
                <label htmlFor="nickname">
                  닉네임<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="nickname"
                  id="nickname"
                  className=""
                  minLength={2}
                  maxLength={20}
                  autoComplete="off"
                  placeholder="닉네임을 입력해주세요"
                  required
                />
                <div
                  className="checkmsg"
                  id="checknmmsg"
                  style={{ display: "none" }}
                ></div>
              </div>
            </div>
            <div className="join_agree">
              <div className="join_input_all">
                <input type="checkbox" id="check_1" />
                <label htmlFor="check_1">전체동의</label>
              </div>
              <div className="join_input">
                <input type="checkbox" name="check_2" id="check_2" required />
                <label htmlFor="check_2">(필수) 개인 회원 약관에 동의</label>
                <span className="material-symbols-outlined">
                  <a
                    href="https://neighborly-arithmetic-8e6.notion.site/NEEDU-2023-08-06-850d2be0329c403daf4377ade286c4a1?pvs=4"
                    target="_blank"
                  >
                    arrow_forward_ios
                  </a>
                </span>
              </div>
              <div className="join_input">
                <input type="checkbox" name="check_3" id="check_3" required />
                <label htmlFor="check_3">
                  (필수) 개인정보 수집 및 이용에 동의
                </label>
                <span className="material-symbols-outlined">
                  <a
                    href="https://neighborly-arithmetic-8e6.notion.site/d262bf0970b143fa97cfb93552a1b33f?pvs=4"
                    target="_blank"
                  >
                    arrow_forward_ios
                  </a>
                </span>
              </div>
              <div className="join_input join_input2">
                <input type="checkbox" name="check_4" id="check_4" />
                <label htmlFor="check_4">
                  (선택) 마케팅 정보 수신 동의 - 이메일
                </label>
                <span className="material-symbols-outlined">
                  <a
                    href="https://neighborly-arithmetic-8e6.notion.site/5a691a0824ad4f0180ac55e076da44d7?pvs=4"
                    target="_blank"
                  >
                    arrow_forward_ios
                  </a>
                </span>
              </div>
              <div className="join_input join_input2">
                <input type="checkbox" name="check_5" id="check_5" />
                <label htmlFor="check_5">
                  (선택) 마케팅 정보 수신 동의 - SMS/MMS
                </label>
                <span className="material-symbols-outlined">
                  <a
                    href="https://neighborly-arithmetic-8e6.notion.site/sms-9de40b40848d4b19a0a36440941da5b3?pvs=4"
                    target="_blank"
                  >
                    arrow_forward_ios
                  </a>
                </span>
              </div>
            </div>
            <div className="join_radio">
              <div>정보보유기간</div>
              <ul className="join_radio_ul">
                <li>
                  <input
                    type="radio"
                    name="radio1"
                    value="탈퇴시"
                    id="input_radio1"
                    checked
                  />
                  <label htmlFor="input_radio1">탈퇴시</label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="radio1"
                    value="3년"
                    id="input_radio2"
                  />
                  <label htmlFor="input_radio2">3년</label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="radio1"
                    value="1년"
                    id="input_radio3"
                  />
                  <label htmlFor="input_radio3">1년</label>
                </li>
              </ul>
            </div>
            <div className="btn_signup">
              <button type="submit" id="btnSubmit" className="" disabled>
                회원가입 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
