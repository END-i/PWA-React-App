import styled from "styled-components";

import { ReactComponent as SortIcon } from "src/assets/icons/sort.svg";
import { RowProps, ColumnProps } from "src/common/types";

export const Row = styled.div<RowProps>`
  background: ${({ head }) => (head ? "#fff" : "transparent")};
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  padding: 10px 15px;
  margin: 0 10px;
  border-bottom: 1px solid #ddd;

  @media only screen and (max-width: 768px) {
    margin: 0;
    min-width: 748px;
  }
`;

export const Column = styled.div<ColumnProps>`
  display: flex;
  align-items: center;
  font-weight: ${({ head }) => (head ? "bold" : "normal")};
  cursor: ${({ clickable }) => (clickable ? "pointer" : "initial")};
`;

export const Checkbox = styled.input``;

export const SortButton = styled(SortIcon)`
  width: 1em;
  max-height: 1em;
  cursor: pointer;
`;

export const NoRows = styled.p`
  text-align: center;
  margin: 5px 0;
`;

export const TableWrapper = styled.div`
  overflow: auto;
`;
