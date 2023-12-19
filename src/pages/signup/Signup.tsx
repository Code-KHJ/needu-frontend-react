import React, { useEffect, useState } from "react";
import styles from "./Signup.module.scss";
import { regEmail, regNickname, regPhone, regPw } from "@/utils/validation";

const Signup = () => {
  //유효성 검사
  const [values, setValues] = useState({
    id: "",
    password: "",
    password2: "",
    phonenumber: "",
    nickname: "",
    policy: false,
    personal_info: false,
    marketing_email: false,
    marketing_SMS: false,
    info_period: "탈퇴시",
  });

  const [validValues, setValidValues] = useState({
    id: false,
    password: false,
    password2: false,
    phonenumber: false,
    nickname: false,
    policy: false,
    personal_info: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setValues({
      ...values,
      [name]: inputValue,
    });
    switch (name) {
      case "id":
        validate(regEmail, e.target);
        break;
      case "password":
        validate(regPw, e.target);
        break;
      case "password2":
        if (value !== values.password) {
          e.target.classList.add("invalid");
          setValidValues({
            ...validValues,
            [name]: false,
          });
        } else {
          e.target.classList.remove("invalid");
          setValidValues({
            ...validValues,
            [name]: true,
          });
        }
        break;
      case "phonenumber":
        validate(regPhone, e.target);
        break;
      case "nickname":
        validate(regNickname, e.target);
        break;
      case "policy":
        setValidValues({
          ...validValues,
          [name]: checked,
        });
        break;
      case "personal_info":
        setValidValues({
          ...validValues,
          [name]: checked,
        });
        break;
      default:
        break;
    }
  };

  const validate = (reg: RegExp, target: HTMLInputElement) => {
    if (!reg.test(target.value)) {
      target.classList.add("invalid");
      setValidValues({
        ...validValues,
        [target.name]: false,
      });
    } else {
      target.classList.remove("invalid");
      setValidValues({
        ...validValues,
        [target.name]: true,
      });
    }
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    const isSubmit = Object.values(validValues).every((value) => value);
    console.log(isSubmit);
    setIsSubmitDisabled(!isSubmit);
  }, [values, validValues]);

  return (
    <>
      <div className={styles.signup_wrap}>
        {/* <!-- 회원가입 입력폼 --> <!-- name 부분은 DB 필드이름하고 매치--> */}
        <div className={styles.signup}>
          <form name="frm" id="frm" method="post" action="/signup">
            <div className={styles.write_wrap}>
              {/* <!-- 아이디 --> */}
              <div className={styles.item}>
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
                    value={values.id}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className={styles.req_btn} disabled>
                    인증요청
                  </button>
                </div>
                <div
                  className={styles.checkmsg}
                  id="checkidmsg"
                  style={{ display: "none" }}
                ></div>
              </div>
              <div className={`${styles.item} ${styles.checkEmail}`}>
                <div>
                  <input
                    type="text"
                    className={styles.authCode_input}
                    maxLength={40}
                    style={{ imeMode: "disabled" }}
                    autoCapitalize="off"
                    autoComplete="off"
                    placeholder="인증번호를 입력해주세요."
                    required
                  />
                  <button type="button" className={styles.confirm_btn} disabled>
                    확인
                  </button>
                </div>
                <div
                  className={styles.checkmsg}
                  id="checkidmsg"
                  style={{ display: "none" }}
                ></div>
              </div>
              {/* <!-- 비밀번호 --> */}
              <div className={styles.item}>
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
                  value={values.password}
                  onChange={handleChange}
                  required
                />
                <div
                  className={styles.checkmsg}
                  id="checkpw1msg"
                  style={{ display: "none" }}
                ></div>
              </div>
              {/* <!-- 비밀번호 확인 --> */}
              <div className={styles.item}>
                <label htmlFor="password2">
                  비밀번호 확인<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  className=""
                  maxLength={16}
                  style={{ imeMode: "disabled" }}
                  autoComplete="off"
                  placeholder="비밀번호를 다시 한번 입력해주세요"
                  value={values.password2}
                  onChange={handleChange}
                  required
                />
                <div
                  className={styles.checkmsg}
                  id="checkpw2msg"
                  style={{ display: "none" }}
                ></div>
              </div>
              {/* <!-- 휴대폰 번호 --> */}
              <div className={styles.item}>
                <label htmlFor="phone">
                  휴대폰<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="phonenumber"
                  id="phone"
                  className=""
                  autoComplete="off"
                  placeholder="휴대전화 번호('-'빼고 숫자만 입력)"
                  maxLength={11}
                  value={values.phonenumber}
                  onChange={handleChange}
                  required
                />
                <div
                  className={styles.checkmsg}
                  id="checkPnmsg"
                  style={{ display: "none" }}
                ></div>
              </div>
              {/* <!-- 닉네임 --> */}
              <div className={styles.item}>
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
                  value={values.nickname}
                  onChange={handleChange}
                  required
                />
                <div
                  className={styles.checkmsg}
                  id="checknmmsg"
                  style={{ display: "none" }}
                ></div>
              </div>
            </div>
            <div className={styles.join_agree}>
              <div className={styles.join_input_all}>
                <input type="checkbox" id="check_1" />
                <label htmlFor="check_1">전체동의</label>
              </div>
              <div className={styles.join_input}>
                <input
                  type="checkbox"
                  name="policy"
                  id="check_2"
                  checked={values.policy}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="check_2">(필수) 개인 회원 약관에 동의</label>
                <span className={`material-symbols-outlined ${styles.arrow}`}>
                  <a
                    href="https://neighborly-arithmetic-8e6.notion.site/NEEDU-2023-08-06-850d2be0329c403daf4377ade286c4a1?pvs=4"
                    target="_blank"
                  >
                    arrow_forward_ios
                  </a>
                </span>
              </div>
              <div className={styles.join_input}>
                <input
                  type="checkbox"
                  name="personal_info"
                  id="check_3"
                  checked={values.personal_info}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="check_3">
                  (필수) 개인정보 수집 및 이용에 동의
                </label>
                <span className={`material-symbols-outlined ${styles.arrow}`}>
                  <a
                    href="https://neighborly-arithmetic-8e6.notion.site/d262bf0970b143fa97cfb93552a1b33f?pvs=4"
                    target="_blank"
                  >
                    arrow_forward_ios
                  </a>
                </span>
              </div>
              <div className={`${styles.join_input} ${styles.join_input2}`}>
                <input
                  type="checkbox"
                  name="marketing_email"
                  id="check_4"
                  checked={values.marketing_email}
                  onChange={handleChange}
                />
                <label htmlFor="check_4">
                  (선택) 마케팅 정보 수신 동의 - 이메일
                </label>
                <span className={`material-symbols-outlined ${styles.arrow}`}>
                  <a
                    href="https://neighborly-arithmetic-8e6.notion.site/5a691a0824ad4f0180ac55e076da44d7?pvs=4"
                    target="_blank"
                  >
                    arrow_forward_ios
                  </a>
                </span>
              </div>
              <div className={`${styles.join_input} ${styles.join_input2}`}>
                <input
                  type="checkbox"
                  name="marketing_SMS"
                  id="check_5"
                  checked={values.marketing_SMS}
                  onChange={handleChange}
                />
                <label htmlFor="check_5">
                  (선택) 마케팅 정보 수신 동의 - SMS/MMS
                </label>
                <span className={`material-symbols-outlined ${styles.arrow}`}>
                  <a
                    href="https://neighborly-arithmetic-8e6.notion.site/sms-9de40b40848d4b19a0a36440941da5b3?pvs=4"
                    target="_blank"
                  >
                    arrow_forward_ios
                  </a>
                </span>
              </div>
            </div>
            <div className={styles.join_radio}>
              <div>정보보유기간</div>
              <ul className={styles.join_radio_ul}>
                <li>
                  <input
                    type="radio"
                    name="info_period"
                    value="탈퇴시"
                    id="input_radio1"
                    onChange={handleChange}
                    checked={values.info_period === "탈퇴시"}
                  />
                  <label htmlFor="input_radio1">탈퇴시</label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="info_period"
                    value="3년"
                    id="input_radio2"
                    onChange={handleChange}
                    checked={values.info_period === "3년"}
                  />
                  <label htmlFor="input_radio2">3년</label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="info_period"
                    value="1년"
                    id="input_radio3"
                    onChange={handleChange}
                    checked={values.info_period === "1년"}
                  />
                  <label htmlFor="input_radio3">1년</label>
                </li>
              </ul>
            </div>
            <div className={styles.btn_signup}>
              <button
                type="submit"
                id="btnSubmit"
                className={`${isSubmitDisabled ? "" : "btn_able"}`}
                disabled={isSubmitDisabled}
              >
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
