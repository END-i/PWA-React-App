import React from "react";

import { ButtonProps } from "src/common/types";
import { Wrapper } from "./styled";

export default function ({ children, bg, color, size = 0.7, ...rest }: ButtonProps) {
  return <Wrapper {...{ bg, color, size, ...rest }}>{children}</Wrapper>;
}
