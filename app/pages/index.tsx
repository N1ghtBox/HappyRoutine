import Header from '../components/Header'
import { TaskView } from '../components/TaskView'
import { getSession, useSession } from 'next-auth/react'
import { Button, Container } from '@nextui-org/react'
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

  return (
    <Container css={{w:'100%', mw:'100%', mh:'100vh', oy:'hidden', px:'0'}}>
      <AddModal 
        visible={openModal} 
        onClose={()=>setOpenModal(false)}
        onSubmit={onSubmit}/>
      <Header
        navigation={navigation}
        renderAddButton={true}
        openModal={() => setOpenModal(true)}
        session={session}/>
      <div style={{display:'flex', width:'80vw', height:'100vh', justifyContent:'space-evenly', alignItems:'center', marginInline:'auto'}}>
        <TaskView color={'#f00'} type={TaskType.daily} tasks={tasksList.filter(item=> item.type === TaskType.daily)}/>
        <TaskView color={'#0f0'} type={TaskType.weekly} tasks={tasksList.filter(item=> item.type === TaskType.weekly)}/>
        <TaskView color={'#00f'} type={TaskType.monthly} tasks={tasksList.filter(item=> item.type === TaskType.monthly)}/>
      </div>
    </Container>
  )
}

export default Home
