import React from "react";
import styled from "styled-components";

const Spinner = styled.i`
  font-size: 50px;
`;

export default function LargeLoading() {
  return <Spinner className="fas fa-spinner fa-spin" />;
}
