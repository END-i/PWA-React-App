import styled from "styled-components";

import { ButtonWrapperProps } from "src/common/types";

export const Wrapper = styled.button<ButtonWrapperProps>`
  ${({ disabled }) => {
    if (disabled) {
      return `opacity: 0.5;`;
    }
  }}
  display: flex;
  align-items: center;
  padding: 6px 10px;
  background: ${({ bg }) => bg || "#fff"};
  color: ${({ color }) => color || "#fff"};
  font-size: ${({ size }) => size}em;
  text-transform: uppercase;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 0.3s;
  &:active {
    opacity: 0.5;
  }
  svg {
    width: ${({ size }) => size}em;
    max-height: ${({ size }) => size}em;
    fill: ${({ color }) => color || "#fff"};
    font-weight: bold;
    margin: 0 5px;
  }
`;
