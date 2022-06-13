import React, { useState, useEffect } from "react";
import { getOpenBars } from "../../api/data/openBars-data";
import NewBarButton from "../buttons/NewBarButton";
import { ColumnSection } from "../generics/StyledComponents";
import OpenBar from "../listables/OpenBar";
import Title from "../Title";
import Modal from "../generics/Modal";
import BarSelectModal from "../modal-content/BarSelectModal";
import { getCurrentUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

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

  const [openBarsList, setOpenBarsList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [barModalData, setBarModalData] = useState(defaultBarData);

  // Initialize
  useEffect(() => {
    (async function () {
      let openBars = await getOpenBars();
      setOpenBarsList(openBars.data);
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
  const closeBarModal = () => {
    setShowModal(false);
  };

  const showBarModal = (barData) => {
    setBarModalData(barData);
    setShowModal(true);
  };

  const editBarButton = () => {
    console.warn("go to bar edit form", barModalData.id);
  };

  return (
    <>
      <Title title="Bar Select" />
      <ColumnSection>
        {openBarsList.map((openBarInfo) => (
          <OpenBar
            key={openBarInfo.id}
            barInfo={openBarInfo}
            selectBar={selectBar}
          />
        ))}
      </ColumnSection>
      <NewBarButton />

      {showModal && (
        <Modal
          title="Bar Management"
          modalContent={<BarSelectModal modalData={barModalData} />}
          closeModal={closeBarModal}
          submitModal={editBarButton}
          submitIcon="edit"
          submitClass="btn-info"
        />
      )}
    </>
  );
}
