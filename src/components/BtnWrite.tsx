import React from "react";
import styled from "styled-components";
import ico_edit from "@/assets/images/ico_edit_white.png";

interface BtnWriteProps {
  onClick: () => void;
}

const StyledBtn = styled.button`
  position: sticky;
  margin-left: calc(90% - 48px);
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background: rgba(98, 105, 245, 0.8);
  border-radius: 50px;

  @media screen and (min-width: 768px) {
    margin-left: unset;
    left: 100%;
  }

  @media screen and (min-width: 1024px) {
    width: 54px;
    height: 54px;
    right: 7%;
  }
`;

const BtnWrite: React.FC<BtnWriteProps> = ({ onClick }) => {
  return (
    <StyledBtn onClick={onClick}>
      <img src={ico_edit} style={{ width: "24px" }} />
    </StyledBtn>
  );
};

export default BtnWrite;
