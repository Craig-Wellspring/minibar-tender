import React from "react";
import { useNavigate } from "react-router";
import GenericButton from "./GenericButton";

export default function NewBarButton() {
  const navigate = useNavigate();

  return (
    <GenericButton
      className="btn-selected"
      style={{ width: "100%", marginTop: "15px" }}
      iconName="plus"
      onClick={() => navigate("/newbar")}
    />
  );
}
