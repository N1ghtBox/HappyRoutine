import { Grid, Loading, Text } from "@nextui-org/react"
import { Tasks, TaskType } from "@prisma/client"
import { TaskView } from "./TaskView"
import styles from '../styles/Task.module.css'


const TaskViewList = (props:IProps) =>{
    const getTasksWithType= (type: TaskType) =>{
        return props.TaskList.filter(item=> item.type === type)
    }

    const gradients: string[] = [
      "45deg, #fdfc47 -20%, #24fe41 100%",
      "45deg, $blue600 -20%, $pink600 100%",
      "45deg, #b3ffab -20%, #12fff7 100%",
      "45deg, $yellow600 -20%, $red600 100%",
    ]

    return( <Grid.Container gap={6} justify={'center'} alignContent='center' css={{marginInline:'auto', width:'95vw', minHeight:'calc(100vh - 72px)', maxHeight:'fit-content'}} className={styles.scaleUp}>
          {props.loading ? <Grid xs={1}>
            <Loading color="primary" textColor="primary" size='lg'>
              Ładowanie
            </Loading>
          </Grid> : null}
          {props.TaskList.length === 0  && !props.loading ? <Grid xs={8} sm={5} lg={3} justify='center'>
                <Text
                      h1
                      size={'2.5rem'}
                      css={{
                          textGradient: "45deg, $blue600 -20%, $pink600 50%",
                          textAlign:'center'
                      }}
                      weight="bold"
                      >
                      Dodaj pierwsze zadanko, żeby rozpocząć :)
                      </Text></Grid> : null}
            {
            Object.values(TaskType).map((type, index) => (
                  getTasksWithType(type).length ? <Grid xs={8} sm={5} lg={3} justify='center' onClick={() => props.onSelect(type)} key={index}>
                  <TaskView color={gradients[index]} type={type} tasks={getTasksWithType(type)}/>
                  </Grid> : null
                  ))
            }
        </Grid.Container>)
}

export default TaskViewList;
interface IProps{
    TaskList: Tasks[],
    loading: boolean,
    onSelect: (type:TaskType) => void,
}