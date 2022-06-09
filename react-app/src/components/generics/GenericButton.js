import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 45px;
  border-radius: 4px;
  border: 0;
  font-size: 22px;
`;

export default function GenericButton({ iconName, className, onClick, style }) {

  return (
    <Button className={className} onClick={onClick} style={style}>
      <i className={`fas fa-${iconName}`} />
    </Button>
  );
}
