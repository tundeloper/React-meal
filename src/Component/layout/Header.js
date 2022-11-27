import mealsImage from "../../assets/meals2.png";
import classes from "./header.module.css";
import HeaderCartButton from "./headerCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReacteMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious foods" />
      </div>
    </>
  );
};

export default Header;
