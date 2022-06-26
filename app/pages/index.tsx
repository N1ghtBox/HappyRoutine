import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react'
import { Container} from '@nextui-org/react'
import AddModal from '../components/Modal/AddModal'
import { useEffect, useState } from 'react'
import { Tasks, TaskType } from '@prisma/client'
import { createClient } from 'pexels'
import prisma from '../lib/prisma'
import TaskViewList from '../components/TaskViewList'
import TaskTable from '../components/TaskTable/TaskTable'

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
  },[]) //eslintreact-hooks/exhaustive-deps

  const fetchNewTasks = () => {
    fetch('/api/getAllTasks',{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      }).then((res) => res.json())
      .then((data)=>setTasksList(data))
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

        {/* <TaskViewList TaskList={tasksList} loading={loading}/> */}
        <TaskTable tasks={tasksList}/>
      </Container>
  );
}

export default Home
