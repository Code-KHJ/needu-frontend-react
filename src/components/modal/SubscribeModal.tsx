import sharedApi from "@/apis/shared";
import ico_arrow from "@/assets/images/arrow_right.png";
import ico_checked from "@/assets/images/ico_checked.svg";
import ico_unchecked from "@/assets/images/ico_unchecked.svg";
import { regEmail } from "@/utils/validation";
import { useEffect, useState } from "react";
import Input from "../elements/Input";
import ModalComponent from "./Modal";
import styles from "./Modal.module.scss";

interface SubscribeModalProps {
  modalOpen: boolean;
  onClickCancel: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({
  modalOpen,
  onClickCancel,
}) => {
  const [values, setValues] = useState({
    nickname: "",
    email: "",
    subscribe: false,
  });

  const handleValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "subscribe_nickname":
        setValues({
          ...values,
          nickname: value,
        });
        break;
      case "subscribe_email":
        setValues({
          ...values,
          email: value,
        });
        break;
    }
  };

  useEffect(() => {
    setValues({
      nickname: "",
      email: "",
      subscribe: false,
    });
    setSubmitted(false);
  }, [modalOpen]);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (values.nickname === "") {
      alert("이름/닉네임을 입력해주세요.");
      return;
    }
    if (!regEmail.test(values.email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (!values.subscribe) {
      alert("수신동의에 체크해주세요.");
      return;
    }
    const response: any = await sharedApi.subscribe(values);
    if (response.status !== 201) {
      alert("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setSubmitted(true);
  };
  return (
    <>
      {!submitted ? (
        <ModalComponent
          title="뉴스레터 구독 신청"
          modalOpen={modalOpen}
          closeModal={onClickCancel}
        >
          <div>
            <div>
              <h3>&lt;NEEDU 레터&gt; 구독 신청</h3>
              <p style={{ marginTop: "20px" }}>
                &lt;NEEDU 레터&gt;는 사회복지분야의 소식을 알려드리고 어쩌고
                저쩌고 새로운 뉴스레터입니다. 격주로 뉴스레터를 통해
                사회복지계의 소식을 확인해보세요! 블라블라
                <br /> <br />
                매월 2,4째주 무슨 요일에 니쥬레터와 함께하세요.
              </p>
            </div>
            <form
              style={{
                marginTop: "48px",
                display: "flex",
                flexDirection: "column",
                gap: "40px",
              }}
            >
              <div>
                <h4>이름/닉네임</h4>
                <Input
                  type="text"
                  name="subscribe_nickname"
                  className="input_filled"
                  value={values.nickname}
                  placeholder="이름/닉네임을 입력해주세요"
                  onChange={handleValues}
                  readOnly={false}
                  required={true}
                />
              </div>
              <div>
                <h4>이메일</h4>
                <Input
                  type="text"
                  name="subscribe_email"
                  className="input_filled"
                  value={values.email}
                  placeholder="뉴스레터를 구독할 이메일 주소를 입력해주세요"
                  onChange={handleValues}
                  readOnly={false}
                  required={true}
                />
              </div>
              <div>
                <h4>개인정보 수집 및 이용 동의</h4>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                    onClick={() =>
                      setValues({ ...values, subscribe: !values.subscribe })
                    }
                  >
                    <img src={values.subscribe ? ico_checked : ico_unchecked} />
                  </button>
                  <label htmlFor="check_3">
                    (필수) 개인정보 수집 및 이용에 동의
                  </label>
                  <a
                    href="https://neighborly-arithmetic-8e6.notion.site/d262bf0970b143fa97cfb93552a1b33f?pvs=4"
                    target="_blank"
                    style={{ display: "flex" }}
                  >
                    <img
                      src={ico_arrow}
                      alt="화살표"
                      style={{ height: "16px" }}
                    />
                  </a>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.btn_2}>
            <button
              style={{
                backgroundColor: "#aaa",
              }}
              onClick={onClickCancel}
            >
              취소
            </button>
            <button
              style={{
                backgroundColor: "#6269f5",
              }}
              onClick={handleSubmit}
            >
              신청
            </button>
          </div>
        </ModalComponent>
      ) : (
        <ModalComponent
          title="뉴스레터 구독 신청 완료"
          modalOpen={modalOpen}
          closeModal={onClickCancel}
        >
          <div>
            <div>
              <h3>&lt;NEEDU 레터&gt; 구독 신청 완료</h3>
              <p style={{ marginTop: "20px" }}>
                구독 신청이 완료되었습니다. 감사합니다. 어쩌구
              </p>
            </div>
          </div>
        </ModalComponent>
      )}
    </>
  );
};

export default SubscribeModal;
