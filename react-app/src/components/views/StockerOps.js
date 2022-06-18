import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../Title";
import { closeBar, getOpenBar } from "../../api/data/openBars-data";
import { Break, ColumnSection, Section } from "../generics/StyledComponents";
import BackButton from "../buttons/BackButton";
import GenericButton from "../generics/GenericButton";
import BarSignoutButton from "../buttons/BarSignoutButton";
import StockerDrink from "../listables/StockerDrink";
import {
  deleteStockedDrinks,
  getStockedDrinks,
} from "../../api/data/stockedDrinks-data";
import Modal from "../generics/Modal";
import StockerWrapupModal from "../modal-content/StockerWrapupModal";
import LargeLoading from "../generics/LargeLoading";
import LoadingIcon from "../generics/LoadingIcon";
import { sortDrinkListByName } from "../generics/HelperFunctions";
import {
  createBarSalesRecord,
  createDrinkSalesRecord,
} from "../../api/records/salesRecords-data";

function StockerOps() {
  const navigate = useNavigate();
  const { barID } = useParams();

  const [isLoading, setIsLoading] = useState(2);
  const [cartLoading, setCartLoading] = useState(false);
  const [barSubmitLoading, setBarSubmitLoading] = useState(false);

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

  const submitWrapupModal = async () => {
    setBarSubmitLoading(true);
    setIsLoading(true);

    // Create bar record
    const barRecordObj = {
      Store_Id: barInfo.store_id,
      Bar_Id: parseInt(barID),
      Bar_Date: barInfo.bar_date,
      Floor: barInfo.floor,
      Server_Name: barInfo.server_name || "NA",
      Stocker_Name: barInfo.stocker_name || "NA",
    };
    createBarSalesRecord(barRecordObj);

    // Create sales records for each drink
    const drinkSalesRecords = [];
    drinksList.forEach((d) => {
      const soldCount = barInfo.stocker_only
        ? d.start_count + d.add_count - d.end_count
        : d.sold_count;
      const drinkRecordObj = {
        drink_name: d.drink_name,
        drink_type: d.drink_type,
        drink_price: d.price,
        number_sold: soldCount,
        bar_id: parseInt(barID),
      };
      drinkSalesRecords.push(drinkRecordObj);
    });
    drinkSalesRecords.forEach((dsr) => createDrinkSalesRecord(dsr));

    // Delete the Open Bar and its Stocked Drinks
    await Promise.all([deleteStockedDrinks(barID), closeBar(barID)]);
    navigate("/barselect");
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
      {isLoading ? (
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
          closeModal={() => {
            if (!barSubmitLoading) {
              setShowWrapupModal(false);
            } else {
              // navigate("/barselect");
            }
          }}
          submitModal={() => {
            if (!barSubmitLoading) submitWrapupModal();
          }}
          submitIcon={barSubmitLoading ? "spinner fa-spin" : "check"}
        />
      )}
    </>
  );
}

export default StockerOps;
