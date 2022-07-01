import { signOut } from 'next-auth/react'
import { Avatar, Button, Card, Collapse, Container, Grid, Link, Row, Spacer, Image } from '@nextui-org/react'
import { LogoutIcon, MenuIcon, PlusIcon } from '@heroicons/react/outline'
import styles from '../styles/Home.module.css'
import { useMediaQuery } from '../lib/_helpers/_mediaQuery';

interface IProps{
  navigation:{name: string, href:string, current: boolean}[],
  renderAddButton: boolean,
  openModal?: () => void;
  session: any;
}

const Active = {backgroundColor:'$colors$primaryLightHover'}

const Logo = () => {
  return (
      <Card css={{ $$cardColor: 'transparent', width:'fit-content'}}>
        <Card.Body css={{ justifyContent:'center', alignItems:'center',p:'0'}} >
          <Image
              height={60}
              src={'/Full-logo-white.png'}
              css={{minWidth:'120px'}}/>
        </Card.Body>
      </Card>
  );
};

export default function Header(props: IProps) {
  const isSm = useMediaQuery(960);
  const shouldLogoBeVisible = useMediaQuery(400);

  const getButtonStyles = (isSmall: boolean) =>{
    if(isSmall) return { px:'$4', display:'flex', placeItems:'center', 'span':{mr:'0'}}
    return {}
  }

  return (
    <Container fluid css={{mw:'100%', px:'0', bg:'$colors$primaryGray', py:'$8'}}>
        <Row justify="center" align="center">
          <Grid.Container gap={2} justify="center">
            {!isSm ? <Grid xs={0} sm={5} md={4} css={{p:'0', gap:'15px'}} justify='flex-start' alignItems='center'>
              <Logo />
              {
                props.navigation.map(item => (
                  <div style={{height:'fit-content', display:'flex'}} key={`${item.name} ${item.href}`}>
                    <Link href={item.href} css={item.current ? Active : {}}  className={styles.link}>
                      {item.name}
                    </Link>
                  </div>
                ))
              }
            </Grid>:
            <Grid xs={3} sm={0} css={{p:'0'}} alignItems='center' >
              <Collapse title={<span></span>}
                  css={{p:'0', 'div':{p:'0'}}}
                  showArrow={false}
                  contentLeft={<MenuIcon height={40} style={{marginInline:'15px',padding:'10px', borderRadius:'5px', outline:'1px solid var(--darker-main)'}}/>}>
                  <div style={{paddingTop:'15px'}}>
                  {
                    props.navigation.map(item => (
                      <Link css={{color:'$colors$text', ml:'15px', w:'calc(95vw - 15px)', bg: item.current ? Active.backgroundColor : '', p:'$2', br:'10px'}} href={item.href} key={item.name}>
                        {item.name}
                      </Link>))
                  }
                  </div>
              </Collapse>
            </Grid>}
            {!isSm ? <Spacer x={2} />: !shouldLogoBeVisible ?
              <Image
                height={50}
                src={'/120p-logo.png'}
                css={{minWidth:'120px'}}
                containerCss={{top:'18px !important'}}
                className='center'/>: null
            }
            <Grid xs={9} sm={3} md={4} css={{p:'0', oy:'hidden', pr:isSm?'$6': '0' }} justify={'flex-end'} alignItems={!isSm ? 'center':'flex-start'}>
              {props.renderAddButton ? <><Button
                key={'buttonKey'}
                auto
                icon={<PlusIcon height={25} style={{marginRight:'0'}}/>}
                css={{bg:'var(--pink)', ...getButtonStyles(isSm)}}
                onPress={()=>props.openModal!()}
                >{isSm?'':'Add new'}</Button>
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
    </Container>
  )
}