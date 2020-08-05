import React from "react";
import { useMutation } from "@apollo/client";

import { Button } from "src/components";
import { Wrapper, Title } from "./styled";
import { ReactComponent as UpdateIcon } from "src/assets/icons/repeat.svg";
import { RESET_DATA, GET_NUTRITION_LIST } from "src/common/queries";

export default function () {
  const [resetData] = useMutation(RESET_DATA, {
    refetchQueries: [{ query: GET_NUTRITION_LIST }],
  });

  const handleClick = () => {
    resetData();
  };

  return (
    <Wrapper>
      <Title>Nutrition List</Title>
      <Button bg="#016701" size={1} onClick={handleClick}>
        <UpdateIcon />
        Reset data
      </Button>
    </Wrapper>
  );
}
