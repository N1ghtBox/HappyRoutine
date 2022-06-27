import { Table, Row, Col, Popover } from "@nextui-org/react";
import { TrashIcon, PencilAltIcon, XIcon, CheckIcon } from '@heroicons/react/outline'
import { IconButton } from "./IconButton";
import { StatusBadge } from "./StatusBadge";
import { Tasks } from "@prisma/client";
import { DeleteTask } from "./DeleteTask";

export const TaskTable = (props: IProps) => {

  const columns = [
    { name: "STATUS", uid: "status" },
    { name: "OPIS", uid: "description" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const sortByDone = (a: Tasks, b: Tasks) =>{
    return a.done === b.done ? 0 : a.done? 1 : -1;
  }

  const renderCell = (task: Tasks, columnKey: any) => {
    const cellValue = (task as any)[columnKey];
    switch (columnKey) {
      case "status":
        if(task.done) return <StatusBadge type={'done'}><CheckIcon height={20} color={'#99f0a5'}/></StatusBadge>
        return <StatusBadge type={'notDone'} onClick={()=> console.log(task.id)}><XIcon height={20} color={'#eb2344'}/></StatusBadge>
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
                <IconButton onClick={() => console.log("Edit user", task.id)}>
                  <PencilAltIcon height={20} fill="#979797" />
                </IconButton>
            </Col>
            <Col css={{ d: "flex" }}>
            <Popover>
              <Popover.Trigger>
                <IconButton>
                    <TrashIcon height={20} fill="#FF0080"/>
                </IconButton>
              </Popover.Trigger>
              <Popover.Content>
                <DeleteTask/>
              </Popover.Content>
            </Popover>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
      <>
      <IconButton css={{position:'absolute', color:'$colors$primaryGray', mt:'1rem', ml:'$5'}} onClick={()=>props.onClose()}>
        <XIcon height={40}/>
      </IconButton>
        <Table
        aria-label="Task list"
        striped
        css={{
          height: "auto",
          minWidth: "80%",
          maxWidth:'80%',
          color:'$colors$primaryGray',
          marginInline:'auto',
        }}
        selectionMode="none"
        shadow={false}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              css={{bg:'$colors$primaryGray', color:'$colors$text'}}
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
              width={column.uid === "actions" || column.uid === "status" ? "10%" : 'auto'}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={props.tasks.sort(sortByDone)}>
          {(item: Tasks) => (
            <Table.Row css={{color:'inherit'}} key={item.id}>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  );
}

interface IProps{
  tasks: Tasks[],
  onClose: () => void
}