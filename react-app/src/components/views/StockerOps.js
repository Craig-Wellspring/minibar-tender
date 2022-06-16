import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../Title";
import { getOpenBar } from "../../api/data/openBars-data";
import { Break, ColumnSection, Section } from "../generics/StyledComponents";
import BackButton from "../buttons/BackButton";
import GenericButton from "../generics/GenericButton";
import BarSignoutButton from "../buttons/BarSignoutButton";
import StockerDrink from "../listables/StockerDrink";
import { getStockedDrinks } from "../../api/data/stockedDrinks-data";
import Modal from "../generics/Modal";
import StockerWrapupModal from '../modal-content/StockerWrapupModal'

function StockerOps() {
  const { barID } = useParams();
  const [barInfo, setBarInfo] = useState({});

  const drinkRef = useRef([]);
  const [drinksList, setDrinksList] = useState([]);

  const [showWrapupModal, setShowWrapupModal] = useState(false);

  const clearCart = () => {
    drinkRef.current?.map((drink) => drink.clearCart());
  };

  const openWrapupModal = () => {
    setShowWrapupModal(true);
  };

  const closeWrapupModal = () => {
    setShowWrapupModal(false);
  };

  const submitWrapupModal = () => {
    console.warn("submit bar wrapup");
  };

  useEffect(() => {
    let isMounted = true;
    (async function () {
      const barData = await getOpenBar(barID);
      if (isMounted) {
        setBarInfo(barData);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [barID]);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      const stockedDrinks = await getStockedDrinks(barID);
      if (isMounted) {
        setDrinksList(stockedDrinks);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [barID]);

  return (
    <>
      <ColumnSection>
        <Title title={`Barback`} />
        <div>
          Floor: {barInfo.floor} | {String(barInfo.bar_date).substring(5)}
        </div>

        <ColumnSection id="drinks-section">
          {drinksList.length > 0 ? (
            drinksList.map((drink, i) => (
              <StockerDrink
                key={drink.id}
                drinkData={drink}
                ref={(el) => {
                  drinkRef.current[i] = el;
                }}
              />
            ))
          ) : (
            <div>No Drinks</div>
          )}
        </ColumnSection>

        <Section id="cart-confirm-buttons">
          <GenericButton
            className="btn-warning"
            iconName="eraser"
            onClick={clearCart}
          />
          <GenericButton className="btn-selected" iconName="dolly" />
        </Section>

        <Break />
        <Section id="button-tray">
          <BackButton />
          <BarSignoutButton barID={barID} role="stocker" />
          <GenericButton
            id="count-button"
            iconName="clipboard-list"
            className="btn-selected"
            onClick={openWrapupModal}
          />
        </Section>
      </ColumnSection>
      {showWrapupModal && (
        <Modal
          title="Bar Wrap-up"
          modalContent={<StockerWrapupModal />}
          closeModal={closeWrapupModal}
          submitModal={submitWrapupModal}
        />
      )}
    </>
  );
}

export default StockerOps;
