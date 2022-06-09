import React from "react";
import { useNavigate } from "react-router";
import GenericButton from "../generics/GenericButton";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <GenericButton
      className="btn-danger"
      iconName="angle-double-left"
      onClick={() => navigate(-1)}
    />
  );
}
