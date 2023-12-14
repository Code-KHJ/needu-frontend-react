import React, { useEffect, useState } from "react";
import { regEmail, regPw } from "@/utils/validation";
import "./Login.scss";
import axios from "axios";
import ModalComponent from "@/components/modal/Modal";

const Login = () => {
  // 입력폼 유효성검사
  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    switch (e.target.name) {
      case "id":
        validation(regEmail, e.target);
        break;
      case "password":
        validation(regPw, e.target);
        break;
    }
  };

  const validation = (reg: RegExp, target: HTMLInputElement) => {
    if (!reg.test(target.value)) {
      target.classList.add("unvalid");
    } else {
      target.classList.remove("unvalid");
    }
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    const isUseridValid = regEmail.test(values.id);
    const isUserpwValid = regPw.test(values.password);
    setIsSubmitDisabled(!(isUseridValid && isUserpwValid));
  }, [values]);

  // 모달 컨트롤
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const openModal = (content: string) => {
    setModalIsOpen(true);
    setModalContent(content);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "auto";
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post("https://needu.site:3000/login", values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
                    value={values.id}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    id="userpw"
                    autoComplete="off"
                    placeholder="비밀번호를 입력하세요"
                    value={values.password}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
              </form>
              <div className="login-option">
                {/* <div className="save_id">
                  <input type="checkbox" id="saveId">
                  <label for="saveId">아이디 저장</label>  
                </div> */}
                <button type="button" onClick={() => openModal("searchId")}>
                  아이디 찾기
                </button>
                <button type="button" onClick={() => openModal("searchPw")}>
                  비밀번호 찾기
                </button>
                <ModalComponent
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  closeModal={closeModal}
                  content={modalContent}
                />
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
          <p>test</p>
        </div>
        <div className="ad-wrap mo-none pc-show">
          {/* <img className="ad" src="/styles/images/needU_login_banner.jpg" alt="광고배너"> */}
        </div>
      </div>
    </>
  );
};

export default Login;
