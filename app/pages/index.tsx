import Header from '../components/Header'
import { useSession } from 'next-auth/react'
import AddModal from '../components/Modal/AddModal'
import { useEffect, useState } from 'react'
import { Tasks, TaskType } from '@prisma/client'
import { createClient } from 'pexels'
import TaskViewList from '../components/TaskViewList'
import { TaskTable } from '../components/TaskTable/TaskTable'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import { defaultFetcher } from '../defaultFetcher'
import { Card, Loading, Text } from '@nextui-org/react'

const navigation = [
  { name: 'Tablica', href: '#', current: true },
  { name: 'Strefa', href: 'strefa', current: false },
  { name: 'O mnie', href: '#', current: false },
]



const Home = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [forceUpdate, setForceUpdate] = useState<boolean>(false);
  const [type, setType] = useState<TaskType | undefined>(undefined);
  const [photo, setPhoto] = useState<any>();
  const [asyncActionInProgress, setAsyncActionInProgress] = useState<boolean>(false);
  const [asyncActionText, setAsyncActionText] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [tasksList, setTasksList] = useState<Tasks[]>([]);
  const router = useRouter()
  const { data: session } = useSession({
    required:true,
    onUnauthenticated() {
        router.replace('/api/auth/signin')
    },
  });

  const { data } = useSWR('/api/Tasks/getAllTasks', defaultFetcher);

  useEffect(()=>{
    if(data && session){ 
      setTasksList(data)
      setForceUpdate(true)
    }
  },[data])

  const onDelete = (id: string) =>{
    setAsyncActionInProgress(true)
    setAsyncActionText('Usuwanie zadania...')
    fetch(`/api/Tasks/deleteTask/${id}`, {
      method:'DELETE',
    }).then(()=>{
      mutate('/api/Tasks/getAllTasks').then(()=>setAsyncActionInProgress(false))
    })
  }


  const onSubmit = (modalData: {description: string, type: TaskType}) =>{
    let data:Tasks = {...modalData, userId: (session?.user as any).id, id: '', done:false}
    fetch('/api/Tasks/addTask', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(()=>{
      setSuccess(true)
      mutate('/api/Tasks/getAllTasks')
        .then(()=>{
          setSuccess(false)
      })
    })
  }

  const onComplete = (id: string) => {
    setAsyncActionInProgress(true)
    setAsyncActionText('Zmiana statusu zadania...')
    fetch(`/api/Tasks/completeTask/${id}`, {method:'PUT',})
      .then(()=>{
      mutate('/api/Tasks/getAllTasks')
      setAsyncActionInProgress(false)
    })
  }

  return (
    <>
    <Header
      navigation={navigation}
      renderAddButton={true}
      openModal={() => setOpenModal(true)}
      session={session} />
      {asyncActionInProgress ? <Card css={{position:'fixed', bottom:'$4', right:'$4', w:'30%', bg:'var(--main)', minW:'fit-content', mw:'fit-content'}}>
          <Card.Body css={{p:'10px', d:'flex', flexDirection:'row', alignItems:'center'}}>
            <Loading color="primary" textColor="primary" size='sm' />
            <Text css={{pl:'$4'}}>{asyncActionText}</Text>
          </Card.Body>
    </Card>: null}
    <div style={{ width: '100%', minWidth: '100%', minHeight: '90vh', height:'fit-content', paddingInline: '0' }}>
        <AddModal
          visible={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={onSubmit}
          success={success}
          selectedType={type} />
        {!type ?
          <TaskViewList 
            TaskList={tasksList} 
            loading={!!!data} 
            onSelect={(type: TaskType) => setType(type)} /> : 
          <TaskTable 
            tasks={tasksList.filter(item => item.type === type)} 
            onClose={() => setType(undefined)} 
            onTaskDelete={onDelete} 
            onComplete={onComplete}
            forceUpdate={forceUpdate}
            afterForceUpdate={()=> setForceUpdate(false)}/>}
      </div></>
  );
}

Home.auth = true

export default Home
