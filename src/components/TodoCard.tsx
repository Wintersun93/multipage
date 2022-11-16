import React, { useState } from "react";
import { TodoType, ACTIONS, Action } from "../pages/Todo";
import { Button, Card } from "react-bootstrap";

interface Props {
  todo: TodoType;
  dispatch: React.Dispatch<Action>;
}

const TodoCard: React.FC<Props> = ({ todo, dispatch }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  return (
    <>
      <Card
        bg={todo.isComplete ? "secondary" : "light"}
        text="dark"
        className="mb-4"
      >
        <Card.Header
          style={{ cursor: "pointer" }}
          className=""
          onClick={() => {
            if (!todo.isComplete) setEdit(!edit);
            if (edit)
              dispatch({
                type: ACTIONS.EDIT_DESCRIPTION,
                payload: {
                  id: todo.id,
                  name: todo.name,
                  description: description,
                },
              });
          }}
        >
          {" "}
          <Card.Title className="d-flex justify-content-between align-items-baseline">
            <span className="fs-2">{todo.name}</span>
            <span
              className={
                todo.isComplete
                  ? "fw-light text-decoration-line-through"
                  : "fw-light"
              }
            >
              Edit me!
            </span>
            <span className={todo.isComplete ? "" : "text-muted"}>
              {todo.date}
            </span>
          </Card.Title>
        </Card.Header>
        <Card.Body className="d-flex flex-column">
          <Card.Text className="w-100 cursor">
            {edit ? (
              <textarea
                rows={4}
                className="w-100"
                value={description}
                placeholder="Das ist die Beschreibung des Todo's"
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : todo.isComplete ? (
              <s>{todo.description}</s>
            ) : (
              <div>{todo.description}</div>
            )}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-baseline">
          <Button
            variant={todo.isComplete ? "primary" : "success"}
            onClick={() =>
              dispatch({
                type: ACTIONS.TOGGLE_TODO,
                payload: { id: todo.id, name: todo.name },
              })
            }
          >
            Completed
          </Button>
          <Button
            onClick={() =>
              dispatch({
                type: ACTIONS.CHANGE_USER,
                payload: {
                  id: todo.id,
                  name: todo.userName,
                  description: todo.description,
                },
              })
            }
            variant="info"
          >
            Switch User
          </Button>
          <Button
            onClick={() =>
              dispatch({
                type: ACTIONS.DELETE_TODO,
                payload: { id: todo.id, name: todo.name },
              })
            }
            variant="danger"
          >
            Delete
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default TodoCard;
