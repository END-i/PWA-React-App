import React, { useState } from "react";

import { Header, Table, Modal } from "src/components";
import { Wrapper } from "src/components/styled";

export default function () {
  const [show, setShow] = useState(false);

  return (
    <Wrapper>
      <Header />
      <Table {...{ setShow }} />
      <Modal {...{ show, setShow }} />
    </Wrapper>
  );
}
