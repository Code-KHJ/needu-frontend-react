import React, { useCallback, useEffect, useState } from 'react';
import styles from './Signup.module.scss';
import { regEmail, regNickname, regPhone, regPw } from '@/utils/validation';
import userApi from '@/apis/user';
import _ from 'lodash';
import { SingupDto } from '@/interface/User';
import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';

const Signup = () => {
  //유효성 검사
  const [values, setValues] = useState<SingupDto>({
    id: '',
    password: '',
    password2: '',
    phonenumber: '',
    nickname: '',
    policy: false,
    personal_info: false,
    marketing_email: false,
    marketing_SMS: false,
    info_period: '탈퇴시',
  });

  type ValidValues = {
    id: boolean | null;
    idAuth: boolean | null;
    password: boolean | null;
    password2: boolean | null;
    phonenumber: boolean | null;
    nickname: boolean | null;
    policy: boolean | null;
    personal_info: boolean | null;
  };
  const [validValues, setValidValues] = useState<ValidValues>({
    id: null,
    idAuth: null,
    password: null,
    password2: null,
    phonenumber: null,
    nickname: null,
    policy: null,
    personal_info: null,
  });

  const [validMsg, setValidMsg] = useState({
    id: '',
    password: '',
    password2: '',
    phonenumber: '',
    nickname: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setValues({
      ...values,
      [name]: inputValue,
    });

    switch (name) {
      case 'id': {
        //이메일 유효성검사
        if (!regEmail.test(value)) {
          setValidValues({
            ...validValues,
            [name]: false,
          });
          setValidMsg({
            ...validMsg,
            [name]: '이메일 형식이 올바르지 않습니다.',
          });
          setAuthBtn({
            ...authBtn,
            req: false,
          });
          break;
        } else {
          setValidMsg({
            ...validMsg,
            [name]: '',
          });

          debounceId(e);
          break;
        }
      }
      case 'password':
        if (!regPw.test(value)) {
          setValidValues({
            ...validValues,
            [name]: false,
            password2: false,
          });
          setValidMsg({
            ...validMsg,
            [name]:
              '비밀번호는 영문, 숫자, 특수문자만 사용가능하며, 반드시 영문, 숫자 조합이 필요합니다.',
          });
          break;
        }
        if (values.password2 !== value) {
          setValidValues({
            ...validValues,
            [name]: true,
            password2: false,
          });
        } else {
          setValidValues({
            ...validValues,
            [name]: true,
            password2: true,
          });
        }
        setValidMsg({
          ...validMsg,
          [name]: '',
        });

        break;
      case 'password2':
        if (value !== values.password) {
          setValidValues({
            ...validValues,
            [name]: false,
          });
          setValidMsg({
            ...validMsg,
            [name]: '비밀번호가 일치하지 않습니다.',
          });
          break;
        }
        setValidValues({
          ...validValues,
          [name]: true,
        });
        setValidMsg({
          ...validMsg,
          [name]: '',
        });
        break;
      case 'phonenumber':
        if (!regPhone.test(value)) {
          setValidValues({
            ...validValues,
            [name]: false,
          });
          setValidMsg({
            ...validMsg,
            [name]: '연락처 형식이 올바르지 않습니다.',
          });
          break;
        }
        setValidValues({
          ...validValues,
          [name]: true,
        });
        setValidMsg({
          ...validMsg,
          [name]: '',
        });
        break;
      case 'nickname': {
        //닉네임 유효성검사
        if (!regNickname.test(value)) {
          setValidValues({
            ...validValues,
            [name]: false,
          });
          setValidMsg({
            ...validMsg,
            [name]: '닉네임은 영어, 한글, 숫자만 사용이 가능합니다.',
          });
          break;
        }
        debounceNick(e);
        break;
      }
      case 'policy':
        setValidValues({
          ...validValues,
          [name]: checked,
        });
        break;
      case 'personal_info':
        setValidValues({
          ...validValues,
          [name]: checked,
        });
        break;
      default:
        break;
    }
  };

  //유저 정보 중복 검사
  const debounceId = useCallback(
    _.debounce(async (e) => {
      const { name, value } = e.target;
      const isDuplic = await userApi.duplic(name, value);
      setValidValues((prevValidValues) => {
        //중복
        if (!isDuplic) {
          setValidMsg({
            ...validMsg,
            [name]: '이미 사용중인 이메일입니다.',
          });
          setAuthBtn({
            ...authBtn,
            req: false,
          });
          return {
            ...prevValidValues,
            [name]: false,
          };
          //중복
        }
        setValidMsg({
          ...validMsg,
          [name]: '',
        });
        setAuthBtn({
          ...authBtn,
          req: true,
        });

        return {
          ...prevValidValues,
          [name]: true,
        };
      });
    }, 300),
    []
  );
  const debounceNick = useCallback(
    _.debounce(async (e) => {
      const { name, value } = e.target;
      const isDuplic = await userApi.duplic(name, value);
      setValidValues((prevValidValues) => {
        //중복
        if (!isDuplic) {
          setValidMsg({
            ...validMsg,
            [name]: '이미 사용중인 닉네임입니다.',
          });
          return {
            ...prevValidValues,
            [name]: false,
          };
        }
        setValidMsg({
          ...validMsg,
          [name]: '',
        });
        return {
          ...prevValidValues,
          [name]: true,
        };
      });
    }, 300),
    []
  );

  ///////////인증번호 요청///////////////
  const [createdAuthCode, setCreatedAuthCode] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [authBtn, setAuthBtn] = useState({
    req: false,
    confirm: false,
    confirmText: '',
  });

  const reqAuthMail = async () => {
    setAuthBtn({
      ...authBtn,
      confirmText: '확인',
    });
    ///////////인증메일 발송 api
    const response = await userApi.verifyEmail(values.id);
    if (response.data.status !== 'completed') {
      alert('에러발생 다시 시도해주세요.');
      return;
    }
    console.log(response.data.authNum);
    setCreatedAuthCode(response.data.authNum);
    alert('인증번호가 전송되었습니다. 이메일을 확인해주세요.');
  };
  const handleAuth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);
    setAuthBtn({
      ...authBtn,
      confirm: true,
    });
  };
  const confirmAuthCode = () => {
    if (createdAuthCode !== authCode) {
      alert(
        '인증번호가 틀렸습니다. 재발송을 원하시면 인증요청 버튼을 다시 클릭해주세요.'
      );
      return;
    }
    alert('이메일이 인증되었습니다.');
    setAuthBtn({
      req: false,
      confirm: false,
      confirmText: '인증완료',
    });
    setValidValues({
      ...validValues,
      idAuth: true,
    });
  };

  //체크박스 일괄 체크
  const [checkAll, setCheckAll] = useState(false);
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckAll(checked);
    setValues({
      ...values,
      policy: checked,
      personal_info: checked,
      marketing_email: checked,
      marketing_SMS: checked,
    });
    setValidValues({
      ...validValues,
      policy: checked,
      personal_info: checked,
    });
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    const isSubmit = Object.values(validValues).every((value) => value);
    setIsSubmitDisabled(!isSubmit);
  }, [values, validValues]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await userApi.signup(values);
    console.log(response);
  };

  return (
    <>
      <div className={styles.signup_wrap}>
        {/* <!-- 회원가입 입력폼 --> <!-- name 부분은 DB 필드이름하고 매치--> */}
        <div className={styles.signup}>
          <form name="frm" id="frm" onSubmit={handleSubmit}>
            <div className={styles.write_wrap}>
              {/* <!-- 아이디 --> */}
              <div className={styles.item}>
                <Label title="이메일(ID)" target="id" required={true} />
                <div>
                  <Input
                    name="id"
                    className={`${
                      validValues.id === null
                        ? 'input_default'
                        : validValues.id
                        ? 'input_done'
                        : 'input_wrong'
                    }`}
                    value={values.id}
                    placeholder=""
                    onChange={handleChange}
                    readOnly={authBtn.confirmText == '인증완료'}
                    required
                  />
                  <button
                    type="button"
                    className={styles.req_btn}
                    disabled={!authBtn.req}
                    onClick={reqAuthMail}
                  >
                    인증요청
                  </button>
                </div>
                <div className={styles.checkmsg} id="checkidmsg">
                  {validMsg.id}
                </div>
              </div>
              <div
                className={`${styles.item} ${
                  authBtn.confirmText.length > 0 ? '' : styles.checkEmail
                }`}
              >
                <div>
                  <Input
                    name="authNum"
                    className={`${
                      authBtn.confirmText == '인증완료'
                        ? 'input_done'
                        : 'input_default'
                    }`}
                    placeholder="인증번호를 입력해주세요."
                    onChange={handleAuth}
                    value={authCode}
                    readOnly={authBtn.confirmText == '인증완료'}
                    required
                  />
                  <button
                    type="button"
                    className={styles.confirm_btn}
                    disabled={!authBtn.confirm}
                    onClick={confirmAuthCode}
                  >
                    {authBtn.confirmText}
                  </button>
                </div>
              </div>
              {/* <!-- 비밀번호 --> */}
              <div className={styles.item}>
                <Label title="비밀번호" target="password" required={true} />
                <Input
                  name="password"
                  className={`${
                    validValues.password === null
                      ? 'input_default'
                      : validValues.password
                      ? 'input_done'
                      : 'input_wrong'
                  }`}
                  value={values.password}
                  onChange={handleChange}
                  readOnly={false}
                  placeholder=""
                  required
                />
                <div className={styles.checkmsg}>{validMsg.password}</div>
              </div>
              {/* <!-- 비밀번호 확인 --> */}
              <div className={styles.item}>
                <Label
                  title="비밀번호 확인"
                  target="password2"
                  required={true}
                />
                <Input
                  name="password2"
                  className={`${
                    validValues.password2 === null
                      ? 'input_default'
                      : validValues.password2
                      ? 'input_done'
                      : 'input_wrong'
                  }`}
                  value={values.password2}
                  onChange={handleChange}
                  readOnly={false}
                  placeholder=""
                  required
                />
                <div className={styles.checkmsg} id="checkpw2msg">
                  {validMsg.password2}
                </div>
              </div>
              {/* <!-- 휴대폰 번호 --> */}
              <div className={styles.item}>
                <Label
                  title="휴대폰번호"
                  target="phonenumber"
                  required={true}
                />
                <Input
                  name="phone"
                  className={`${
                    validValues.phonenumber === null
                      ? 'input_default'
                      : validValues.phonenumber
                      ? 'input_done'
                      : 'input_wrong'
                  }`}
                  value={values.phonenumber}
                  onChange={handleChange}
                  readOnly={false}
                  placeholder=""
                  required
                />
                <div className={styles.checkmsg}>{validMsg.phonenumber}</div>
              </div>
              {/* <!-- 닉네임 --> */}
              <div className={styles.item}>
                <Label title="닉네임" target="nickname" required={true} />
                <Input
                  name="nickname"
                  className={`${
                    validValues.nickname === null
                      ? 'input_default'
                      : validValues.nickname
                      ? 'input_done'
                      : 'input_wrong'
                  }`}
                  value={values.nickname}
                  onChange={handleChange}
                  readOnly={false}
                  placeholder=""
                  required
                />
                <div className={styles.checkmsg} id="checknmmsg">
                  {validMsg.nickname}
                </div>
              </div>
            </div>
            <div className={styles.join_agree}>
              <div className={styles.join_input_all}>
                <input
                  type="checkbox"
                  id="check_1"
                  onChange={handleCheckAll}
                  checked={checkAll}
                />
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
                    checked={values.info_period === '탈퇴시'}
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
                    checked={values.info_period === '3년'}
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
                    checked={values.info_period === '1년'}
                  />
                  <label htmlFor="input_radio3">1년</label>
                </li>
              </ul>
            </div>
            <div className={styles.btn_signup}>
              <button type="submit" id="btnSubmit" disabled={isSubmitDisabled}>
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