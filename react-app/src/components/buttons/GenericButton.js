import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 30px;
  border-radius: 4px;
  border: 0;
`;

export default function GenericButton({ iconName, className, onClick }) {

  return (
    <Button className={className} onClick={onClick}>
      <i className={`fas fa-${iconName}`} />
    </Button>
  );
}
