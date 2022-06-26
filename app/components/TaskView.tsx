import { Table, Text } from '@nextui-org/react';
import { Tasks } from '@prisma/client';
import { useMediaQuery } from '../pages/_helpers/_mediaQuery';
import styles from '../styles/Task.module.css'
import { capitalizeFirstLetter } from './Modal/AddModal';

export const TaskView = (props: IProps) => {
    const done = props.tasks.filter((item: any) => item.done).length || 0;
    const max = props.tasks.length || 1;

    const getColorOfBall = (text: string) => {
        let color = text.split(' ')[text.split(' ').length -2].slice(1)
        return `var(--nextui-colors-${color})`
    }

    const isSm = useMediaQuery(650);


    const style = {'--clr':getColorOfBall(props.color), '--num':( done / max *100).toString()} as React.CSSProperties;
    return (
        <div className={styles.card} >
            <div style={{width:'100%', paddingBlock:'5px', borderBottom:'1px solid var(--lighter-main)', backgroundColor:'var(--darker-main)'}}>
                <Text
                    h1
                    size={'2.5rem'}
                    css={{
                        textGradient: props.color,
                        textAlign:'center'
                    }}  
                    weight="bold"
                    >
                    {capitalizeFirstLetter(props.type)}
                    </Text>
            </div>
                <div style={{justifyContent: isSm? 'center': 'flex-end',}}>
                <div></div>
                    <div className={styles.percent} style={style}>
                        <div className={styles.dot}></div>
                        <svg version="1.1" viewBox="0 0 150 150" preserveAspectRatio="xMinYMin meet">
                            <circle cx={'70'} cy={'70'} r={'70'}></circle>
                            <circle cx={'70'} cy={'70'} r={'70'}></circle>
                        </svg>
                        <div className={styles.amount}>
                            <h2>{done} / {max}</h2>
                        </div>
                    </div>
                    {!isSm ? <>
                        <Table
                        compact
                        aria-label="Example static compact collection table"
                        css={{
                            height: "auto",
                            minWidth: "80%",
                        }}
                        className={styles.table}
                    >
                        <Table.Header>
                            <Table.Column>Opis</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                props.tasks.slice(0,2).map(item=>(
                                    <Table.Row key={item.id}>
                                        <Table.Cell>{item && item.description.length > 30 ? item.description.slice(0,28) + '...' : item.description}</Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                                </> : null}
                </div>
        </div>
    )
}

interface IProps{
    color: string,
    type: string,
    tasks: Tasks[],
}