import SubmitBtn from "@/components/elements/SubmitBtn";
import { regPhone } from "@/utils/validation";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface SearchIdProps {
  styles: CSSModuleClasses;
}

const SearchId: React.FC<SearchIdProps> = ({ styles }) => {
  const [values, setValues] = useState({
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    if (!regPhone.test(e.target.value)) {
      e.target.classList.add("invalid");
    } else {
      e.target.classList.remove("invalid");
    }
  };

  const [msg, setMsg] = useState("");

  //버튼 활성화
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  useEffect(() => {
    setIsSubmitDisabled(!regPhone.test(values.phone));
  }, [values]);

  //폼 제출
  const [resultUserId, setResultUserId] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResultUserId("테스트");
    // const response = await axios.post("/", values, {
    //   headers: { "Content-Type": "application/json" },
    // });

    // setResultUserId(response.data);
  };

  return (
    <>
      <div className={styles.modal_form}>
        <div className={styles.explanation}>
          회원가입 시 작성하신 휴대폰 번호를 입력해주세요.
        </div>
        <form id="search_id" onSubmit={handleSubmit}>
          <fieldset>
            <div className={styles.item}>
              <label>휴대폰 번호</label>
              <div className={styles.item_input}>
                <input
                  type="text"
                  name="phone"
                  autoComplete="off"
                  placeholder="'-'빼고 숫자만 입력하세요."
                  maxLength={11}
                  value={values.phone}
                  onChange={handleChange}
                  required
                ></input>
                <p>{msg}</p>
              </div>
            </div>
            <div
              className={`${styles.item} ${styles.userId}`}
              style={{ display: resultUserId.length > 0 ? "" : "none" }}
            >
              <label>아이디</label>
              <div className={styles.item_input}>
                <input type="text" value={resultUserId} disabled></input>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div className={styles.modal_button}>
        <SubmitBtn
          text="조회"
          targetForm="search_id"
          isSubmitDisabled={isSubmitDisabled}
        />
      </div>
    </>
  );
};

export default SearchId;
