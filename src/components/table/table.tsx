import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_NUTRITION_LIST } from "src/common/queries";
import { Row, Column, Checkbox, SortButton, Stat, TableWrapper } from "./styled";
import { TableHeader } from "src/components";
import { Nutrition, TableProps } from "src/common/types";

const head = [
  { key: "dessert", label: "Dessert (100g serving)" },
  { key: "calories", label: "Calories" },
  { key: "fat", label: "Fat (g)" },
  { key: "carbs", label: "Carbs (g)" },
  { key: "protein", label: "Protein (g)" },
];

export default function ({ setShow }: TableProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [nutritionList, setNutritionList] = useState<Nutrition[]>([]);
  const [sortBy, setSortBy] = useState("dessert");
  const { loading, error, data } = useQuery(GET_NUTRITION_LIST);

  useEffect(() => {
    if (data) {
      setNutritionList(data.nutritionList);
    }
    setSelected([]);
  }, [data]);

  useEffect(() => {
    handleSortList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

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

  function handleSortList() {
    if (data) {
      const subField = sortBy === "dessert" ? "dessert" : "nutritionInfo";
      const sortData = [...data.nutritionList].sort(
        (_a: { [x: string]: any }, _b: { [x: string]: any }) => {
          const a = subField ? Number(_a[subField][sortBy]) : _a[sortBy].toLowerCase();
          const b = subField ? Number(_b[subField][sortBy]) : _b[sortBy].toLowerCase();
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        },
      );
      setNutritionList(sortData);
    }
  }

  const checkedAll = () => {
    if (!nutritionList.length || selected.length !== nutritionList.length) {
      return false;
    }
    return true;
  };

  const list = () => {
    if (loading) {
      return <Stat>Loading...</Stat>;
    }

    if (error) {
      return <Stat>Error :(</Stat>;
    }

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
    return <Stat>No rows</Stat>;
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
