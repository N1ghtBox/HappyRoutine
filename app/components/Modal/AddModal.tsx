import { Modal, Button, Text, Input, Dropdown, useInput, Card, Spacer } from "@nextui-org/react";
import { BookmarkIcon } from '@heroicons/react/outline'
import { EmojiHappyIcon } from '@heroicons/react/solid'
import { TaskType } from "@prisma/client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

interface IProps{
    visible: boolean;
    onClose: () => void;
    onSubmit: (modalData: {description: string, type: TaskType}) => boolean
}

const Types = [
    {key:'daily', name:'Daily'},
    {key:'weekly', name:'Weekly'},
    {key:'monthly', name:'Monthly'},
    {key:'yearly', name:'Yearly'},
]

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export default function AddModal(props: IProps) {
    const [selected, setSelected] = useState<string>('Typ');
    const [isValid, setValid] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const router = useRouter()

    const {
        value: description,
        setValue: setDescription,
        bindings,
    } = useInput('')

    const selectedValue = useMemo(
      () => Array.from(selected).join(""),
      [selected]);

    useEffect(()=>{
        if(!description) return setValid(false)
        if(!selectedValue || selectedValue === 'Typ') return setValid(false)
        return setValid(true)
    },[description, selectedValue])

    useEffect(() => {
        if(success){
            setTimeout(()=>{
                setSuccess(false)
                props.onClose()
            },2000)
        }
    }, [success])

  return (
    <div>
      <Modal
        blur
        closeButton
        aria-labelledby="modal-title"
        open={props.visible}
        onClose={() => {props.onClose(); setSelected('Typ'); setDescription('')}}
      >
        {success ? <Card css={{position:'fixed', bottom:'$4', right:'$4', w:'30%', bg:'#99f0a5', minW:'fit-content', mw:'fit-content'}}>
          <Card.Body>
            <Text style={{color:'var(--main)', textAlign:'right', opacity:'0.6', paddingInline:'20px', display:'flex', alignItems:'center'}}>Zadanie zostało dodane<Spacer x={1}/> <EmojiHappyIcon height={20} color={'var(--main)'}/></Text>
          </Card.Body>
        </Card> : null}
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Dodaj
            <Text b size={18} css={{pl:'$3', color:'$colors$primary'}}>
                Zadanie
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            {...bindings}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Opis"
            aria-label='description'
            contentLeft={<BookmarkIcon height={15}/>}
          />
        <Dropdown>
            <Dropdown.Button flat css={{bg:'$colors$primaryGray', color:'$colors$text'}}>{capitalizeFirstLetter(selectedValue)}</Dropdown.Button>
            <Dropdown.Menu
                aria-label="Dropdown"
                items={Types}
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected as any}>
                {(item: any) => (
                <Dropdown.Item
                    key={item.key}
                    color={item.key === "delete" ? "error" : "default"}
                >
                    {item.name}
                </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            css={{background:'$colors$primary', color:'$colors$text'}}
            disabled={!isValid}
            onClick={()=>{setSuccess(props.onSubmit({description:description, type: selectedValue as any}))}}>
            Dodaj
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
