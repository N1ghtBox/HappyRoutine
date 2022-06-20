import { signOut, useSession } from 'next-auth/react'
import { Card, Container, Grid, Row, Spacer, Text } from '@nextui-org/react'
import { Image } from "@nextui-org/react";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

interface IProps{
  navigation:{name: string, href:string, current: boolean}[],
  renderAddButton: boolean,
}

const MockItem = () => {
  return (
    <Card css={{ h: "$14", $$cardColor: 'transparent', width:'fit-content'}}>
      <Card.Body css={{oy:'hidden', justifyContent:'center', alignItems:'center',p:'0'}} >
        <Image
          width={70}
          height={70}  
          src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
          alt="Default Image"
          objectFit="cover"
        />
      </Card.Body>
    </Card>
  );
};

export default function Header(props: IProps) {
  const { data: session, status } = useSession();

  return (
    <Container fluid css={{mw:'100%', px:'0'}}>
      <Card css={{ $$cardColor: '$colors$primaryGray', br: 0 }}>
        <Card.Body>
          <Row justify="center" align="center">
          <Grid.Container gap={2} justify="center">
            <Grid xs={4} css={{p:'0'}} justify='space-evenly'>
              <MockItem />
              <MockItem />
              <MockItem />
              <MockItem />
            </Grid>
            <Spacer x={2} />
            <Grid xs={4} css={{p:'0', oy:'hidden' }} justify='flex-end'>
              <MockItem />
            </Grid>
          </Grid.Container>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}