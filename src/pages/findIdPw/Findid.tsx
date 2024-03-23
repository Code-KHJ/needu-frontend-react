import React, { useState } from 'react';
import styles from './Find.module.scss';
import Label from '@/components/elements/Label';
import Input from '@/components/elements/Input';
import { regPhone } from '@/utils/validation';
import Button from '@/components/elements/Button';
import userApi from '@/apis/user';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '@/components/IcoSocialLogin';

const Findid = () => {
  const [values, setValues] = useState('');
  const [validValues, setValidValues] = useState<boolean | null>(null);
  const [validMsg, setValidMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues(value);

    if (!regPhone.test(value)) {
      setValidMsg('연락처 형식이 올바르지 않습니다.');
      setValidValues(false);
    } else {
      setValidMsg('');
      setValidValues(true);
    }
  };

  //인증번호
  const [authCode, setAuthCode] = useState({
    createdCode: '',
    value: '',
    status: 'none',
  });

  const [reqPhone, setReqPhone] = useState('');
  const reqAuthSMS = async () => {
    //인증문자 발송 api
    const response = await userApi.verifyPhone(values);
    if (response.data.status !== 'completed') {
      alert('에러발생 다시 시도해주세요.');
      return;
    }
    setAuthCode({
      ...authCode,
      status: 'req',
      createdCode: response.data.authNum,
    });
    setReqPhone(values);
    alert('인증번호가 전송되었습니다.');
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
        '인증번호가 틀렸습니다. 재발송을 원하시면 인증요청 버튼을 다시 클릭해주세요.'
      );
      return;
    }
    const response = await userApi.findId(reqPhone);
    if (response.status !== 201) {
      alert('에러발생 다시 시도해주세요.');
      return;
    }
    setResult({
      view: true,
      userData: response.data,
    });

    alert('이메일이 인증되었습니다.');
  };

  const [result, setResult] = useState({
    view: false,
    userData: [],
  });

  const navigate = useNavigate();
  const moveSignup = () => {
    navigate('/signup');
  };
  const moveFindpw = () => {
    navigate('/find/pw');
  };
  const moveLogin = () => {
    navigate('/login');
  };

  return (
    <main>
      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.explanation}>
          <h1 className="title">아이디 찾기</h1>
          <p>회원 정보에 등록된 휴대전화번호로 인증</p>
          <br />
          <p className="subtxt">
            회원정보에 등록한 휴대전화번호와 입력한 휴대전화번호가 일치하여야
            인증번호를 받을 수 있습니다.
          </p>
        </div>
        <form className={styles.search_form}>
          <div>
            <Label title="휴대전화번호" target="phonenumber" required={false} />
            <Input
              name="phone"
              className={`${
                validValues === null
                  ? 'input_default'
                  : validValues
                  ? 'input_done'
                  : 'input_wrong'
              }`}
              value={values}
              onChange={handleChange}
              readOnly={false}
              placeholder=""
              required
            />
            <div className={`${'subtxt'} ${styles.checkmsg}`}>{validMsg}</div>
            <Button
              children="인증요청"
              className={`${
                validValues ? 'btn_condition_true' : 'btn_condition_false'
              }`}
              isDisabled={validValues ? false : true}
              onClick={reqAuthSMS}
            />
          </div>
          <div className={`${authCode.status === 'none' ? styles.none : ''}`}>
            <Label title="인증번호" target="" required={false} />
            <Input
              name="authNum"
              className={`${
                authCode.status === 'done' ? 'input_done' : 'input_default'
              }`}
              value={authCode.value}
              onChange={handleAuth}
              readOnly={false}
              placeholder="인증번호를 입력해주세요."
              required
            />
            <div className={styles.info}>
              <span className="subtxt">인증번호가 오지 않는다면?</span>
              <i></i>
              <span></span>
            </div>
            <Button
              children="확인"
              className={`${
                validValues ? 'btn_condition_true' : 'btn_condition_false'
              }`}
              isDisabled={validValues ? false : true}
              onClick={confirmAuthCode}
            />
          </div>
        </form>
        <div className={`${styles.result} ${result.view ? '' : styles.none}`}>
          {result.userData.length === 0 ? (
            <div>
              <p>고객님의 정보와 일치하는 아이디가 없습니다.</p>
              <br />
              <br />
              <p>
                사회복지 커리어 관리
                <br />
                NEEDU와 함께 지금부터 시작하세요!
              </p>
              <div>
                <div className={styles.social_login}>
                  <SocialLogin height="60px" />
                </div>
                <Button
                  children="회원가입"
                  style={{ width: '100%', 'margin-top': '20px' }}
                  className="btn_condition_true"
                  isDisabled={false}
                  onClick={moveSignup}
                />
              </div>
            </div>
          ) : (
            <div>
              <p>고객님의 정보와 일치하는 아이디입니다.</p>
              <br />
              <br />
              <ul>
                {result.userData.map((user) => (
                  <li className={styles.user_data}>
                    <div className={styles.user_data_id}>
                      <input type="radio" />
                      <span>{user.id}</span>
                    </div>
                    <div className={styles.user_data_created_date}>
                      <span>가입: </span>
                      <span>{user.created_date.toString().slice(0, 10)}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div style={{ 'margin-top': '40px' }}>
                <Button
                  children="비밀번호 찾기"
                  style={{ width: '100%', 'margin-top': '20px' }}
                  className="btn_default"
                  isDisabled={false}
                  onClick={moveFindpw}
                />
                <Button
                  children="로그인"
                  style={{ width: '100%', 'margin-top': '20px' }}
                  className="btn_condition_true"
                  isDisabled={false}
                  onClick={moveLogin}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Findid;
