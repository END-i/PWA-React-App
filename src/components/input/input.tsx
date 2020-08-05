import React, { useState } from "react";

import { Input, InputWrapper, ErrorInput, Field, ShowPassword } from "./styled";
import { ReactComponent as Eye } from "src/assets/icons/eye.svg";
import { ReactComponent as Hide } from "src/assets/icons/hide.svg";

export default function ({
  error = "",
  type = "text",
  ...rest
}: {
  [key: string]: any;
  error?: string;
  type?: string;
}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <InputWrapper>
      <Field>
        <Input error={error} type={show ? "text" : type} {...rest} />
        <ShowPassword type={type} onClick={() => setShow((prev) => !prev)}>
          {show ? <Eye /> : <Hide />}
        </ShowPassword>
      </Field>
      <ErrorInput>{error}</ErrorInput>
    </InputWrapper>
  );
}
