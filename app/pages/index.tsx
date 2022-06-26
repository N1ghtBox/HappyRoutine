import Header from '../components/Header'
import { TaskView } from '../components/TaskView'
import { getSession, useSession } from 'next-auth/react'
import { Container, Grid, Loading, Text } from '@nextui-org/react'
import AddModal from '../components/Modal/AddModal'
import { useEffect, useState } from 'react'
import { Tasks, TaskType } from '@prisma/client'
import { createClient } from 'pexels'
import prisma from '../lib/prisma'

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  if (!session ) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  const tasks = await prisma.tasks.findMany({where:{userId:(session.user as any).id}})

  let apiKey = process.env.APIKEY;
  return {
    props: {
      session,
      apiKey,
      tasks
    }
  }
}

const navigation = [
  { name: 'Tablica', href: '#', current: true },
  { name: 'Strefa', href: 'strefa', current: false },
  { name: 'O mnie', href: '#', current: false },
]

const Home = ({apiKey, tasks}: any) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [tasksList, setTasksList] = useState<Tasks[]>([]);
  const { data: session } = useSession();
  const client = createClient(apiKey);


  const onSubmit = (modalData: {description: string, type: TaskType}): boolean =>{
    let data:Tasks = {...modalData, userId: (session?.user as any).id, id: '', done:false}
    fetch('/api/addTask',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((e)=>fetchNewTasks())
    .catch(()=>{
      return false
    })
    return true
  }

  useEffect(()=>{
    if(!tasks) return
    setTasksList(tasks)
    setLoading(false)
  },[])

  const fetchNewTasks = () => {
    fetch('/api/getAllTasks',{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      }).then((res) => res.json())
      .then((data)=>setTasksList(data))
  }

  const getTasksWithType= (type: TaskType) =>{
    return tasksList.filter(item=> item.type === type)
  }

  return (
      <Container css={{w:'100%', mw:'100%', mh:'100vh', px:'0'}}>
        <AddModal 
          visible={openModal} 
          onClose={()=>setOpenModal(false)}
          onSubmit={onSubmit}/>
        <Header
          navigation={navigation}
          renderAddButton={true}
          openModal={() => setOpenModal(true)}
          session={session}/>

        <Grid.Container gap={6} justify={'center'} alignContent='center' css={{marginInline:'auto', width:'95vw', minHeight:'calc(100vh - 72px)', maxHeight:'fit-content'}}>
          {loading ? <Grid xs={1}>
            <Loading color="primary" textColor="primary" size='lg'>
              Ładowanie
            </Loading>
          </Grid> : null}
          {tasksList.length === 0  && !loading ? <Grid xs={8} sm={5} lg={3} justify='center'>
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
          {getTasksWithType(TaskType.daily).length ? <Grid xs={8} sm={5} lg={3} justify='center'>
                <TaskView color={"45deg, $blue600 -20%, $pink600 50%"} type={TaskType.daily} tasks={getTasksWithType(TaskType.daily)}/>
          </Grid> : null}
          {getTasksWithType(TaskType.weekly).length ? <Grid xs={8} sm={5} lg={3} justify='center'>
                <TaskView color={"45deg, $purple600 -20%, $pink600 100%"} type={TaskType.weekly} tasks={getTasksWithType(TaskType.weekly)}/>
          </Grid> : null}
          {getTasksWithType(TaskType.monthly).length ? <Grid xs={8} sm={5} lg={3} justify='center'>
                <TaskView color={"45deg, $yellow600 -20%, $red600 100%"} type={TaskType.monthly} tasks={getTasksWithType(TaskType.monthly)}/>
          </Grid> : null}
          {getTasksWithType(TaskType.yearly).length ? <Grid xs={8} sm={5} lg={3} justify='center'>
                <TaskView color={"45deg, $yellow600 -20%, $red600 100%"} type={TaskType.yearly} tasks={getTasksWithType(TaskType.yearly)}/>
          </Grid> : null}
        </Grid.Container>
      </Container>
  );
}

export default Home
