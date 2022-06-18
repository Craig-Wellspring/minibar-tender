import React, { useState } from "react";
import { ColumnSection, Section } from "../generics/StyledComponents";
import Title from "../Title";
import styled from "styled-components";
import { getCurrentUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { updateBar } from "../../api/data/openBars-data";

const StaffingButton = styled(Section)`
  width: 80%;
  justify-content: space-between;

  padding: 8px 20px;
  border-radius: 4px;
  font-size: 24px;
`;

export default function BarSelectModal({ modalData }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const selectServer = async () => {
    if (!isLoading) {
      if (!modalData.server_id) {
        const currentUser = getCurrentUser();
        const userID = currentUser.id;
        const userName = currentUser.user_metadata.full_name;
        setIsLoading(true);

        // Update openBar data with server info (Sign in to Bar)
        await updateBar(modalData.id, {
          server_id: userID,
          server_name: userName,
        });

        // Navigate to Server operations
        navigate(`/serverops/${modalData.id}`);
      } else {
        setErrorText("Server already assigned.");
      }
    }
  };

  const selectStocker = async () => {
    if (!isLoading) {
      if (!modalData.stocker_id) {
        const currentUser = getCurrentUser();
        const userID = currentUser.id;
        const userName = currentUser.user_metadata.full_name;
        setIsLoading(true);

        // Update openBar data with stocker info
        await updateBar(modalData.id, {
          stocker_id: userID,
          stocker_name: userName,
        });

        // Navigate to Stocker operations
        navigate(`/stockerops/${modalData.id}`);
      } else {
        setErrorText("Stocker already assigned.");
      }
    }
  };

  return (
    <ColumnSection>
      <Section id="date-section">
        Floor: {modalData.floor} | {String(modalData.bar_date).substring(5)}
      </Section>

      <ColumnSection id="staffing-buttons" style={{ width: "100%" }}>
        {!modalData.stocker_only && (
          <StaffingButton
            id="server-staffing-button"
            className={`btn-${modalData.server_id ? "selected" : "danger"}`}
            onClick={() => {
              selectServer();
            }}
          >
            <i className="fas fa-cash-register" />
            {modalData.server_name || "No Server"}
            {!modalData.server_id && (
              <i
                className={`no-click fas fa-${
                  isLoading ? "spinner fa-spin" : "sign-in-alt"
                }`}
              />
            )}
          </StaffingButton>
        )}

        <StaffingButton
          id="stocker-staffing-button"
          className={`btn-${modalData.stocker_id ? "selected" : "danger"}`}
          onClick={() => {
            selectStocker();
          }}
        >
          <i className="fas fa-dolly" />
          {modalData.stocker_name || "No Stocker"}
          {!modalData.stocker_id && (
            <i
              className={`no-click fas fa-${
                isLoading ? "spinner fa-spin" : "sign-in-alt"
              }`}
            />
          )}
        </StaffingButton>
      </ColumnSection>
      <Title title={errorText} style={{ color: "red" }} />
    </ColumnSection>
  );
}
