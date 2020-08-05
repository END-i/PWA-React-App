import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 2em;
  @media only screen and (max-width: 768px) {
    font-size: 1.5em;
  }
  @media only screen and (max-width: 480px) {
    font-size: 1em;
  }
`;
