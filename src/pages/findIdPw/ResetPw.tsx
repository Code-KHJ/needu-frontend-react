import userApi from "@/apis/user";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import { useLoading } from "@/contexts/LoadingContext";
import { regPw } from "@/utils/validation";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Find.module.scss";
import Helmets from "../helmets";

const ResetPw = () => {
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const resetToken = location.split("/")[3];
  const [validToken, setValidToken] = useState<boolean>();

  useEffect(() => {
    const checkToken = async () => {
      const response: any = await userApi.validResetToken(resetToken);
      if (response.status !== 200) {
        navigate("/error");
        return;
      }
      if (!response.data.valid) {
        alert(
          "유효하지 않은 페이지입니다. 비밀번호 찾기를 처음부터 진행해주세요."
        );
        navigate("/");
        return;
      }
      setValidToken(true);
    };
    checkToken();
  }, []);

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
      resetToken: resetToken,
      password: pwValues.password,
    };
    const response = await userApi.resetPassword(userData);
    if (response.status === 404) {
      if (response.data.message === "NOT_FOUND_TOKEN") {
        alert(
          "유효하지 않은 페이지입니다. 비밀번호 찾기를 처음부터 진행해주세요."
        );
        hideLoading();
        navigate("/");
        return;
      }
      if (response.data.message === "NOT_FOUND") {
        alert(
          "유효하지 않은 페이지입니다. 비밀번호 찾기를 처음부터 진행해주세요."
        );
        hideLoading();
        navigate("/");
        return;
      }
    }
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
    <>
      <Helmets
        title={"비밀번호 재설정 I 사회복지 커뮤니티 NEEDU"}
        description=""
      ></Helmets>
      {validToken && (
        <main>
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
        </main>
      )}
    </>
  );
};

export default ResetPw;
