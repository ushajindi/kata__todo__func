import React, { ChangeEvent, useState } from "react";
import { TodoElement } from "../../App.tsx";
type PropsType = {
  setTodos: React.Dispatch<React.SetStateAction<TodoElement[]>>;
  TodoTimer: (id: string | number, action: "PLAY" | "CLEAR") => void;
};
type NewTodoType = {
  newTodo: string;
  min: string | number;
  sec: string | number;
};

function TodoInput({ setTodos, TodoTimer }: PropsType) {
  const [newTodoState, setNewTodoState] = useState<NewTodoType>({
    newTodo: "",
    min: "",
    sec: "",
  });

  const onChangeNewTodo = (
    e: ChangeEvent<HTMLInputElement>,
    action: "TODO" | "MIN" | "SEC",
  ) => {
    const REG = /^(?:[1-9]|[1-4]\d|5[0-9]|)$/.test(e.target.value);
    switch (action) {
      case "TODO": {
        setNewTodoState((prevState) => ({
          ...prevState,
          newTodo: e.target.value,
        }));
        break;
      }

      case "MIN": {
        if (REG) {
          setNewTodoState((prevState) => ({
            ...prevState,
            min: e.target.value,
          }));
        }
        break;
      }
      case "SEC": {
        if (REG) {
          setNewTodoState((prevState) => ({
            ...prevState,
            sec: e.target.value,
          }));
        }
        break;
      }
      default:
        break;
    }
  };
  const onPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (
      (newTodoState.newTodo != "" &&
        newTodoState.newTodo != " " &&
        newTodoState.sec) ||
      newTodoState.min
    ) {
      if (e.key === "Enter") {
        const ID = Math.random() * 360;
        setTodos((prevState: TodoElement[]) => {
          return [
            {
              id: ID,
              todo: newTodoState.newTodo,
              task: "Active",
              edit: false,
              dateCreated: new Date(),
              min: Number(newTodoState.min),
              sec: Number(newTodoState.sec),
              timerId: null,
            },
            ...prevState,
          ];
        });
        setNewTodoState({ newTodo: "", min: "", sec: "" });
        TodoTimer(ID, "PLAY");
      }
    }
  };
  return (
    <form onKeyPress={onPress} className="new-todo-form">
      <input
        name="todo"
        value={newTodoState.newTodo}
        onChange={(e) => {
          onChangeNewTodo(e, "TODO");
        }}
        className="new-todo"
        placeholder="What needs to be done?"
      />
      <input
        value={newTodoState.min}
        name="min"
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        onChange={(e) => {
          onChangeNewTodo(e, "MIN");
        }}
      />
      <input
        value={newTodoState.sec}
        name="sec"
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        onChange={(e) => {
          onChangeNewTodo(e, "SEC");
        }}
      />
    </form>
  );
}

export default TodoInput;
