import React, { useRef, useState, useReducer, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import TodoCardList from "../components/TodoCardList";

export interface TodoType {
  id: number;
  name: string;
  description: string;
  isComplete: boolean;
  date: string;
  userName: string;
}

export interface UserType {
  id: number;
  name: string;
  amount: number;
  completed: number;
}

export type Action = {
  type: string;
  payload: {
    id?: number;
    name: string;
    description?: string;
    userName?: string;
  };
};

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  EDIT_DESCRIPTION: "edit-description",
  CHANGE_USER: "change-user",
};

const reducer = (todos: TodoType[], action: Action): any => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    case ACTIONS.EDIT_DESCRIPTION:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, description: action.payload.description };
        }
        return todo;
      });
    case ACTIONS.CHANGE_USER:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            userName: todo.userName === "Fabrizio" ? "Eva" : "Fabrizio",
          };
        }
        return todo;
      });
  }
};

const newTodo = (todo: string): TodoType => {
  return {
    id: Date.now(),
    name: todo,
    description: "",
    isComplete: false,
    date: new Date().toLocaleString("de-De"),
    userName: "Fabrizio",
  };
};

const Todo: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [todo, setTodo] = useState<string>("");
  const [todos, dispatch] = useReducer(reducer, []);
  const [query, setQuery] = useState<string>("");
  const [userQuery, setUserQuery] = useState<string>("");

  const filteredTodosFabrizio: TodoType[] = todos.filter(
    (todo: TodoType) =>
      todo.name.toLowerCase().includes(query.toLowerCase()) &&
      todo.userName === "Fabrizio"
  );

  const filteredTodosEva: TodoType[] = todos.filter(
    (todo: TodoType) =>
      todo.name.toLowerCase().includes(query.toLowerCase()) &&
      todo.userName === "Eva"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: todo } });
    setTodo("");
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (searchRef.current !== null) {
      searchRef.current.value = "";
    }
  };

  const userSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (userRef.current !== null) {
      userRef.current.value = "";
    }
  };

  return (
    <Container>
      <Row md={1} xs={1} lg={6} className="">
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            placeholder="Add Todo"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          ></input>
        </form>
        <form onSubmit={onSubmit}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={searchRef}
            placeholder="Search Todo..."
            type="search"
          ></input>
        </form>
        <form onSubmit={userSubmit}>
          <input
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            ref={userRef}
            placeholder="Search User.."
            type="search"
          ></input>
        </form>
      </Row>

      <Row md={1} xs={1} lg={2} className="g-4">
        <Col>
          <TodoCardList
            todos={filteredTodosFabrizio}
            dispatch={dispatch}
            user={"Fabrizio"}
          />
        </Col>
        <Col>
          <TodoCardList
            todos={filteredTodosEva}
            dispatch={dispatch}
            user={"Eva"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Todo;
