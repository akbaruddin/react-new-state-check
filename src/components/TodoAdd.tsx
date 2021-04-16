import * as React from "react";
import { Button, Input, Grid } from "@chakra-ui/react";

import { useTodos } from "../store";
function TodoAdd() {
  const { add, newTodo, setNewTodo } = useTodos();

  return (
    <Grid pt={2} templateColumns="5fr 1fr" columnGap="3">
      <Input
        placeholder="New todo"
        value={newTodo}
        onChange={(evt) => setNewTodo(evt.target.value)}
        />
      <Button onClick={add}>Add Todo</Button>
    </Grid>
  );
}

export default TodoAdd;
