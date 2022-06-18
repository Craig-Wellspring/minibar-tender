import React, { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ColumnSection, Section } from "../generics/StyledComponents";
import { updateStockedDrink } from "../../api/data/stockedDrinks-data";

const DrinkCard = styled(ColumnSection)`
  padding: 8px 15px;
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
  width: 5em;
  height: 44px;
  font-size: 22px;
`;

const CartButton = styled.button`
  height: 2.2em;
  width: 2.2em;
  border-radius: 50%;
  align-self: center;
  text-align: center;
  font-size: 20px;
`;

const CartCount = styled.div`
  white-space: nowrap;
`;

const StockerDrink = forwardRef(({ drinkData }, ref) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCart = (change) => {
    setCartCount(cartCount + change);
  };

  const clearCart = () => {
    setCartCount(0);
  };

  const submitCart = async () => {
    if (cartCount !== 0) {
      await updateStockedDrink(
        drinkData.id,
        "add_count",
        cartCount + drinkData.add_count
      );
      drinkData.add_count += cartCount;
      clearCart();
    }
  };

  useImperativeHandle(ref, () => ({
    clearCart() {
      clearCart();
    },
    submitCart() {
      submitCart();
    },
  }));

  return (
    <DrinkCard className="big-bordered">
      <DrinkName>{drinkData.drink_name}</DrinkName>
      <CartControls>
        <CartButton
          type="button"
          className="btn-danger"
          onClick={() => {
            updateCart(
              drinkData.package_count === 1 ? -2 : -drinkData.package_count
            );
          }}
        >
          -{drinkData.package_count === 1 ? 2 : drinkData.package_count}
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
        <Cart className="bordered background">
          {drinkData.start_count + drinkData.add_count - drinkData.sold_count}{" "}
          {cartCount !== 0 && (
            <Section style={{ gap: "2px" }}>
              (
              {
                <CartCount
                  className={cartCount >= 0 ? "green-text" : "red-text"}
                >
                  {cartCount > 0 ? "+" : ""}
                  {cartCount}
                </CartCount>
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
            updateCart(
              drinkData.package_count === 1 ? 2 : drinkData.package_count
            );
          }}
        >
          +{drinkData.package_count === 1 ? 2 : drinkData.package_count}
        </CartButton>
      </CartControls>
    </DrinkCard>
  );
});

StockerDrink.propTypes = {
  drinkData: PropTypes.shape().isRequired,
};

export default StockerDrink;
