import styled from "styled-components";

export const Input = styled.input<{ error: string }>`
  outline: none;
  background: #fff;
  color: #000;
  border-color: ${({ error }) => (error ? "#f7737380" : "#ccc")};
  border-width: 1px;
  border-style: solid;
  width: 100%;
  transition: 0.3s;
  border-radius: 3px;
  box-sizing: border-box;
  font-family: Roboto;
  font-size: 13px;
  line-height: 14px;
  padding: 7px 11px;

  &::placeholder {
    color: #ccc;
  }
  &:-ms-input-placeholder {
    color: #ccc;
  }
  ::-ms-input-placeholder {
    color: #ccc;
  }
  &:focus {
    border-color: ${({ error }) => (error ? "#f77171" : "#888")};
  }
`;
export const ErrorInput = styled.small`
  color: #f77171;
  min-height: 20px;
`;
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Field = styled.div`
  display: flex;
  align-items: center;
`;
export const ShowPassword = styled.div<{ type: string }>`
  display: ${({ type }) => (type === "password" ? "flex" : "none")};
  cursor: pointer;
  padding: 0.5em;
  svg {
    fill: #fff;
    width: 1em;
    height: 1em;
  }
`;
