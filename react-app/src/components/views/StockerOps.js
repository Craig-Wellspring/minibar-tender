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

function StockerOps() {
  const { barID } = useParams();
  const [barInfo, setBarInfo] = useState({});
  const drinkRef = useRef(null);
  const [drinksList, setDrinksList] = useState([]);

  const clearCart = () => {
    console.warn(drinkRef);
    drinkRef.current?.clearCart();
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
  }, []);

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
  }, []);

  return (
    <ColumnSection>
      <Title title={`Barback`} />
      <div>
        Floor: {barInfo.floor} | {String(barInfo.bar_date).substring(5)}
      </div>

      <ColumnSection id="drinks-section">
        {drinksList.length > 0 ? (
          drinksList.map((drink) => (
            <StockerDrink key={drink.id} drinkData={drink} ref={drinkRef} />
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
        />
      </Section>
    </ColumnSection>
  );
}

export default StockerOps;
