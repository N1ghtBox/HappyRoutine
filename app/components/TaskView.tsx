import styles from '../styles/Task.module.css'

export const TaskView= (props: IProps) => {

    const style = {'--clr':props.color, '--num':(props.done / props.max *100).toString()} as React.CSSProperties;
    return (
        <div className={styles.card}>
            <div className={styles.percent} style={style}>
                <div className={styles.dot}></div>
                <svg>
                    <circle cx={'70'} cy={'70'} r={'70'}></circle>
                    <circle cx={'70'} cy={'70'} r={'70'}></circle>
                </svg>
                <div className={styles.amount}>
                    <h2>{props.done} / {props.max}</h2>
                    <p style={{margin:'0'}}>{props.type}</p>
                </div>
            </div>
        </div>
    )
}

interface IProps{
    color: string,
    done: number,
    max: number,
    type: string,
}