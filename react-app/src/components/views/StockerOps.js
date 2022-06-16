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
import StockerWrapupModal from "../modal-content/StockerWrapupModal";
import LargeLoading from "../generics/LargeLoading";
import LoadingIcon from "../generics/LoadingIcon";
import { sortDrinkListByName } from "../generics/HelperFunctions";

function StockerOps() {
  const { barID } = useParams();

  const [isLoading, setIsLoading] = useState(2);
  const [cartLoading, setCartLoading] = useState(false);

  const [barInfo, setBarInfo] = useState({});

  const drinkRef = useRef([]);
  const [drinksList, setDrinksList] = useState([]);

  const [showWrapupModal, setShowWrapupModal] = useState(false);

  // Initialize
  useEffect(() => {
    let isMounted = true;
    (async function () {
      const barData = await getOpenBar(barID);
      if (isMounted) {
        setBarInfo(barData);
        setIsLoading((prevState) => prevState - 1);
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
      const drinksWithEndCountKey = stockedDrinks.map((drink) => ({
        ...drink,
        end_count: 0,
      }));
      if (isMounted) {
        setDrinksList(sortDrinkListByName(drinksWithEndCountKey));
        setIsLoading((prevState) => prevState - 1);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [barID]);

  // Cart Control
  const submitCart = async () => {
    setCartLoading(true);
    await Promise.all(drinkRef.current?.map((d) => d.submitCart()));
    setCartLoading(false);
  };

  const clearCart = () => {
    drinkRef.current?.map((d) => d.clearCart());
  };

  // Modal Control
  const openWrapupModal = () => {
    setShowWrapupModal(true);
  };

  const submitWrapupModal = () => {
    console.warn(drinksList);
  };

  const updateDrinkEndCount = (drink, value) => {
    if (value) {
      const otherDrinks = drinksList.filter((d) => d.id !== drink.id);
      drink.end_count = value;
      setDrinksList(sortDrinkListByName([...otherDrinks, drink]));
    }
  };

  return (
    <>
      <Title title={`Barback`} />
      {isLoading > 0 ? (
        <LargeLoading />
      ) : (
        <>
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
            {cartLoading ? (
              <LoadingIcon />
            ) : (
              <GenericButton
                className="btn-selected"
                iconName="dolly"
                onClick={submitCart}
              />
            )}
          </Section>
        </>
      )}

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

      {showWrapupModal && (
        <Modal
          title="Bar Wrap-up"
          modalContent={
            <StockerWrapupModal
              barData={barInfo}
              drinks={drinksList}
              updateDrinkEndCount={updateDrinkEndCount}
            />
          }
          closeModal={() => setShowWrapupModal(false)}
          submitModal={submitWrapupModal}
        />
      )}
    </>
  );
}

export default StockerOps;
