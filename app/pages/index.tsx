import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import { TaskView } from '../components/TaskView'
import { getSession } from 'next-auth/react'

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

  return {
    props: { session }
  }
}

const navigation = [
  { name: 'Tablica', href: '#', current: true },
  { name: 'Strefa', href: 'strefa', current: false },
  { name: 'O mnie', href: '#', current: false },
]

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header navigation={navigation} renderAddButton={true}/>
      <div style={{display:'flex', width:'80vw', height:'100vh', justifyContent:'space-evenly', alignItems:'center', marginInline:'auto'}}>
        <TaskView color={'#f00'} done={5} max={7} type={'Dzienne'}/>
        <TaskView color={'#0f0'} done={4} max={10} type={'Tygodniowe'}/>
        <TaskView color={'#00f'} done={1} max={3} type={'Miesięczne'}/>
      </div>
    </div>
  )
}

export default Home
