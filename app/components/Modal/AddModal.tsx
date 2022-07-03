import { Modal, Button, Text, Input, Dropdown, useInput, Card, Spacer, Loading } from "@nextui-org/react";
import { BookmarkIcon } from '@heroicons/react/outline'
import { EmojiHappyIcon } from '@heroicons/react/solid'
import { Tasks, TaskType } from "@prisma/client";
import { useState, useEffect, useMemo } from "react";

interface IProps{
    visible: boolean;
    onClose: () => void;
    onSubmit: (modalData: {description: string, type: TaskType, id?: string}, update:boolean) => void
    selectedType?: TaskType,
    success: boolean
    asyncAction: boolean
    editEntity?: Tasks
}

const Types = [
    {key:'daily', name:'Daily'},
    {key:'weekly', name:'Weekly'},
    {key:'monthly', name:'Monthly'},
    {key:'yearly', name:'Yearly'},
]

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export default function AddModal(props: IProps) {
    const [selected, setSelected] = useState<string>('Typ');
    const [isValid, setValid] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editId, setEditId] = useState<string>('');

    const {
        value: description,
        setValue: setDescription,
        bindings,
    } = useInput('')

    useEffect(() => {
      if(props.selectedType) setSelected(props.selectedType)
      if(!props.visible) restartDataWitDelay(300)
    }, [props.selectedType, props.visible])

    const selectedValue = useMemo(
      () => Array.from(selected).join(""),
      [selected]);

    useEffect(()=>{
        if(!description) return setValid(false)
        if(!selectedValue || selectedValue === 'Typ') return setValid(false)
        return setValid(true)
    },[description, selectedValue]) //eslintreact-hooks/exhaustive-deps

    useEffect(() => {
        if(showSuccess && !props.success){
          setShowSuccess(false)
          restartDataWitDelay(100)
          props.onClose()
        }
        if(props.success){
          setShowSuccess(true)
        }
    }, [props.success])

    const restartDataWitDelay = (delay: number) =>{
      setTimeout(()=>{
        setSelected('Typ')
        setDescription('')
        setEditId('')
        setEditMode(false)
      }, delay)
    }

    useEffect(() => {
      if(props.editEntity){
        setDescription(props.editEntity.description)
        setSelected(props.editEntity.type)
        setEditId(props.editEntity.id)
        setEditMode(true)
      }
    }, [props.editEntity])
    

  return (
    <div>
      <Modal
        blur
        closeButton
        aria-labelledby="modal-title"
        open={props.visible}
        onClose={() => {props.onClose(); }}
      >
        {showSuccess ? <Card css={{position:'fixed', bottom:'$4', right:'$4', w:'30%', bg:'$colors$success', minW:'fit-content', mw:'fit-content'}}>
            <Card.Body css={{p:'10px', d:'flex', flexDirection:'row', alignItems:'center'}}>
              <Text style={{color:'var(--main)', textAlign:'right', opacity:'0.6', paddingInline:'10px', display:'flex', alignItems:'center'}}>{editMode ? 'Zadanie zostało zaktualizowane' :'Zadanie zostało dodane'}<Spacer x={1}/> <EmojiHappyIcon height={20} color={'var(--main)'}/></Text>
            </Card.Body>
          </Card> : null}
        {props.asyncAction ? <Card css={{position:'fixed', bottom:'$4', right:'$4', w:'30%', bg:'var(--main)', minW:'fit-content', mw:'fit-content'}}>
            <Card.Body css={{p:'10px', d:'flex', flexDirection:'row', alignItems:'center'}}>
              <Loading color="primary" textColor="primary" size='sm' />
              <Text css={{pl:'$4'}}>{editMode ? 'Aktualizowanie' :'Dodawanie'}</Text>
            </Card.Body>
          </Card> : null}
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {editMode ? 'Edytuj' : 'Dodaj'}
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
            onClick={()=>{props.onSubmit({description:description, type: selectedValue as any,id: editId},editMode)}}>
            {editMode ? 'Edytuj' : 'Dodaj'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
