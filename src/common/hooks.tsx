import { useEffect, useState } from "react";

import { UseFormProps } from "src/common/types";

export const useOutsideClick = (ref: any, callback: () => void) => {
  const handleClick = (e: { target: any }) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
};

export const useForm = ({ initialValues, onSubmit }: UseFormProps) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [onSubmitting, setOnSubmitting] = useState<boolean>(false);

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setValues(initialValues);
    setTouched({});
    setOnSubmitting(false);

    for (let i in initialValues) {
      const error: string | undefined = validation(i, initialValues[i]);
      if (error) {
        setErrors((prev) => ({ ...prev, [i]: error }));
      }
    }
  };

  useEffect(() => {
    setOnSubmitting(!Object.keys(errors).length);
  }, [errors, touched]);

  const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
    const error: string | undefined = validation(name, value);
    setErrors((prev) => {
      if ((!error && prev[name]) || !error) {
        const newPrev = { ...prev };
        delete newPrev[name];
        return newPrev;
      }
      return { ...prev, [name]: error };
    });
  };

  const touchAllField = () => {
    for (let i in initialValues) {
      setTouched((prev) => ({ ...prev, [i]: true }));
    }
  };

  const handleBlur = ({ target: { name } }: React.ChangeEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    if (event) {
      event.preventDefault();
    }
    touchAllField();
    if (onSubmitting) {
      onSubmit(values);
    }
  };

  const onEnter = (event: { preventDefault: () => void; key: string }) => {
    if (event) {
      event.preventDefault();
      if (event.key === "Enter") {
        touchAllField();
        if (onSubmitting) {
          onSubmit(values);
        }
      }
    }
  };

  return {
    values,
    setValues,
    errors,
    touched,
    resetForm,
    handleChange,
    handleBlur,
    handleSubmit,
    onEnter,
  };
};

export const validation = (name: string, value: string) => {
  const rules: { [key: string]: { regex: RegExp; message: string }[] } = {
    dessert: [{ message: "Enter dessert", regex: /^.{2,}$/g }],
    calories: [{ message: "Enter calories", regex: /^[0-9]+$/g }],
    carbs: [{ message: "Enter carbs", regex: /^[0-9]+$/g }],
    fat: [{ message: "Enter fat", regex: /^[0-9]+$/g }],
    protein: [{ message: "Enter protein", regex: /^[0-9]+$/g }],
  };
  if (rules[name]) {
    for (let idx in rules[name]) {
      const { message, regex } = rules[name][idx];
      if (!value.match(regex)) {
        return message;
      }
    }
  }
};
