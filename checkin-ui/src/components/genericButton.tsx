import styled from "styled-components";
import React from "react";

const StyledButton = styled.button<{height?: number, width?: number}>`
  height: ${props => props.height || '24'}px;  
  width: ${props => props.width || '150'}px;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Lato', sans-serif;
  margin: 8px;
`;

type GenericButtonProps = {
  text: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  dimensions?: {width?: number, height?: number}
};

export const GenericButton = ({text, onClick, dimensions}: GenericButtonProps) => {
  return (
    <StyledButton onClick={onClick} width={dimensions?.width} height={dimensions?.height}>
      {text}
    </StyledButton>
  )
};
