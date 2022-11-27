import React from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  token: null,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updtedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updtedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    if (action.type === "CLEAR") {
      return defaultCartState;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "IN") {
    console.log(action.token);
    return {
      token: action.token,
    };
  }

  if (action.type === "OUT") {
    return {
      token: null,
    };
  }

  return defaultCartState;
};

const CartPovider = (props) => {
  const [cartState, dispatchCartAction] = React.useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemtoCart = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };

  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const userisLoggedIn = !!cartState.token;

  const loginHandler = (token) => {
    dispatchCartAction({ type: "IN", token: token });
  };
  const logOUTHandler = () => {
    dispatchCartAction({ type: "OUT" });
  };
  // console.log(userisLoggedIn)

  const cartValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemtoCart,
    removeItem: removeItemFromCart,
    clearCart: clearCartHandler,

    token: cartState.token,
    isLoggedIn: userisLoggedIn,
    login: loginHandler,
    logout: logOUTHandler,
  };

  return (
    <CartContext.Provider value={cartValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartPovider;
