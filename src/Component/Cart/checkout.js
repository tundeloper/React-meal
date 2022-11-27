import { useRef, useState } from 'react'
import classes from './checkout.module.css'

const Checkout = props => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    })
    const isEmpty = value => value.trim() === ''
    const isFiveChars = value => value.trim().length === 5

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = (e) => {
        e.preventDefault()
        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostal = postalInputRef.current.value
        const enteredCity = cityInputRef.current.value

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredPostalCodeIsValid = isFiveChars(enteredPostal)

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid

        if(!formIsValid) return 

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal
        })

    }
    return <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id="name" ref={nameInputRef}/>
            {!formInputValidity.name && <p className={classes.valid}>Please enter a valid name</p>}
        </div>
        <div className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`}>
            <label htmlFor='street'>Street</label>
            <input type='text' id="street"  ref={streetInputRef}/>
            {!formInputValidity.street && <p className={classes.valid}>Please enter a valid street</p>}
        </div>
        <div className={`${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id="postal" ref={postalInputRef}/>
            {!formInputValidity.postalCode && <p className={classes.valid}>Please enter a valid postal code (5 characters long)</p>}
        </div>
        <div className={`${classes.control} ${formInputValidity.city? '' : classes.invalid}`}>
            <label htmlFor='city'>city</label>
            <input type='text' id="city" ref={cityInputRef} />
            {!formInputValidity.city && <p className={classes.valid}>Please enter a valid city</p>}
        </div>
        <div className={classes.action}>
        <button type='button' onClick={props.onCancel}>Cancle</button>
        <button className={classes.submit} >Confirm</button>
        </div>
    </form>
}

export default Checkout