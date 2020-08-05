import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_NUTRITION_LIST } from "src/common/queries";
import { Header, Table, Modal } from "src/components";
import { Wrapper } from "src/components/styled";
import { Nutrition } from "src/common/types";

export default function () {
  const [sortBy, setSortBy] = useState("dessert");
  const [nutritionList, setNutritionList] = useState<Nutrition[]>([]);
  const [show, setShow] = useState(false);
  const { loading, error, data } = useQuery(GET_NUTRITION_LIST, { variables: { sortBy } });

  useEffect(() => {
    if (data) {
      setNutritionList(data.nutritionList);
    }
  }, [data]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }
  if (error) {
    return <p style={{ textAlign: "center" }}>Error :(</p>;
  }

  return (
    <Wrapper>
      <Header />
      <Table {...{ nutritionList, sortBy, setSortBy, setShow }} />
      <Modal {...{ show, setShow }} />
    </Wrapper>
  );
}
