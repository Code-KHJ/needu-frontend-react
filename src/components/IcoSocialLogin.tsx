import React from 'react'
import styled from 'styled-components'
import naverImage from '@/assets/images/social_naver.png';
import kakaoSymbol from '@/assets/images/symbol_kakao.png';

interface SocialLoginProps {
  height: string
}

const SocialLoginDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
  button {
    margin-top: 0px;
  }
`

const KakaoBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #FEE500;
  border-radius: 5px;
  img {
    height: 18px;
  }
  span {
    margin-left: 12px;
  }
`

const NaverBtn = styled.button<SocialLoginProps>`
  width: ${({height}) => (height === '60px' ? '65px' : '45px')};
  flex-shrink: 0;
  background: url(${naverImage}) no-repeat center/contain;
`;

const SocialLogin: React.FC<SocialLoginProps> = ({ height }) => {
  return (
    <SocialLoginDiv>
      <KakaoBtn>
        <img src={kakaoSymbol}></img>
        <span className='subtxt'>카카오로 시작하기</span>
      </KakaoBtn>
      <NaverBtn height={height}></NaverBtn>
    </SocialLoginDiv>
    
  )
}

export default SocialLogin