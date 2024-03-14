import React from 'react';
import styles from './Element.module.scss';

interface InputProps {
  name: string;
  className: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly: boolean;
  required: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  className,
  value,
  placeholder,
  onChange,
  readOnly,
  required,
}) => {
  switch (name) {
    case 'id':
      return (
        <input
          type="email"
          className={`${styles.input} ${styles[className]}`}
          name="id"
          maxLength={40}
          autoCapitalize="off"
          placeholder="이메일 형식으로 작성해주세요"
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
        />
      );
    case 'password':
      return (
        <input
          type="password"
          className={`${styles.input} ${styles[className]}`}
          name="password"
          minLength={8}
          maxLength={16}
          autoComplete="off"
          placeholder="8~16자 영문 대소문자, 숫자, 특수문자"
          value={value}
          onChange={onChange}
          required={required}
        />
      );
    case 'password2':
      return (
        <input
          type="password"
          className={`${styles.input} ${styles[className]}`}
          name="password2"
          minLength={8}
          maxLength={16}
          autoComplete="off"
          placeholder="비밀번호를 다시 한번 입력해주세요"
          value={value}
          onChange={onChange}
          required={required}
        />
      );
    case 'phone':
      return (
        <input
          type="text"
          className={`${styles.input} ${styles[className]}`}
          name="phonenumber"
          autoComplete="off"
          maxLength={11}
          placeholder="-빼고 숫자만 입력하세요"
          value={value}
          onChange={onChange}
          required={required}
        />
      );
    case 'nickname':
      return (
        <input
          type="text"
          className={`${styles.input} ${styles[className]}`}
          name="nickname"
          autoComplete="off"
          minLength={2}
          maxLength={20}
          placeholder="2~10자 이내로 작성해주세요"
          value={value}
          onChange={onChange}
          required={required}
        />
      );
    default:
      return (
        <input
          type="text"
          className={`${styles.input} ${styles[className]}`}
          maxLength={40}
          autoCapitalize="off"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          required={required}
        />
      );
  }
};

export default Input;
