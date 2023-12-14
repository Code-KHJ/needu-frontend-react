import SubmitBtn from "@/components/elements/SubmitBtn";
import { regEmail, regPhone } from "@/utils/validation";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchPw = () => {
  const [values, setValues] = useState({
    id: "",
    authCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    switch (e.target.name) {
      case "id":
        if (!regEmail.test(e.target.value)) {
          e.target.classList.add("unvalid");
        } else {
          e.target.classList.remove("unvalid");
        }
        break;
      case "authCode":
        break;
    }
  };

  const [msg, setMsg] = useState("");

  //버튼 활성화
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    setIsSubmitDisabled(!regPhone.test(values.phone));
  }, [values]);

  //폼 제출
  const [resultUserId, setResultUserId] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post("/", values, {
      headers: { "Content-Type": "application/json" },
    });

    setResultUserId(response.data);
  };

  return (
    <>
      <div className="modal-form">
        <div className="explanation">
          아이디(eamil)로 발송된 인증번호를 확인해주세요.
        </div>
        <form id="search_pw" onSubmit={handleSubmit}>
          <fieldset>
            <div className="item">
              <label>아이디</label>
              <div className="item-input">
                <input
                  type="text"
                  name="id"
                  placeholder="아이디(이메일)을 입력하세요"
                  value={values.id}
                  onChange={handleChange}
                  required
                ></input>
                <p>{msg}</p>
              </div>
            </div>
            <div className="item">
              <label>인증번호</label>
              <div className="item-input">
                <input
                  type="text"
                  name="authCode"
                  placeholder="인증번호를 입력하세요"
                  value={values.authCode}
                  onChange={handleChange}
                  required
                ></input>
                <p>{msg}</p>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="modal-button">
        <SubmitBtn
          text="조회"
          targetForm="search_pw"
          isSubmitDisabled={isSubmitDisabled}
        />
      </div>
    </>
  );
};

export default SearchPw;
