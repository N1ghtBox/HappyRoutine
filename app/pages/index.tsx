import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react'
import { Container} from '@nextui-org/react'
import AddModal from '../components/Modal/AddModal'
import { useEffect, useState } from 'react'
import { Tasks, TaskType } from '@prisma/client'
import { createClient } from 'pexels'
import TaskViewList from '../components/TaskViewList'
import { TaskTable } from '../components/TaskTable/TaskTable'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { defaultFetcher } from '../defaultFetcher'

const navigation = [
  { name: 'Tablica', href: '#', current: true },
  { name: 'Strefa', href: 'strefa', current: false },
  { name: 'O mnie', href: '#', current: false },
]



const Home = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [type, setType] = useState<TaskType | undefined>(undefined);
  const [photo, setPhoto] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [tasksList, setTasksList] = useState<Tasks[]>([]);
  const router = useRouter()
  const { data: session } = useSession({
    required:true,
    onUnauthenticated() {
        router.replace('/api/auth/signin')
    },
  });
  const { data, error } = useSWR('/api/getAllTasks', defaultFetcher);

  useEffect(()=>{
    if(data && session) setTasksList(data)
  },[data])

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

  const fetchNewTasks = () => {
    fetch('/api/getAllTasks',{
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      }).then((res) => res.json())
      .then((data)=>setTasksList(data))
  }

  const onSelect = (type: TaskType) =>{
    setType(type)
  }

  return (
      <Container css={{w:'100%', mw:'100%', mh:'100vh', px:'0'}}>
        <AddModal 
          visible={openModal} 
          onClose={()=>setOpenModal(false)}
          onSubmit={onSubmit}
          selectedType={type}/>
        <Header
          navigation={navigation}
          renderAddButton={true}
          openModal={() => setOpenModal(true)}
          session={session}/>

          {!type ? 
            <TaskViewList TaskList={tasksList} loading={!!!data} onSelect={onSelect}/>:
            <TaskTable tasks={tasksList.filter(item => item.type === type)} onClose={() => setType(undefined)}/>
          }
      </Container>
  );
}

Home.auth = true

export default Home
