import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmoun: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},

  token: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export default CartContext;
