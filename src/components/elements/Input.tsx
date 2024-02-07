import React from 'react'
import styled from 'styled-components'

interface InputProps {
  type: string;
  name: string;
  status: string;
  // style={{ imeMode: "disabled" }}
  // autoCapitalize="off"
  // autoComplete="off"
  // placeholder="이메일(ID)를 입력해주세요."
  // value={values.id}
  // onChange={handleChange}
  // readOnly={authBtn.confirmText == "인증완료"}
  // required
}

const StyledInput = styled.input`
  width: 100%;
  height: 60px;
  padding-left: 20px;
  border: 1px solid #aaa;
  placeholder color: #aaa;
  font-size: 1.6rem;
  &.off{
    background: #efefef
  }
  &.hover{}
  &.focus{}
  &.wrong{}
  &.enable {}
  &.disable
`;

const Input: React.FC<InputProps> = ({
  name,
  status
}) => {
  switch(name){
    case "id":
      return <StyledInput
        type='email'
        className={status}
        name='id'
        maxLength={40}
        autoCapitalize='off'
        placeholder='아이디(이메일)을 입력해주세요'
      >Input</StyledInput>;
    case "password":
      return <StyledInput>Input</StyledInput>;
    default:
      return <StyledInput>Input</StyledInput>;
  }
}

export default Input