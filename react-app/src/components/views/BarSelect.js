import React, { useState, useEffect } from "react";
import { getOpenBars } from "../../api/data/openBars-data";
import NewBarButton from "../buttons/NewBarButton";
import { ColumnSection, Label, Title } from "../generics/StyledComponents";
import OpenBar from "../listables/OpenBar";
import Modal from "../generics/Modal";
import BarSelectModal from "../modal-content/BarSelectModal";
import { getCurrentUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import LargeLoading from "../generics/LargeLoading";
import styled from "styled-components";

const BarList = styled(ColumnSection)`
  width: 90%;
  gap: 8px;
  padding: 8px 20px;
`;

const defaultBarData = {
  id: "",
  bar_date: "",
  floor: 0,
  server_id: null,
  server_name: "",
  stocker_id: null,
  stocker_name: "",
  stocker_only: null,
};

export default function BarSelect() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [openBarsList, setOpenBarsList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [barModalData, setBarModalData] = useState(defaultBarData);

  // Initialize
  useEffect(() => {
    (async function () {
      const openBars = await getOpenBars();
      setOpenBarsList(openBars);
      setIsLoading(false);
    })();
  }, []);

  // Selection
  const selectBar = (barData) => {
    const uid = getCurrentUser().id;
    if (barData.server_id === uid) {
      navigate(`/serverops/${barData.id}`);
    }
    if (barData.stocker_id === uid) {
      navigate(`/stockerops/${barData.id}`);
    }
    showBarModal(barData);
  };

  // Modal control
  const showBarModal = (barData) => {
    setBarModalData(barData);
    setShowModal(true);
  };

  const editBarButton = () => {
    navigate(`/barsetup/${barModalData.id}`);
  };

  return (
    <>
      <Title style={{ marginBottom: "15px" }}>Select Bar</Title>

      {isLoading ? (
        <LargeLoading />
      ) : (
        <BarList className="card">
          {openBarsList.length > 0 ? (
            openBarsList.map((openBarInfo) => (
              <OpenBar
                key={openBarInfo.id}
                barInfo={openBarInfo}
                selectBar={selectBar}
              />
            ))
          ) : (
            <Label style={{ width: "80%" }}>No Open Bars</Label>
          )}
        </BarList>
      )}
      <NewBarButton />

      {showModal && (
        <Modal
          title="Bar Management"
          modalContent={<BarSelectModal modalData={barModalData} />}
          closeModal={() => setShowModal(false)}
          submitModal={editBarButton}
          submitIcon="edit"
          submitClass="btn-info"
        />
      )}
    </>
  );
}
