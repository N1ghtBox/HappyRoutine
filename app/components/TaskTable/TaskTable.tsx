import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline'
import { IconButton } from "./IconButton";
import { StatusBadge } from "./StatusBadge";
import { Tasks } from "@prisma/client";

const TaskTable = (props: IProps) => {

  const columns = [
    { name: "STATUS", uid: "status" },
    { name: "OPIS", uid: "description" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (task: Tasks, columnKey: any) => {
    const cellValue = task[columnKey];
    
    switch (columnKey) {
      case "status":
        return <StatusBadge type={task.done ? 'done' : 'notDone'}>{task.done ? 'done' : 'notDone'}</StatusBadge>;
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit user">
                <IconButton onClick={() => console.log("Edit user", task.id)}>
                  <PencilAltIcon height={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => console.log("Delete user", task.id)}
              >
                <IconButton>
                    <TrashIcon height={20} fill="#FF0080"/>
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "80%",
        maxWidth:'80%',
      }}
      selectionMode="none"
      shadow={false}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
            width={column.uid === "actions" || column.uid === "status" ? "10%" : 'auto'}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={props.tasks}>
        {(item: Tasks) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
export default TaskTable;

interface IProps{
  tasks: Tasks[]
}
