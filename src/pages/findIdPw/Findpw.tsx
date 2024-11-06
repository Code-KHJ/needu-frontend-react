import userApi from "@/apis/user";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import { useLoading } from "@/contexts/LoadingContext";
import { regEmail } from "@/utils/validation";
import React, { useState } from "react";
import styles from "./Find.module.scss";
import Helmets from "../helmets";

const Findpw = () => {
  const { showLoading, hideLoading } = useLoading();
  const [values, setValues] = useState("");
  const [validValues, setValidValues] = useState<boolean | null>(null);
  const [validMsg, setValidMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues(value);

    if (!regEmail.test(value)) {
      setValidMsg("이메일 형식이 올바르지 않습니다.");
      setValidValues(false);
    } else {
      setValidMsg("");
      setValidValues(true);
    }
  };

  const reqAuthEmail = async () => {
    //id 유효한지 확인
    showLoading();
    const data = { email: values };
    const response: any = await userApi.reqResetPassword(data);
    if (response.status === 404) {
      alert("존재하지 않는 회원입니다. 아이디를 다시 확인해주세요.");
      hideLoading();
      return;
    }
    if (response.status !== 201) {
      alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      hideLoading();
      return;
    }
    hideLoading();
  };

  return (
    <>
      <Helmets
        title={"비밀번호 재설정 I 사회복지 커뮤니티 NEEDU"}
        description=""
      ></Helmets>
      <main>
        <div className={`wrap ${styles.wrap}`}>
          <div className={styles.explanation}>
            <h4>비밀번호 재설정</h4>
            <br />
            <p className="body2">
              비밀번호를 재설정하실 아이디(이메일)을 입력해주세요.
              <br />
              작성하신 이메일로 비밀번호 재설정 링크가 발송됩니다.
            </p>
          </div>
          <form className={styles.search_form}>
            <div>
              <Label title="아이디(이메일)" target="id" required={false} />
              <div className={styles.input_box}>
                <Input
                  name="id"
                  className={`${
                    validValues === null
                      ? "input_default"
                      : validValues
                      ? "input_done"
                      : "input_wrong"
                  }`}
                  value={values}
                  onChange={handleChange}
                  readOnly={false}
                  placeholder=""
                  required
                />
                <div className={`${"body2"} ${styles.checkmsg}`}>
                  {validMsg}
                </div>
              </div>
              <Button
                children="확인"
                className={`${
                  validValues ? "btn_condition_true" : "btn_condition_false"
                }`}
                isDisabled={validValues ? false : true}
                onClick={reqAuthEmail}
              />
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Findpw;
