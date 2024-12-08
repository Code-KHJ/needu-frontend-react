import ico_edit from "@/assets/images/ico_edit_white.png";
import React from "react";
import styled from "styled-components";

interface BtnWriteProps {
  onClick: () => void;
  marginLeft: string;
}

const StyledBtn = styled.button<BtnWriteProps>`
  position: sticky;
  margin-left: ${(props) => `calc(${props.marginLeft} - 60px)`};
  bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: rgba(98, 105, 245, 0.8);
  border-radius: 50px;

  @media screen and (min-width: 768px) {
    margin-left: unset;
    left: 100%;
  }
`;

const BtnWrite: React.FC<BtnWriteProps> = ({ onClick, marginLeft }) => {
  return (
    <StyledBtn onClick={onClick} marginLeft={marginLeft}>
      <img src={ico_edit} style={{ width: "24px" }} />
    </StyledBtn>
  );
};

export default BtnWrite;
