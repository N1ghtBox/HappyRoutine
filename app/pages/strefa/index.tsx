import type { NextPage } from 'next'
import styles from '../../styles/Strefa.module.css'
import { getSession, useSession } from 'next-auth/react'
import Header from '../../components/Header'

const navigation = [
    { name: 'Tablica', href: '/', current: false },
    { name: 'Strefa', href: '#', current: true },
    { name: 'O mnie', href: '#', current: false },
  ]

const Home = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <Header navigation={navigation} renderAddButton={false} session={session}/>
    </div>
  )
}

Home.auth = true

export default Home
