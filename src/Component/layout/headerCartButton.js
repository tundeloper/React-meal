import React from "react"
import { useEffect, useState } from "react"
import CartIcon from "../Cart/cartIcon"
import classes from './headerCart.module.css'
import CartContext from "../../store/cart-context"

const HeaderCartButton =  (props) => {
   const [btnIsAnimated, setBtnIsAnimated] = useState(false)
   const cartCtx = React.useContext(CartContext)
   const {items} = cartCtx

   const numberfCartItems = items.reduce((curNumber, item) => {
      return curNumber + item.amount
   }, 0)


   const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump : ''}`
   useEffect(() =>{
      if(items.length === 0) {
         return
      }
      setBtnIsAnimated(true)

      const timer = setTimeout(() => {
         setBtnIsAnimated(false)
      }, 300)

      return () => {
         clearTimeout(timer)
      }
   }, [items])

 return <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}><CartIcon/></span>
    {numberfCartItems > 0 && <span className={classes.badge}>{numberfCartItems}</span>}
 </button>
}


export default HeaderCartButton