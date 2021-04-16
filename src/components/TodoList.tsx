import * as React from "react";
import { Button, Input, Flex, Checkbox, Heading } from "@chakra-ui/react";
import { useTodos } from './../store';
function TodoListItems() {
  const { todos, toggle, update, remove } = useTodos();

  return (
    <>
      {todos.map((todo) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox
            checked={todo.done}
            onChange={() => toggle(todo.id)}
          />
          <Input mx={2} value={todo.text}
            onChange={(evt) => update(todo.id, evt.target.value)}
          />
          <Button onClick={() => remove(todo.id)}>Delete</Button>
        </Flex>
      ))}
    </>
  );
}

function TodoList() {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </>
  );
}

export default TodoList;
