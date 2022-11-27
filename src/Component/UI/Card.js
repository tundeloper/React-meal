import classes from './card.module.css'

const Card = (props) => {
    return (<div className={classes.card}>{props.children}</div>)
}
export default Card