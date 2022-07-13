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
import PhotoModal from '../components/Modal/PhotoModal'
import asyncActionDto from '../asyncActionDto'

const navigation = [
  { name: 'Tablica', href: '#', current: true },
  { name: 'Kalendarz', href: 'kalendarz', current: false },
  { name: 'O mnie', href: '#', current: false },
]

export async function getServerSideProps() {
  let apiKey = process.env.APIKEY
  return {
    props: {
      apiKey
    }, 
  }
}

export default function Home({apiKey}: any) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [photo, setPhoto] = useState<any>();
  const [forceUpdate, setForceUpdate] = useState<boolean>(false);
  const [type, setType] = useState<TaskType | undefined>(undefined);
  const [asyncAction, setAsyncAction] = useState<asyncActionDto>({show:false, message:'', type:'main'});
  const [success, setSuccess] = useState<boolean>(false);
  const [completedType, setCompletedType] = useState<TaskType | undefined>(undefined);
  const [tasksList, setTasksList] = useState<Tasks[]>([]);
  const [editTask, setEditTask] = useState<Tasks | undefined>(undefined);
  const router = useRouter()
  const { data: session } = useSession({
    required:true,
    onUnauthenticated() {
        router.replace('/api/auth/signin')
    },
  });

  const { data } = useSWR('/api/Tasks/getAllTasks', defaultFetcher);
  const client = createClient(apiKey)

  useEffect(()=>{
    if(data && session){ 
      setTasksList(data)
      setForceUpdate(true)
    }
  },[data])

  const onDelete = (id: string) =>{
    setAsyncAction({show:true, message:'Usuwanie zadania...', type:'main'})
    fetch(`/api/Tasks/deleteTask/${id}`, {
      method:'DELETE',
    }).then(()=>{
      setAsyncAction({...asyncAction, message:'Zadanie zostało usunięte', type:'success'})
      mutate('/api/Tasks/getAllTasks').then(()=>setAsyncAction({...asyncAction, show:false}))
    })
  }

  useEffect(()=>{
    if(completedType && !photo){
      (async ()=>{
        let photo: any = await client.photos.search({
          per_page:1,
          query:'cute animal',
          page: Math.floor(Math.random()* 500)
        })
        setPhoto(photo.photos[0])
      })();
    }
  },[completedType])

  const onSubmit = (modalData: {id?: string, description: string, type: TaskType}, update: boolean) =>{
    setAsyncAction({...asyncAction, show:true})
    let data:Tasks = {...modalData, userId: (session?.user as any).id, id: modalData.id ? modalData.id :'', done:false}
    fetch(update ?'/api/Tasks/updateTask' :'/api/Tasks/addTask', {
      method:update ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(()=>{
      setAsyncAction({...asyncAction, show:false})
      setSuccess(true)
      mutate('/api/Tasks/getAllTasks')
        .then(()=>{
          setSuccess(false)
      })
    })
  }

  const onComplete = (task: Tasks) => {
    let allTaskOfType = tasksList.filter(item => item.type === task.type)
    setAsyncAction({show:true, type:'main', message:'Zmiana statusu zadania...'})
    fetch(`/api/Tasks/completeTask/${task.id}`, {method:'PUT'})
      .then(res=> res.json())
      .then(data => {
      setAsyncAction({...asyncAction, type:'success', message:'Zadanie zostało ukończone'})
        mutate('/api/Tasks/getAllTasks').then(()=> setAsyncAction({...asyncAction, show:false}))
        if(allTaskOfType.length === data.completedTasks){
          setCompletedType(task.type)
          fetch(`/api/Tasks/done/${task.type}`, {method:'PUT'})
        }
      })
  }

  return (
    <>
    <Header
      navigation={navigation}
      renderAddButton={true}
      openModal={() => setOpenModal(true)}
      session={session} />
      {asyncAction.show ? <Card css={{position:'fixed', bottom:'$4', right:'$4',bg:`var(--${asyncAction.type})`, w:'30%', minW:'fit-content', mw:'fit-content'}}>
          <Card.Body css={{p:'10px', d:'flex', flexDirection:'row', alignItems:'center'}}>
            {asyncAction.type === 'main' ? <Loading color="primary" textColor="primary" size='sm' /> : null}
            <Text css={{pl:'$4'}} color={asyncAction.type === 'main' ? 'var(--gray)' : 'var(--main)'}>{asyncAction.message}</Text>
          </Card.Body>
    </Card>: null}
    <div style={{ width: '100%', minWidth: '100%', minHeight: '90vh', height:'fit-content', paddingInline: '0' }}>
        <PhotoModal 
          type={completedType} 
          onClose={() => {setCompletedType(undefined); setPhoto(undefined)}} 
          photo={photo}
          onLoadingPhoto={(dto:asyncActionDto) => setAsyncAction(dto)}
          />
        <AddModal
          asyncAction={asyncAction.show}
          visible={openModal}
          onClose={() => {setOpenModal(false); setEditTask(undefined)}}
          onSubmit={onSubmit}
          success={success}
          editEntity={editTask}
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
            onEdit={(task: Tasks) =>{
               setEditTask(task)
               setOpenModal(true)
              }}
            afterForceUpdate={()=> setForceUpdate(false)}/>}
      </div></>
  );
}

Home.auth = true

