import { Tasks } from '@prisma/client';
import styles from '../styles/Task.module.css'

export const TaskView = (props: IProps) => {

    const style = {'--clr':props.color, '--num':(props.tasks.filter(item => item.done).length / props.tasks.length *100).toString()} as React.CSSProperties;
    return (
        <div className={styles.card}>
            <div className={styles.percent} style={style}>
                <div className={styles.dot}></div>
                <svg>
                    <circle cx={'70'} cy={'70'} r={'70'}></circle>
                    <circle cx={'70'} cy={'70'} r={'70'}></circle>
                </svg>
                <div className={styles.amount}>
                    <h2>{props.tasks.filter(item => item.done).length} / {props.tasks.length}</h2>
                    <p style={{margin:'0'}}>{props.type}</p>
                </div>
            </div>
        </div>
    )
}

interface IProps{
    color: string,
    type: string,
    tasks: Tasks[],
}