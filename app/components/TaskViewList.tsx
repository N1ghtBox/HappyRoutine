import { Grid, Loading, Text } from "@nextui-org/react"
import { Tasks, TaskType } from "@prisma/client"
import { TaskView } from "./TaskView"



const TaskViewList = (props:IProps) =>{
    const getTasksWithType= (type: TaskType) =>{
        return props.TaskList.filter(item=> item.type === type)
    }

    return( <Grid.Container gap={6} justify={'center'} alignContent='center' css={{marginInline:'auto', width:'95vw', minHeight:'calc(100vh - 72px)', maxHeight:'fit-content'}}>
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
          {getTasksWithType(TaskType.daily).length ? <Grid xs={8} sm={5} lg={3} justify='center' onClick={() => props.onSelect(TaskType.daily)}>
                <TaskView color={"45deg, $blue600 -20%, $pink600 50%"} type={TaskType.daily} tasks={getTasksWithType(TaskType.daily)}/>
          </Grid> : null}
          {getTasksWithType(TaskType.weekly).length ? <Grid xs={8} sm={5} lg={3} justify='center' onClick={() => props.onSelect(TaskType.weekly)}>
                <TaskView color={"45deg, $purple600 -20%, $pink600 100%"} type={TaskType.weekly} tasks={getTasksWithType(TaskType.weekly)}/>
          </Grid> : null}
          {getTasksWithType(TaskType.monthly).length ? <Grid xs={8} sm={5} lg={3} justify='center' onClick={() => props.onSelect(TaskType.monthly)}>
                <TaskView color={"45deg, $yellow600 -20%, $red600 100%"} type={TaskType.monthly} tasks={getTasksWithType(TaskType.monthly)}/>
          </Grid> : null}
          {getTasksWithType(TaskType.yearly).length ? <Grid xs={8} sm={5} lg={3} justify='center' onClick={() => props.onSelect(TaskType.yearly)}>
                <TaskView color={"45deg, $yellow600 -20%, $red600 100%"} type={TaskType.yearly} tasks={getTasksWithType(TaskType.yearly)}/>
          </Grid> : null}
        </Grid.Container>)
}

export default TaskViewList;
interface IProps{
    TaskList: Tasks[]
    loading: boolean,
    onSelect: (type:TaskType) => void
}