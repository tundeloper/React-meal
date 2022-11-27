import "./index.css";
import Header from "./Component/layout/Header";
import Meals from "./Component/Meals/meals";
import Cart from "./Component/Cart/Cart";
import React from "react";

function App() {
  const [cartIsShowing, serCartIsShowing] = React.useState(false);

  const showCartHandler = () => {
    serCartIsShowing(true);
  };

  const hideCartHnadler = () => {
    serCartIsShowing(false);
  };

  return (
    <>
      {cartIsShowing && <Cart onClose={hideCartHnadler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
