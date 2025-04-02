import React, { useEffect, useState } from "react";
import Helmets from "../helmets";
import styles from "./Subscribe.module.scss";
import Input from "../../components/elements/Input";
import ico_arrow from "@/assets/images/arrow_right.png";
import ico_checked from "@/assets/images/ico_checked.svg";
import ico_unchecked from "@/assets/images/ico_unchecked.svg";
import { regEmail, regNickname } from "@/utils/validation";
import sharedApi from "@/apis/shared";
import { useNavigate } from "react-router-dom";
import Button from "@/components/elements/Button";
import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";
import axios from "axios";

const Subscribe = () => {
  const [blockMap, setBlockMap] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(
          `https://notion-api.splitbee.io/v1/page/1b05b8e9f5f280988779ebab0ae490ce`
        );
        setBlockMap(res.data);
      } catch (error) {
        console.error("Notion 데이터 가져오기 오류:", error);
      }
    };
    loadData();
  }, []);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    nickname: "",
    email: "",
    subscribe: false,
  });
  type ValidValues = {
    nickname: boolean | null;
    email: boolean | null;
    subscribe: boolean;
  };
  const [validValues, setValidValues] = useState<ValidValues>({
    nickname: null,
    email: null,
    subscribe: values.subscribe,
  });
  const [validMsg, setValidMsg] = useState({
    nickname: "",
    email: "",
  });

  useEffect(() => {
    setValidValues({
      ...validValues,
      subscribe: values.subscribe,
    });
  }, [values.subscribe]);

  const handleValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "subscribe_nickname":
        if (!regNickname.test(value)) {
          setValidValues({
            ...validValues,
            nickname: false,
          });
          setValidMsg({
            ...validMsg,
            nickname: "닉네임은 영어, 한글, 숫자만 사용이 가능합니다.",
          });
        } else {
          setValidValues({
            ...validValues,
            nickname: true,
          });
          setValidMsg({
            ...validMsg,
            nickname: "",
          });
        }
        setValues({
          ...values,
          nickname: value,
        });
        break;
      case "subscribe_email":
        if (!regEmail.test(value)) {
          setValidValues({
            ...validValues,
            email: false,
          });
          setValidMsg({
            ...validMsg,
            email: "이메일 형식이 올바르지 않습니다.",
          });
        } else {
          setValidValues({
            ...validValues,
            email: true,
          });
          setValidMsg({
            ...validMsg,
            email: "",
          });
        }
        setValues({
          ...values,
          email: value,
        });
        break;
    }
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    const isSubmit = Object.values(validValues).every((value) => value);
    setIsSubmitDisabled(!isSubmit);
  }, [values, validValues]);
  console.log(validValues);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!values.subscribe) {
      alert("수신동의에 체크해주세요.");
      return;
    }
    const response: any = await sharedApi.subscribe(values);
    if (response.status !== 201) {
      alert("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    alert("구독 신청이 완료되었습니다!");
    navigate(`/`);
  };

  return (
    <>
      <Helmets title={`니쥬레터 구독`} description=""></Helmets>
      <div className={styles.subscribe_wrap}>
        <div className={styles.description}>
          <h1>NEEDU레터 구독 신청</h1>
          <p className="body1" style={{ marginTop: "10px" }}>
            NEEDU레터는 사회복지 현장의 진짜 이야기를 담은 뉴스레터입니다.
            <br />
            우리 주변의 이야기, 우리가 나아가야 할 이야기를 함께 볼 수 있도록
            큐레이팅해요.
            <br />
            <strong>월 2회, NEEDU레터</strong>와 함께해보세요!
          </p>
        </div>
        <form className={styles.subscribe_form}>
          <div>
            <h4>이름/닉네임</h4>
            <div>
              <Input
                type="text"
                name="subscribe_nickname"
                className={`${
                  validValues.nickname === null
                    ? "input_default"
                    : validValues.nickname
                    ? "input_done"
                    : "input_wrong"
                }`}
                value={values.nickname}
                placeholder="이름/닉네임을 입력해주세요"
                onChange={handleValues}
                readOnly={false}
                required={true}
              />
            </div>
            <div className={`${"body2"} ${styles.checkmsg}`} id="checknmmsg">
              {validMsg.nickname}
            </div>
          </div>
          <div>
            <h4>이메일</h4>
            <div>
              <Input
                type="text"
                name="subscribe_email"
                className={`${
                  validValues.email === null
                    ? "input_default"
                    : validValues.email
                    ? "input_done"
                    : "input_wrong"
                }`}
                value={values.email}
                placeholder="뉴스레터를 구독할 이메일 주소를 입력해주세요"
                onChange={handleValues}
                readOnly={false}
                required={true}
              />
            </div>
            <div className={`${"body2"} ${styles.checkmsg}`} id="checkidmsg">
              {validMsg.email}
            </div>
          </div>
          <div>
            <h4>개인정보 수집 및 이용 동의</h4>
            <div style={{ display: "flex", gap: "8px" }}>
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
                style={{ display: "flex", alignItems: "center" }}
              >
                <img src={ico_arrow} alt="화살표" style={{ height: "16px" }} />
              </a>
            </div>
          </div>
        </form>
        <div className={styles.submit_btn}>
          <Button
            children="신청"
            className={`${
              isSubmitDisabled === false
                ? "btn_condition_true"
                : "btn_condition_false"
            }`}
            isDisabled={isSubmitDisabled}
            onClick={handleSubmit}
          />
        </div>
        {blockMap && (
          <div className={styles.notion_wrap}>
            <NotionRenderer blockMap={blockMap} fullPage={true} />
          </div>
        )}
      </div>
    </>
  );
};

export default Subscribe;
