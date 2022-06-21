import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import { TaskView } from '../components/TaskView'
import { getSession, useSession } from 'next-auth/react'
import { Container } from '@nextui-org/react'
import AddModal from '../components/Modal/AddModal'
import { useState } from 'react'
import { Tasks, TaskType } from '@prisma/client'

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

  let apiKey = process.env.APIKEY;
  return {
    props: {
      session,
      apiKey
    }
  }
}

const navigation = [
  { name: 'Tablica', href: '#', current: true },
  { name: 'Strefa', href: 'strefa', current: false },
  { name: 'O mnie', href: '#', current: false },
]

const Home = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data: session } = useSession();


  const onSubmit = (modalData: {description: string, type: TaskType}): boolean =>{
    let data:Tasks = {...modalData, userId: (session?.user as any).id, id: ''}
    fetch('/api/addTask',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).catch(()=>{
      return false
    })
    return true

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
        <TaskView color={'#f00'} done={5} max={7} type={'Dzienne'}/>
        <TaskView color={'#0f0'} done={4} max={10} type={'Tygodniowe'}/>
        <TaskView color={'#00f'} done={1} max={3} type={'Miesięczne'}/>
      </div>
    </Container>
  )
}

export default Home
