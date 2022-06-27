import React from "react";
import { Text, Button, Grid, Row } from "@nextui-org/react";

export const DeleteTask = () => {

  return (
    <Grid.Container
      css={{ borderRadius: "14px", padding: "1rem 0", maxWidth: "330px" }}
    >
      <Row justify="center" align="center">
        <Text b>Confirm</Text>
      </Row>
      <Row justify="center">
        <Text>
          Are you sure you want to delete this this ?
        </Text>
      </Row>
      <Grid.Container justify="center" alignContent="center">
        <Grid>
          <Button size="sm" shadow color={'error'}>
            Delete
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};

