import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  text: string;
  targetForm: string;
  isSubmitDisabled: boolean;
}

const StyledButton = styled.button`
  width: 100%;
  height: 54px;
  padding: 8px;
  font-size: 1.6rem;
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
