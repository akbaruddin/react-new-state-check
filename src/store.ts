import { createGalactic } from "galactic-state"

// Standard interface and functions
interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// Galactic implementation
const [useTodosList, setTodosList] = createGalactic<Todo[]>([]);
const [useNewTodo] = createGalactic('');

export function load(todos: Todo[]) {
  setTodosList(todos);
}

export function useTodos(){
  const [todos, todosSet] = useTodosList();
  const [newTodo, newTodoSet]= useNewTodo();

  return {
    todos,
    newTodo,
    setNewTodo(text: string) {
      newTodoSet(text);
    },
    add(){
      todosSet(addTodo(todos, newTodo));
      newTodoSet("");
    },
    toggle(id: number){
      todosSet(toggleTodo(todos, id));
    },
    remove(id: number){
      todosSet(removeTodo(todos, id));
    },
    update(id: number, text: string){
      todosSet(updateTodo(todos, id, text));
    }
  }
}

