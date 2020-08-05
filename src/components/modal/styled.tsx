import styled from "styled-components";

import { ModalWrapperProps } from "src/common/types";

export const Wrapper = styled.div`
  background: #ddd;
  padding: 20px;
  min-width: 350px;
`;

export const Shadow = styled.div<ModalWrapperProps>`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

export const Field = styled.div`
  padding: 5px 0;
  font-weight: bold;
`;
