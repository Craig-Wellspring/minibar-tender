import React from "react";
import { useNavigate } from "react-router";
import GenericButton from "../generics/GenericButton";

export default function NewBarButton() {
  const navigate = useNavigate();

  return (
    <GenericButton
      className="btn-selected"
      style={{ width: "120px", marginTop: "15px" }}
      iconName="plus"
      onClick={() => navigate("/barsetup")}
    />
  );
}
