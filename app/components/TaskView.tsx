import { Table, Text } from '@nextui-org/react';
import { Tasks } from '@prisma/client';
import { useMediaQuery } from '../lib/_helpers/_mediaQuery';
import styles from '../styles/Task.module.css'
import { capitalizeFirstLetter } from './Modal/AddModal';

export const TaskView = (props: IProps) => {
    const done = props.tasks.filter((item: any) => item.done).length || 0;
    const max = props.tasks.length || 1;

    const getColorOfBall = (text: string) => {
        let color = text.split(' ')[text.split(' ').length -2]
        if(color[0] === '$') return `var(--nextui-colors-${color.slice(1)})`
        return color
    }

    const isSm = useMediaQuery(650);

    const style = {'--clr':getColorOfBall(props.color), '--num':( done / max *100).toString()} as React.CSSProperties;
    return (
        <div className={styles.card} >
            <div style={{width:'100%', paddingBlock:'5px', borderBottom:'1px solid var(--lighter-main)', backgroundColor:'var(--darker-main)'}}>
                <Text
                    h1
                    size={'3vmax'}
                    css={{
                        textGradient: props.color,
                        textAlign:'center'
                    }}  
                    weight="bold"
                    >
                    {capitalizeFirstLetter(props.type)}
                    </Text>
            </div>
                <div style={{justifyContent:'flex-end'}}>
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
                    {!isSm ? 
                        <Table
                        compact
                        lined
                        headerLined
                        shadow={false}
                        aria-label="Example static compact collection table"
                        css={{
                            height: "auto",
                            textAlign:'center',
                            maxWidth:'100%',
                            p:'0'
                        }}
                        containerCss={{width:'80%', overflow:'hidden', maxWidth:'80%'}}>
                        <Table.Header>
                            <Table.Column css={{textAlign:'center', fontSize:'2vmin'}}>Zadania</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                props.tasks.slice(0,3).map((item, index)=>{
                                    if(index !== 2) return (<Table.Row key={item.id}>
                                        <Table.Cell css={{maxWidth:'200px'}}>{item && item.description.length > 25 ? item.description.slice(0,21) + '...' : item.description}</Table.Cell>
                                    </Table.Row>);

                                    return (<Table.Row key={item.id}>
                                        <Table.Cell>{`... i ${props.tasks.length - 2} więcej`}</Table.Cell>
                                    </Table.Row>);
                                })
                            }
                        </Table.Body>
                    </Table>
                     : null}
                </div>
        </div>
    )
}

interface IProps{
    color: string,
    type: string,
    tasks: Tasks[],
}