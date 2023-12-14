import React from "react";
import styled from "styled-components";

interface ButtonProps {
  text: string;
  targetForm: string;
  isSubmitDisabled: boolean;
}

const StyledButton = styled.button`
  width: 100%;
  max-width: 180px;
  height: 54px;
  padding: 8px;
  color: ${(props) => (props.disabled ? "#444" : "#fafafa")};
  font-size: 1.6rem;
  border-radius: 5px;
  background: ${(props) => (props.disabled ? "#aaa" : "#6369f5")};
`;

const SubmitBtn: React.FC<ButtonProps> = ({
  text,
  targetForm,
  isSubmitDisabled,
}) => {
  return (
    <StyledButton type="submit" form={targetForm} disabled={isSubmitDisabled}>
      {text}
    </StyledButton>
  );
};

export default SubmitBtn;
