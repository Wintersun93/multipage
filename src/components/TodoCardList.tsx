import React from "react";
import { TodoType, ACTIONS, Action } from "../pages/Todo";
import TodoCard from "../components/TodoCard";
import { Card, Col } from "react-bootstrap";

interface props {
  todos: TodoType[];
  dispatch: React.Dispatch<Action>;
  user: string;
}

const TodoCardList: React.FC<props> = ({ todos, dispatch, user }) => {
  return (
    <Card bg={"dark"}>
      {user}
      {todos.map((todo: TodoType) => {
        return (
          <Col key={todo.id}>
            <TodoCard todo={todo} dispatch={dispatch} />
          </Col>
        );
      })}
    </Card>
  );
};

export default TodoCardList;
