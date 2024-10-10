import userApi from "@/apis/user";
import styles from "./Mypage.module.scss";
import ico_kakao from "@/assets/images/ico_kakao.png";
import ico_google from "@/assets/images/social_google.png";
import ico_help from "@/assets/images/ico_help.png";
import Input from "@/components/elements/Input";
import Label from "@/components/elements/Label";
import { regNickname, regPhone, regPw } from "@/utils/validation";
import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { useLoading } from "@/contexts/LoadingContext";
import { UserProfile } from "@/interface/User";

interface InfoProps {
  userInfo: UserProfile;
  setUserInfo: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const Info: React.FC<InfoProps> = ({ userInfo, setUserInfo }) => {
  const { showLoading, hideLoading, isLoading } = useLoading();

  // 유저 정보 수정
  const [subNav, setSubNav] = useState("basic");
  const [basicInfo, setBasicInfo] = useState({
    userId: "",
    nickname: "",
    phonenumber: "",
  });
  type ValidBasicInfo = {
    phonenumber: boolean | null;
    nickname: boolean | null;
  };
  const [validBasicInfo, setValidBasicInfo] = useState<ValidBasicInfo>({
    nickname: null,
    phonenumber: null,
  });
  const handleBasicInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasicInfo({
      ...basicInfo,
      [name]: value,
    });
    switch (name) {
      case "phonenumber":
        if (!regPhone.test(value)) {
          setValidBasicInfo({
            ...validBasicInfo,
            [name]: false,
          });
          setValidMsg({
            ...validMsg,
            [name]: "연락처 형식이 올바르지 않습니다.",
          });
          break;
        }
        setValidBasicInfo({
          ...validBasicInfo,
          [name]: true,
        });
        setValidMsg({
          ...validMsg,
          [name]: "",
        });
        break;
      case "nickname": {
        //닉네임 유효성검사
        if (!regNickname.test(value)) {
          setValidBasicInfo({
            ...validBasicInfo,
            [name]: false,
          });
          setValidMsg({
            ...validMsg,
            [name]: "닉네임은 영어, 한글, 숫자만 사용이 가능합니다.",
          });
          break;
        }
        if (value !== userInfo.nickname) {
          debounceNick(e);
        }
        break;
      }
      default:
        break;
    }
  };
  const debounceNick = useCallback(
    _.debounce(async (e) => {
      const { name, value } = e.target;
      const isDuplic = await userApi.duplic(name, value);
      setValidBasicInfo((prevValidValues) => {
        //중복
        if (!isDuplic) {
          setValidMsg({
            ...validMsg,
            [name]: "이미 사용중인 닉네임입니다.",
          });
          return {
            ...prevValidValues,
            [name]: false,
          };
        }
        setValidMsg({
          ...validMsg,
          [name]: "",
        });
        return {
          ...prevValidValues,
          [name]: true,
        };
      });
    }, 300),
    []
  );
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    newPassword2: "",
  });
  type ValidPassword = {
    password: boolean | null;
    newPassword: boolean | null;
    newPassword2: boolean | null;
  };
  const [validPassword, setValidPassword] = useState<ValidPassword>({
    password: null,
    newPassword: null,
    newPassword2: null,
  });
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
    switch (name) {
      case "password":
        if (!regPw.test(value)) {
          setValidPassword({
            ...validPassword,
            [name]: false,
          });
          setValidMsg({
            ...validMsg,
            [name]:
              "비밀번호는 영문, 숫자, 특수문자만 사용가능하며, 반드시 영문, 숫자 조합이 필요합니다.",
          });
          break;
        } else {
          setValidPassword({
            ...validPassword,
            [name]: true,
          });
        }
        setValidMsg({
          ...validMsg,
          [name]: "",
        });

        break;
      case "newPassword":
        if (!regPw.test(value)) {
          setValidPassword({
            ...validPassword,
            [name]: false,
            newPassword2: false,
          });
          setValidMsg({
            ...validMsg,
            [name]:
              "비밀번호는 영문, 숫자, 특수문자만 사용가능하며, 반드시 영문, 숫자 조합이 필요합니다.",
          });
          break;
        }
        if (password.newPassword2 !== value) {
          setValidPassword({
            ...validPassword,
            [name]: true,
            newPassword2: false,
          });
        } else {
          setValidPassword({
            ...validPassword,
            [name]: true,
            newPassword2: true,
          });
        }
        setValidMsg({
          ...validMsg,
          [name]: "",
          newPassword2: "",
        });
        break;
      case "newPassword2":
        if (value !== password.newPassword) {
          setValidPassword({
            ...validPassword,
            [name]: false,
          });
          setValidMsg({
            ...validMsg,
            [name]: "비밀번호가 일치하지 않습니다.",
          });
          break;
        }
        setValidPassword({
          ...validPassword,
          [name]: true,
        });
        setValidMsg({
          ...validMsg,
          [name]: "",
        });
        break;
      default:
        break;
    }
  };
  const [validMsg, setValidMsg] = useState({
    password: "",
    newPassword: "",
    newPassword2: "",
    phonenumber: "",
    nickname: "",
  });
  useEffect(() => {
    showLoading();
    setBasicInfo({
      userId: userInfo.user_id || "",
      nickname: userInfo.nickname || "",
      phonenumber: userInfo.phonenumber || "",
    });
    setValidBasicInfo({
      nickname: userInfo.nickname ? true : null,
      phonenumber: userInfo.phonenumber ? true : null,
    });
    setValidMsg({
      password: "",
      newPassword: "",
      newPassword2: "",
      phonenumber: "",
      nickname: "",
    });
    setPassword({
      password: "",
      newPassword: "",
      newPassword2: "",
    });
    setValidPassword({
      password: null,
      newPassword: null,
      newPassword2: null,
    });
    hideLoading();
  }, [userInfo]);
  const updateInfo = async () => {
    if (subNav === "basic") {
      if (
        basicInfo.nickname === userInfo.nickname &&
        basicInfo.phonenumber === userInfo.phonenumber
      ) {
        alert("변경된 정보가 없습니다.");
        return;
      }
      const isSubmit = Object.values(validBasicInfo).every((value) => value);
      if (!isSubmit) {
        alert("정보를 올바르게 입력해주세요.");
        return;
      }

      showLoading();
      const userData = {
        nickname: basicInfo.nickname,
        phonenumber: basicInfo.phonenumber,
      };
      const response: any = await userApi.updateUserInfo(userData);
      if (response.status !== 200) {
        alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        hideLoading();
        return;
      }
      setUserInfo(response.data);
      alert("정보가 변경되었습니다.");
      hideLoading();
    }
    if (subNav === "password") {
      console.log(validPassword);
      const isSubmit = Object.values(validPassword).every((value) => value);
      if (!isSubmit) {
        alert("정보를 올바르게 입력해주세요.");
        return;
      }

      showLoading();
      const userData = {
        password: password.password,
        newPassword: password.newPassword,
      };
      const response: any = await userApi.updateUserPassword(userData);
      if (response.status === 401) {
        alert("잘못된 비밀번호입니다.");
        hideLoading();
        return;
      }
      if (response.status !== 200) {
        alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        hideLoading();
        return;
      }
      setUserInfo(response.data);
      alert("정보가 변경되었습니다.");
      hideLoading();
    }
  };

  // 경력 수정
  const [careerTooltip, setCareerTooltip] = useState(false);
  type CareerDetail = {
    status: boolean;
    id: number;
    corpname: string;
    start_date: string;
    end_date: string;
    career_type: string;
  };
  const [editCareer, setEditCareer] = useState<CareerDetail[]>([]);
  return (
    <div className={styles.info_wrap}>
      <div className={styles.user_info_wrap}>
        <div className={styles.sub_nav}>
          <div
            className={subNav === "basic" ? styles.current : ""}
            onClick={() => setSubNav("basic")}
          >
            기본정보
          </div>
          <div
            className={subNav === "password" ? styles.current : ""}
            onClick={() => setSubNav("password")}
          >
            비밀번호 변경
          </div>
        </div>
        <div className={styles.content}>
          {subNav === "basic" && (
            <div className={styles.basic_info}>
              <div className={styles.item}>
                <Label title="이메일" target="user_id" required={false} />
                <Input
                  name="user_id"
                  className={"input_default"}
                  value={basicInfo.userId}
                  placeholder=""
                  onChange={() => {}}
                  readOnly={true}
                  required
                />
                <div className={styles.social_ico}>
                  {userInfo.kakao && <img src={ico_kakao} />}
                  {userInfo.google && <img src={ico_google} />}
                </div>
              </div>
              <div className={styles.item}>
                <Label title="닉네임" target="nickname" required={false} />
                <div>
                  <Input
                    name="nickname"
                    className={`${
                      validBasicInfo.nickname === null
                        ? "input_default"
                        : validBasicInfo.nickname
                        ? "input_done"
                        : "input_wrong"
                    }`}
                    value={basicInfo.nickname}
                    onChange={handleBasicInfo}
                    readOnly={false}
                    placeholder=""
                    required
                  />
                  <div
                    className={`${"body2"} ${styles.checkmsg}`}
                    id="checknmmsg"
                  >
                    {validMsg.nickname}
                  </div>
                </div>
              </div>
              <div className={styles.item}>
                <Label
                  title="휴대폰번호"
                  target="phonenumber"
                  required={false}
                />
                <div>
                  <Input
                    name="phone"
                    className={`${
                      validBasicInfo.phonenumber === null
                        ? "input_default"
                        : validBasicInfo.phonenumber
                        ? "input_done"
                        : "input_wrong"
                    }`}
                    value={basicInfo.phonenumber}
                    onChange={handleBasicInfo}
                    readOnly={false}
                    placeholder=""
                    required
                  />
                  <div className={`${"body2"} ${styles.checkmsg}`}>
                    {validMsg.phonenumber}
                  </div>
                </div>
              </div>
            </div>
          )}
          {subNav === "password" && (
            <div className={styles.password}>
              <div className={styles.item}>
                <Label
                  title="현재 비밀번호"
                  target="password"
                  required={true}
                />
                <div>
                  <Input
                    name="password"
                    className={`${
                      validPassword.password === null
                        ? "input_default"
                        : validPassword.password
                        ? "input_done"
                        : "input_wrong"
                    }`}
                    value={password.password}
                    onChange={handlePassword}
                    readOnly={false}
                    placeholder="현재 비밀번호를 입력해주세요"
                    required
                  />
                  <div className={`${"body2"} ${styles.checkmsg}`}>
                    {validMsg.password}
                  </div>
                </div>
              </div>
              <div className={styles.item}>
                <Label
                  title="변경 비밀번호"
                  target="newPassword"
                  required={true}
                />
                <div>
                  <Input
                    type="password"
                    name="newPassword"
                    className={`${
                      validPassword.newPassword === null
                        ? "input_default"
                        : validPassword.newPassword
                        ? "input_done"
                        : "input_wrong"
                    }`}
                    value={password.newPassword}
                    onChange={handlePassword}
                    readOnly={false}
                    placeholder="8~16자 영문 대소문자, 숫자, 특수문자"
                    required
                  />
                  <div
                    className={`${"body2"} ${styles.checkmsg}`}
                    id="checkpw2msg"
                  >
                    {validMsg.newPassword}
                  </div>
                </div>
              </div>
              <div className={styles.item}>
                <Label
                  title="비밀번호 확인"
                  target="newPassword2"
                  required={true}
                />
                <div>
                  <Input
                    type="password"
                    name="newPassword2"
                    className={`${
                      validPassword.newPassword2 === null
                        ? "input_default"
                        : validPassword.newPassword2
                        ? "input_done"
                        : "input_wrong"
                    }`}
                    value={password.newPassword2}
                    onChange={handlePassword}
                    readOnly={false}
                    placeholder="비밀번호를 다시 한번 입력해주세요"
                    required
                  />
                  <div
                    className={`${"body2"} ${styles.checkmsg}`}
                    id="checkpw2msg"
                  >
                    {validMsg.newPassword2}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.btn}>
          <button type="button" onClick={updateInfo}>
            수정
          </button>
        </div>
      </div>
      <div className={styles.career_info_wrap}>
        <div className={styles.total_career}>
          <div className={styles.title}>
            <span>경력사항</span>
            <img
              src={ico_help}
              alt="help"
              style={{ width: "15px", height: "15px" }}
              onMouseEnter={() => setCareerTooltip(true)}
              onMouseLeave={() => setCareerTooltip(false)}
            />
            {careerTooltip && (
              <div className={`caption ${styles.tooltip}`}>
                본 페이지에서는 수정만 가능합니다.
                <br />
                경력을 추가하려면 리뷰를 남겨주세요.
              </div>
            )}
          </div>
          <div className={styles.career}>
            총 <h4>2</h4>년 <h4>10</h4>개월
          </div>
        </div>
        <div className={styles.career_list}>
          <div className={styles.career_detail}>
            <div className={styles.item}>
              <label className="body2">기관명</label>
              <input
                type="text"
                value="서을시사회복지사협회"
                disabled
                readOnly
              />
            </div>
            <div className={styles.item}>
              <label className="body2">근무기간</label>
              <input
                type="text"
                value="서을시사회복지사협회"
                disabled
                readOnly
              />
            </div>
            <div className={styles.item}>
              <label className="body2">근무직종</label>
              <select
                name="career_type"
                // className={`${
                //   valid.career_type
                //     ? styles.valid
                //     : values.career_type == ""
                //     ? ""
                //     : styles.invalid
                // }`}
                // value={values.career_type}
                // onChange={handleChange}
              >
                <option value="" disabled hidden>
                  직종 선택
                </option>
                {/* {shared.careerType.map((item) => (
                  <option key={item.id} value={item.type}>
                    {item.type}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
          <div className={styles.career_detail}>경력1</div>
          <div className={styles.career_detail}>경력1</div>
          <div className={styles.career_detail}>경력1</div>
        </div>
      </div>
    </div>
  );
};

export default Info;
