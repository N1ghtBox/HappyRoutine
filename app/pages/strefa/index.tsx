import type { NextPage } from 'next'
import styles from '../../styles/Strefa.module.css'
import { getSession } from 'next-auth/react'
import Header from '../../components/Header'

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
    { name: 'Tablica', href: '/', current: false },
    { name: 'Strefa', href: '#', current: true },
    { name: 'O mnie', href: '#', current: false },
  ]

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header navigation={navigation} renderAddButton={false}/>
    </div>
  )
}

export default Home
