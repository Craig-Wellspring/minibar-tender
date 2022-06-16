import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function StoreSelect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Validate user
    navigate("/barselect");
  });

  return <></>;
}
