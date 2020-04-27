import styled from "styled-components";
import React from "react";

const StyledButton = styled.button<{css?: string}>`
  height: 24px; 
  width: 100px; 
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Lato', sans-serif;
  margin: 8px;
  ${props => props.css}
`;

type GenericButtonProps = { text: string, onClick: (e: React.MouseEvent<HTMLButtonElement>) => void, css?: string };

export const GenericButton = ({text, onClick, css}: GenericButtonProps) => {
  return (
    <StyledButton onClick={onClick} css={css}>{text}</StyledButton>
  )
};
