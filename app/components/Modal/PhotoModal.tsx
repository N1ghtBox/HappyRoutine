import { Button, Card, Col, Modal, Row, Text, Link } from "@nextui-org/react";
import { TaskType } from "@prisma/client";
import { useEffect, useState } from "react";
import asyncActionDto from "../../asyncActionDto";
import { useMediaQuery } from "../../lib/_helpers/_mediaQuery";

interface IProps{
    onClose: () => void,
    type: TaskType | undefined
    photo: any,
    onLoadingPhoto: (dto: asyncActionDto) => void
}

export default function PhotoModal(props: IProps) {
    const [photo, setPhoto] = useState<any>();
    const isSm = useMediaQuery(650);
    const isMd = useMediaQuery(1000);

    useEffect(()=>{
        if(props.photo && !photo){
            props.onLoadingPhoto({show:true, message:'Loading photo...', type:'main'})
            fetch(props.photo.src.original)
            .then(res => res.blob())
            .then( blob =>{
                let response = URL.createObjectURL(blob)
                setPhoto(response)
                props.onLoadingPhoto({show:false, message:'', type:'main'})
            })
        }

    },[props.photo])

    return(
        <Modal
            closeButton
            width={isSm? '90%' :isMd ? '60%' : '40%'}
            aria-labelledby="modal-title"
            open={!!props.type && !!photo}
            onClose={() => props.onClose()}
            css={{pt:'0px', maxH:'80vh'}}
            className={'roundedButton'}
            
        >
        <Card css={{ w: "100%"}}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
                <Text weight="bold" transform="uppercase" color="#ffffff" css={{textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", letterSpacing:'4px'}} >
                Congratulations
                </Text>
                {!(!isSm && isMd) ? <Text h2 color="black" css={{textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"}}>
                {`You have finished your ${props.type ? props.type : ''} tasks`}
                </Text> : null}
            </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
            <Card.Image
                src={photo ? photo : ''}
                width="100%"
                height="100%"
                objectFit="cover"
                alt="Cute animal"
            />
            </Card.Body>
            <Card.Footer
            isBlurred
            css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
            }}
            >
            <Row>
                <Col css={{textAlign:'left', pl:'15px'}}>
                <Text color="#000" size={12}>
                    {`Author: ${props.photo ? props.photo.photographer : ''}`}
                </Text>
                <Link 
                    target='_blank'
                    href={props.photo ? props.photo.photographer_url : ''}>
                Check out other photos
                </Link>
                </Col>
                <Col>
                <Row justify="flex-end">
                    <Button flat auto rounded css={{bg:'#05a081'}}>
                    <Link
                        href={'https://www.pexels.com'}
                        style={{color:'white'}}
                        target='_blank'
                        >
                        Pexels
                    </Link>
                    </Button>
                </Row>
                </Col>
            </Row>
            </Card.Footer>
        </Card>
    </Modal>)
}
