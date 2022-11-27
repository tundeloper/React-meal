import style from './loading.module.css'

const Loading = (props) => {
    return <div className={`${style.loader} ${props.className}`} />
}

export default Loading