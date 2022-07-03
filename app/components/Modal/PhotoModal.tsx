import { Button, Card, Col, Modal, Row, Text, Link } from "@nextui-org/react";
import { TaskType } from "@prisma/client";
import { useEffect, useState } from "react";

interface IProps{
    onClose: () => void,
    type: TaskType | undefined
    photo: any,
}

export default function PhotoModal(props: IProps) {
    const [photo, setPhoto] = useState<any>();

    useEffect(()=>{
        if(props.photo && !photo){
            fetch(props.photo.src.original)
            .then(res => res.blob())
            .then( blob =>{
                let response = URL.createObjectURL(blob)
                setPhoto(response)
            })
        }

    },[props.photo])

    return(
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={!!props.type && !!photo}
            onClose={() => props.onClose()}
            css={{pt:'0px', maxWidth:'40vw'}}
            className={'roundedButton'}
        >
        <Card css={{ w: "100%"}}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
                <Text size={16} weight="bold" transform="uppercase" color="#ffffff" css={{textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black", letterSpacing:'4px'}} >
                Congratulations
                </Text>
                <Text h2 color="black" css={{textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"}}>
                {`You have finished your ${props.type ? props.type : ''} tasks`}
                </Text>
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
