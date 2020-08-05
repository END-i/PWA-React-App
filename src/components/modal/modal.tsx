import React, { useRef } from "react";
import { useMutation } from "@apollo/client";

import { Input, Button } from "src/components";
import { useOutsideClick, useForm } from "src/common/hooks";
import { ModalProps, FormValuesProps } from "src/common/types";
import { Wrapper, Shadow, Field } from "./styled";
import { ReactComponent as CheckIcon } from "src/assets/icons/correct.svg";
import { ADD_NUTRITION, GET_NUTRITION_LIST } from "src/common/queries";

const init = {
  dessert: "",
  calories: "",
  fat: "",
  carbs: "",
  protein: "",
};

const fields = [
  {
    placeholder: "Dessert name",
    name: "dessert",
  },
  {
    placeholder: "Calories",
    name: "calories",
    type: "number",
  },
  {
    placeholder: "Fat",
    name: "fat",
    type: "number",
  },
  {
    placeholder: "Carbs",
    name: "carbs",
    type: "number",
  },
  {
    placeholder: "Protein",
    name: "protein",
    type: "number",
  },
];

export default function ({ show, setShow }: ModalProps) {
  const [createNutrition] = useMutation(ADD_NUTRITION, {
    refetchQueries: [{ query: GET_NUTRITION_LIST }],
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const {
    values,
    resetForm,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    onEnter,
  } = useForm({
    initialValues: init,
    onSubmit: ({ dessert, calories, carbs, fat, protein }: FormValuesProps) => {
      const nutritionInfo = {
        calories,
        fat,
        carbs,
        protein,
      };
      createNutrition({ variables: { dessert, nutritionInfo } });
      setShow(false);
      resetForm();
    },
  });

  useOutsideClick(modalRef, () => {
    setShow(false);
    resetForm();
  });

  return (
    <Shadow show={show}>
      <Wrapper ref={modalRef}>
        {fields.map(({ placeholder, name, type }) => (
          <div key={name}>
            <Field>{placeholder} *</Field>
            <Input
              value={values[name]}
              onBlur={handleBlur}
              onKeyUp={onEnter}
              error={touched[name] ? errors[name] : ""}
              onChange={handleChange}
              {...{ type, placeholder, name }}
            />
          </div>
        ))}
        <Button bg="green" onClick={handleSubmit}>
          <CheckIcon />
          Submit
        </Button>
      </Wrapper>
    </Shadow>
  );
}
