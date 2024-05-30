import React from 'react';
import styled from 'styled-components';
import kakaoSymbol from '@/assets/images/symbol_kakao.png';
import googleImage from '@/assets/images/social_google.png';

interface SocialLoginProps {
  height: string;
}

const BaseUrl = import.meta.env.VITE_APP_API_URL;

const SocialLoginDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
  button {
    margin-top: 0px;
  }
`;

const KakaoBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #fee500;
  border-radius: 5px;
  img {
    height: 18px;
  }
  span {
    margin-left: 12px;
  }
`;

const GoogleBtn = styled.button<SocialLoginProps>`
  width: ${({ height }) => (height === '60px' ? '65px' : '45px')};
  flex-shrink: 0;
  background: url(${googleImage}) no-repeat center/contain;
`;

const SocialLogin: React.FC<SocialLoginProps> = ({ height }) => {
  return (
    <SocialLoginDiv>
      <KakaoBtn
        onClick={() => (window.location.href = `${BaseUrl}/auth/kakao`)}
      >
        <img src={kakaoSymbol}></img>
        <span>카카오로 시작하기</span>
      </KakaoBtn>
      <GoogleBtn
        height={height}
        onClick={() => (window.location.href = `${BaseUrl}/auth/google`)}
      ></GoogleBtn>
    </SocialLoginDiv>
  );
};

export default SocialLogin;
