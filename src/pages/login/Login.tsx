import React, { useEffect, useState } from 'react';
import { regEmail, regPw, validateInput } from '@/utils/validation';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '@/apis/user';
import { LoginDto } from '@/interface/User';
import Button from '@/components/elements/Button';
import SocialLogin from '@/components/IcoSocialLogin';
import { useUser } from '@/contexts/UserContext';

const Login = () => {
  // 입력폼 유효성검사
  const [values, setValues] = useState<LoginDto>({
    id: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    switch (e.target.name) {
      case 'id':
        validateInput(regEmail, e.target);
        break;
      case 'password':
        validateInput(regPw, e.target);
        break;
    }
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    const isUseridValid = regEmail.test(values.id);
    const isUserpwValid = regPw.test(values.password);
    setIsSubmitDisabled(!(isUseridValid && isUserpwValid));
  }, [values]);

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await userApi.login(values);
    console.log(response);
    if (response.status !== 200) {
      alert('일치하는 회원정보가 없습니다.');
      return;
    } else {
      setUser({ id: response.data.id, nickname: response.data.nickname });
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          id: response.data.id,
          nickname: response.data.nickname,
        })
      );
      alert(response.data.nickname + '님 환영합니다.');
      navigate('/');
    }
  };

  return (
    <>
      <div className={styles.main_wrap}>
        <div className={styles.login_wrap}>
          <h4>사회복지 커리어플랫폼 NEEDU</h4>
          <div className={styles.login_box} id="form_login_user">
            <div className={styles.login_input_wrap}>
              <form id="form_user">
                <fieldset>
                  <input
                    type="text"
                    name="id"
                    id="userid"
                    className={`body2 ${styles.userid}`}
                    placeholder="아이디(이메일)를 입력하세요"
                    value={values.id}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    id="userpw"
                    className={`body2 ${styles.userpw}`}
                    autoComplete="off"
                    placeholder="비밀번호를 입력하세요"
                    value={values.password}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
              </form>
              <div className={styles.login_option}>
                <Link to="/find/id" className="body2">
                  아이디 찾기
                </Link>
                <span>|</span>
                <Link to="/find/pw" className="body2">
                  비밀번호 찾기
                </Link>
              </div>
            </div>
            <Button
              children="로그인"
              className={`btn_condition_true`}
              style={{ height: '60px' }}
              isDisabled={isSubmitDisabled}
              onClick={handleSubmit}
            />
          </div>
          <div className={`body2 ${styles.to_signup}`}>
            아직 회원이 아니신가요?
            <Link to="/signup" className="body2">
              회원가입
            </Link>
          </div>
          <div className={styles.social_login}>
            <SocialLogin height="60px" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
