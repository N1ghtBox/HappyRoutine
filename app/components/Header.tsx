import { signOut } from 'next-auth/react'
import { Avatar, Button, Card, Container, Grid, Link, Row, Spacer, Text } from '@nextui-org/react'
import { Image } from "@nextui-org/react";
import { LogoutIcon, PlusIcon } from '@heroicons/react/outline'
import styles from '../styles/Home.module.css'

interface IProps{
  navigation:{name: string, href:string, current: boolean}[],
  renderAddButton: boolean,
  openModal?: () => void;
  session: any;
}

const Active = {backgroundColor:'$colors$primaryLightHover'}

const MockLogo = () => {
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

  return (
    <Container fluid css={{mw:'100%', px:'0'}}>
      <Card css={{ $$cardColor: '$colors$primaryGray', br: 0 }}>
        <Card.Body>
          <Row justify="center" align="center">
          <Grid.Container gap={2} justify="center">
            <Grid xs={4} css={{p:'0'}} justify='flex-start' alignItems='center'>
              <MockLogo />
              {
                props.navigation.map(item => (
                  <div style={{height:'fit-content', display:'flex'}} key={`${item.name} ${item.href}`}>
                    <Spacer x={2}/>
                    <Link href={item.href} css={item.current ? Active : {}}  className={styles.link}>
                      {item.name}
                    </Link>
                  </div>
                ))
              }
            </Grid>
            <Spacer x={2} />
            <Grid xs={4} css={{p:'0', oy:'hidden' }} justify='flex-end'alignItems='center'>
              {props.renderAddButton ? <><Button
                key={'buttonKey'}
                auto
                icon={<PlusIcon height={25}/>}
                css={{bg:'$colors$primary', py:'3px'}}
                onClick={()=>props.openModal!()}
                >Add new</Button>
              <Spacer x={1} key={'spacerKey'}/></> : null}

              <Avatar
                zoomed
                squared
                src={props.session?.user?.image || ''}
              />
              <Spacer x={1}/>
              <Button
                rounded
                auto
                icon={<LogoutIcon height={35}/>}
                css={{backgroundColor:'transparent'}}
                onClick={() => signOut()}
              />
            </Grid>
          </Grid.Container>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}