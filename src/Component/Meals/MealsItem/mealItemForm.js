import classes from './mealItemForm.module.css'
import Input from '../../UI/Input'
import React from 'react'



const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = React.useState(true)
    const amountInputRef = React.useRef()

    const SubmitEvent = (event) => {
        event.preventDefault()
        const enteredAmount = amountInputRef.current.value
        const enteredAmountNumber = +enteredAmount

        if(enteredAmount.trim() === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false)
            return
        }

        props.onAddToCart(enteredAmountNumber)
    }

    return <form className={classes.form } onSubmit={SubmitEvent}>
        <Input label="amount" ref={amountInputRef} input={{
            id: 'amount',
            type: 'number',
            min:  '1',
            max: '5',
            step: 1,
            defaultValue: '1'
        }}/>
        <button>+ Add</button> 
        {!amountIsValid && <p>Please enter valid amount (1-5)</p>}
    </form>
}

export default MealItemForm 