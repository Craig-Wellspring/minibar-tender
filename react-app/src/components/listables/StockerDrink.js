import React, { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ColumnSection, Section } from "../generics/StyledComponents";

const DrinkCard = styled(ColumnSection)`
  padding: 8px 15px;
  border: 1px solid white;
  border-radius: 4px;
`;

const DrinkName = styled(Section)`
  white-space: nowrap;

  text-align: center;
  font-size: 24px;
`;

const CartControls = styled(Section)`
  gap: 6px;
`;

const Cart = styled(Section)`
  height: 1.8em;
  width: 5em;
  border-radius: 4px;
  border: 1px solid white;
  font-size: 24px;
`;

const CartButton = styled.button`
  height: 2em;
  width: 2em;
  border: 0;
  border-radius: 50%;
  align-self: center;
  text-align: center;
  font-size: 20px;
`;

const StockerDrink = forwardRef(({ drinkData }, ref) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCart = (change) => {
    setCartCount(cartCount + change);
  };

  const clearCart = () => {
    setCartCount(0);
  };

  useImperativeHandle(ref, () => ({
    clearCart() {
      clearCart();
    },
  }));

  return (
    <DrinkCard>
      <DrinkName>{drinkData.drink_name}</DrinkName>
      <CartControls>
        <CartButton
          type="button"
          className="btn-danger"
          onClick={() => {
            updateCart(-drinkData.package_count);
          }}
        >
          {-drinkData.package_count}
        </CartButton>
        <CartButton
          type="button"
          className="btn-danger"
          onClick={() => {
            updateCart(-1);
          }}
        >
          -1
        </CartButton>
        <Cart>
          {drinkData.start_count + drinkData.add_count - drinkData.sold_count}{" "}
          {cartCount !== 0 && (
            <Section style={{ gap: "2px" }}>
              (
              {
                <div
                  style={cartCount >= 0 ? { color: "green" } : { color: "red" }}
                >
                  {cartCount > 0 ? "+" : ""}
                  {cartCount}
                </div>
              }
              )
            </Section>
          )}
        </Cart>
        <CartButton
          type="button"
          className="btn-selected"
          onClick={() => {
            updateCart(1);
          }}
        >
          +1
        </CartButton>
        <CartButton
          type="button"
          className="btn-selected"
          onClick={() => {
            updateCart(drinkData.package_count);
          }}
        >
          +{drinkData.package_count}
        </CartButton>
      </CartControls>
    </DrinkCard>
  );
});

StockerDrink.propTypes = {
  drinkData: PropTypes.shape().isRequired,
};

export default StockerDrink;
