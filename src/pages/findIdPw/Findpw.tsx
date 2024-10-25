import React, { useEffect, useState } from "react";
import styles from "./Find.module.scss";
import Label from "@/components/elements/Label";
import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { regEmail, regPw } from "@/utils/validation";
import userApi from "@/apis/user";
import { useLoading } from "@/contexts/LoadingContext";

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

  //인증번호
  const [authCode, setAuthCode] = useState({
    createdCode: "",
    value: "",
    status: "none",
  });

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
    console.log(response);
    // const userData = await userApi.findUser("user_id", values);
    // if (userData.data.length !== 1) {
    //   alert("아이디가 존재하지 않습니다. 다시 확인해주세요.");
    //   hideLoading();
    //   return;
    // }

    // //인증메일 발송 api
    // const response = await userApi.verifyEmail(values);
    // if (response.data.status !== "completed") {
    //   alert("에러발생 다시 시도해주세요.");
    //   hideLoading();
    //   return;
    // }
    // setAuthCode({
    //   ...authCode,
    //   status: "req",
    //   createdCode: response.data.authNum,
    // });
    // alert("인증번호가 전송되었습니다. 잠시만 기다려주세요.");
    hideLoading();
  };

  const handleAuth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode({
      ...authCode,
      value: e.target.value,
    });
  };

  const confirmAuthCode = async () => {
    if (authCode.createdCode !== authCode.value) {
      alert(
        "인증번호가 틀렸습니다. 재발송을 원하시면 인증요청 버튼을 다시 클릭해주세요."
      );
      return;
    }
    setAuthCode({
      ...authCode,
      status: "done",
    });
    alert("인증되었습니다. 비밀번호를 재설정해주세요.");
  };

  const [pwValues, setPwValues] = useState({
    password: "",
    password2: "",
  });
  type PwValidValues = {
    password: boolean | null;
    password2: boolean | null;
  };
  const [pwValidValues, setPwValidValues] = useState<PwValidValues>({
    password: null,
    password2: null,
  });
  const [pwValidMsg, setPwValidMsg] = useState({
    password: "",
    password2: "",
  });

  const handleChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPwValues({
      ...pwValues,
      [name]: value,
    });

    switch (name) {
      case "password":
        if (!regPw.test(value)) {
          setPwValidMsg({
            ...pwValidMsg,
            password:
              "비밀번호는 영문, 숫자, 특수문자만 사용가능하며, 반드시 영문, 숫자 조합이 필요합니다.",
          });
          setPwValidValues({
            ...pwValidValues,
            password: false,
            password2: false,
          });
          break;
        }
        if (value !== pwValues.password2) {
          setPwValidValues({
            ...pwValidValues,
            password: true,
            password2: false,
          });
        } else {
          setPwValidValues({
            ...pwValidValues,
            password: true,
            password2: true,
          });
        }
        setPwValidMsg({
          ...pwValidMsg,
          password: "",
          password2: "",
        });
        break;
      case "password2":
        if (value !== pwValues.password) {
          setPwValidMsg({
            ...pwValidMsg,
            password2: "비밀번호가 일치하지 않습니다.",
          });
          setPwValidValues({
            ...pwValidValues,
            password2: false,
          });
          break;
        }
        setPwValidMsg({
          ...pwValidMsg,
          password2: "",
        });
        setPwValidValues({
          ...pwValidValues,
          password2: true,
        });
        break;
    }
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    const isSubmit = Object.values(pwValidValues).every((value) => value);
    setIsSubmitDisabled(!isSubmit);
  }, [pwValidValues]);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showLoading();
    const userData = {
      id: values,
      field: "password",
      value: pwValues.password,
    };
    const response = await userApi.updatePw(userData);
    if (response.status == 200) {
      alert("비밀번호가 변경되었습니다. 로그인을 해주세요.");
      hideLoading();
      window.location.href = "/login";
    } else {
      alert("비밀번호 변경이 실패했습니다. 잠시 후 다시 시도해주세요.");
      hideLoading();
    }
  };

  return (
    <main>
      {authCode.status !== "done" ? (
        <div className={`wrap ${styles.wrap}`}>
          <div className={styles.explanation}>
            <h4>비밀번호 찾기</h4>
            <br />
            <p className="body2">
              아이디(Email)로 발송된 인증번호를 확인해주세요.
            </p>
          </div>
          <form className={styles.search_form}>
            <div>
              <Label title="아이디" target="id" required={false} />
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
                children="인증요청"
                className={`${
                  validValues ? "btn_condition_true" : "btn_condition_false"
                }`}
                isDisabled={validValues ? false : true}
                onClick={reqAuthEmail}
              />
            </div>
            <div className={`${authCode.status === "none" ? styles.none : ""}`}>
              <Label title="인증번호" target="" required={false} />
              <Input
                name="authNum"
                className={`${
                  authCode.status === "done" ? "input_done" : "input_default"
                }`}
                value={authCode.value}
                onChange={handleAuth}
                readOnly={false}
                placeholder="인증번호를 입력해주세요."
                required
              />
              <div className={styles.info}>
                <span className="body2">인증번호가 오지 않는다면?</span>
                <i></i>
                <span></span>
              </div>
              <Button
                children="확인"
                className={`${
                  validValues ? "btn_condition_true" : "btn_condition_false"
                }`}
                isDisabled={validValues ? false : true}
                onClick={confirmAuthCode}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className={`wrap ${styles.wrap}`}>
          <div className={styles.explanation}>
            <h4>비밀번호 재설정</h4>
            <br />
            <p className="body2">비밀번호를 다시 설정해주세요.</p>
          </div>
          <form className={styles.search_form}>
            <div>
              <Label title="비밀번호" target="password" required={false} />
              <div>
                <Input
                  name="password"
                  className={`${
                    pwValidValues.password === null
                      ? "input_default"
                      : pwValidValues.password
                      ? "input_done"
                      : "input_wrong"
                  }`}
                  value={pwValues.password}
                  onChange={handleChangePw}
                  readOnly={false}
                  placeholder=""
                  required
                />
                <div className={`${"body2"} ${styles.checkmsg}`}>
                  {pwValidMsg.password}
                </div>
              </div>
            </div>
            <div>
              <Label
                title="비밀번호 확인"
                target="password2"
                required={false}
              />
              <div>
                <Input
                  name="password2"
                  className={`${
                    pwValidValues.password2 === null
                      ? "input_default"
                      : pwValidValues.password2
                      ? "input_done"
                      : "input_wrong"
                  }`}
                  value={pwValues.password2}
                  onChange={handleChangePw}
                  readOnly={false}
                  placeholder=""
                  required
                />
                <div className={`${"body2"} ${styles.checkmsg}`}>
                  {pwValidMsg.password2}
                </div>
              </div>
            </div>
            <Button
              children="수정"
              style={{ marginTop: "80px" }}
              className={`${
                isSubmitDisabled === false
                  ? "btn_condition_true"
                  : "btn_condition_false"
              }`}
              isDisabled={isSubmitDisabled}
              onClick={handleSubmit}
            />
          </form>
        </div>
      )}
    </main>
  );
};

export default Findpw;
