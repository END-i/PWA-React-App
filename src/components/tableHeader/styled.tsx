import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 0 10px;
  background: #ffe8ec;
  @media only screen and (max-width: 768px) {
    margin: 0;
  }
`;

export const Selected = styled.div`
  color: #e4827d;
  font-weight: bold;
  font-size: 1em;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 180px;
`;
