import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import { getSession } from 'next-auth/react'
import { TaskView } from '../components/TaskView'

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
      <Header navigation={navigation}/>
      <div style={{display:'flex', width:'100vw', height:'100vh', justifyContent:'center', alignItems:'center'}}>
        <TaskView color={'#f00'} done={5} max={7} type={'Dzienne'}/>
        <TaskView color={'#0f0'} done={4} max={10} type={'Tygodniowe'}/>
        <TaskView color={'#00f'} done={1} max={3} type={'Miesięczne'}/>
      </div>
    </div>
  )
}

export default Home
