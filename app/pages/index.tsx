import Header from '../components/Header'
import { useSession } from 'next-auth/react'
import { Container} from '@nextui-org/react'
import AddModal from '../components/Modal/AddModal'
import { useEffect, useState } from 'react'
import { Tasks, TaskType } from '@prisma/client'
import { createClient } from 'pexels'
import TaskViewList from '../components/TaskViewList'
import { TaskTable } from '../components/TaskTable/TaskTable'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import { defaultFetcher } from '../defaultFetcher'
import { NextPage } from 'next'

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
  const [success, setSuccess] = useState<boolean>(true);
  const [tasksList, setTasksList] = useState<Tasks[]>([]);
  const router = useRouter()
  const { data: session } = useSession({
    required:true,
    onUnauthenticated() {
        router.replace('/api/auth/signin')
    },
  });
  const { data, error } = useSWR('/api/Tasks/getAllTasks', defaultFetcher, {revalidateIfStale:true});

  useEffect(()=>{
    if(data && session) setTasksList(data)
  },[data])

  const onSubmit = (modalData: {description: string, type: TaskType}) =>{
    let data:Tasks = {...modalData, userId: (session?.user as any).id, id: '', done:false}
    fetch('/api/Tasks/addTask', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((e)=>{
      setSuccess(true)
      mutate('/api/Tasks/getAllTasks')
        .then(()=>{
          setSuccess(false)
      })
    })
  }

  return (
    <>
    <Header
      navigation={navigation}
      renderAddButton={true}
      openModal={() => setOpenModal(true)}
      session={session} />
    <div style={{ width: '100%', minWidth: '100%', minHeight: '90vh', height:'fit-content', paddingInline: '0' }}>
        <AddModal
          visible={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={onSubmit}
          success={success}
          selectedType={type} />
        {!type ?
          <TaskViewList TaskList={tasksList} loading={!!!data} onSelect={(type: TaskType) => setType(type)} /> :
          <TaskTable tasks={tasksList.filter(item => item.type === type)} onClose={() => setType(undefined)} />}
      </div></>
  );
}

Home.auth = true

export default Home
