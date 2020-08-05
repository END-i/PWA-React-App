import React, { useEffect, useState } from "react";

import { TableProps } from "src/common/types";
import { Row, Column, Checkbox, SortButton, NoRows, TableWrapper } from "./styled";
import { TableHeader } from "src/components";

const head = [
  { key: "dessert", label: "Dessert (100g serving)" },
  { key: "calories", label: "Calories" },
  { key: "fat", label: "Fat (g)" },
  { key: "carbs", label: "Carbs (g)" },
  { key: "protein", label: "Protein (g)" },
];

export default function ({ nutritionList = [], sortBy, setSortBy, setShow }: TableProps) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected([]);
  }, [nutritionList]);

  const handleChange = (id: string, checked: boolean) => () => {
    const selectedIdx = selected.findIndex((i) => i === id);
    const newSelected = [...selected];
    if (checked) {
      newSelected.splice(selectedIdx, 1);
    } else {
      newSelected.push(id);
    }
    setSelected(newSelected);
  };

  const handleCheckedAll = () => {
    if (selected.length !== nutritionList.length) {
      let arr: string[] = [];
      nutritionList.forEach(({ id }) => {
        arr.push(id);
      });
      setSelected(arr);
    } else {
      setSelected([]);
    }
  };

  const checkedAll = () => {
    if (!nutritionList.length || selected.length !== nutritionList.length) {
      return false;
    }
    return true;
  };

  const list = () => {
    if (nutritionList.length) {
      return nutritionList.map(
        ({ id, dessert, nutritionInfo: { calories, fat, carbs, protein } }) => {
          const checked = selected.find((i) => i === id);
          return (
            <Row key={id}>
              <Column>
                <Checkbox
                  type="checkbox"
                  checked={!!checked}
                  onChange={handleChange(id, !!checked)}
                />
              </Column>
              <Column>{dessert}</Column>
              <Column>{calories}</Column>
              <Column>{fat}</Column>
              <Column>{carbs}</Column>
              <Column>{protein}</Column>
            </Row>
          );
        },
      );
    }
    return <NoRows>No rows</NoRows>;
  };
  return (
    <div>
      <TableHeader {...{ selected, setSelected, setShow }} />
      <TableWrapper>
        <Row head>
          <Column>
            <Checkbox type="checkbox" onChange={handleCheckedAll} checked={checkedAll()} />
          </Column>
          {head.map(({ key, label }) => (
            <Column key={key} head clickable onClick={() => setSortBy(key)}>
              {label}
              <SortButton fill={sortBy === key ? "blue" : "inherit"} />
            </Column>
          ))}
        </Row>
        {list()}
      </TableWrapper>
    </div>
  );
}
