import React from "react";
import { useMutation } from "@apollo/client";

import { GET_NUTRITION_LIST, DELETE_NUTRITION } from "src/common/queries";
import { Wrapper, Selected, ButtonGroup } from "./styled";
import { Button } from "src/components";
import { TableHeaderProps } from "src/common/types";
import { ReactComponent as PlusIcon } from "src/assets/icons/plus.svg";
import { ReactComponent as DeleteIcon } from "src/assets/icons/delete.svg";

export default function ({ selected, setShow, setSelected }: TableHeaderProps) {
  const [deleteNutrition] = useMutation(DELETE_NUTRITION, {
    refetchQueries: [{ query: GET_NUTRITION_LIST, variables: { sortBy: "dessert" } }],
  });

  const handleDelete = () => {
    deleteNutrition({
      variables: {
        ids: selected,
      },
    });
    setSelected([]);
  };

  return (
    <Wrapper>
      <Selected>{selected.length} selected</Selected>
      <ButtonGroup>
        <Button bg="#fff" color="#016701" onClick={() => setShow(true)}>
          <PlusIcon />
          Add new
        </Button>
        <Button color="#ef8fa0" onClick={handleDelete} disabled={!selected.length}>
          <DeleteIcon />
          Delete
        </Button>
      </ButtonGroup>
    </Wrapper>
  );
}
