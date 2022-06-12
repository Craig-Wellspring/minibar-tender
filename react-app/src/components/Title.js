import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  font-size: 130%;
`;

export default function Title({ title, style }) {
  return <Container style={style}>{title}</Container>;
}
