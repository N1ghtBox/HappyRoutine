import { signOut, useSession } from 'next-auth/react'
import styles from '../styles/Home.module.css'
import { Card, Container, Row, Text } from '@nextui-org/react'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface IProps{
  navigation:{name: string, href:string, current: boolean}[],
  renderAddButton: boolean,
}

export default function Header(props: IProps) {
  const { data: session, status } = useSession();

  return (
    <Container fluid>
      <Card css={{ $$cardColor: '$colors$primaryGray' }}>
        <Card.Body>
          <Row justify="center" align="center">
            <Text h6 size={15} color="white" css={{ m: 0 }}>
              NextUI gives you the best developer experience with all the features
              you need for building beautiful and modern websites and
              applications.
            </Text>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}