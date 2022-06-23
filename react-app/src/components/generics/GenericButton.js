import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-size: 22px;
`;

export default function GenericButton({ iconName, className, onClick, style }) {

  return (
    <Button className={className + " btn"} onClick={onClick} style={style}>
      <i className={`fas fa-${iconName}`} />
    </Button>
  );
}
