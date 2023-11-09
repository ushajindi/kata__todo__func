import React, { useState } from "react";
import Todo from "../Todo/Todo.tsx";
import { FilterType, TodoElement } from "../../App.tsx";

type PropsType = {
  TodoTimer: (id: number | string, action: "PLAY" | "CLEAR") => void;
  todos: TodoElement[];
  setTodos: React.Dispatch<React.SetStateAction<TodoElement[]>>;
  filter: FilterType;
};

function TodoList({ todos, setTodos, filter, TodoTimer }: PropsType) {
  const [updateTodo, setUpdateTodo] = useState("");
  const onUpdateTodo = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string | number,
  ) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      setTodos((prevState: TodoElement[]) => {
        return prevState.map((el) => {
          if (id === el.id) {
            return { ...el, todo: updateTodo, edit: false };
          }
          return el;
        });
      });
    }
  };
  const onBlurTodo = (id: string | number) => {
    if (todos.length != 0) {
      setTodos((prevState) => {
        return prevState.map((el) => {
          setUpdateTodo("");
          if (el.id === id) return { ...el, edit: false, todo: updateTodo };
          return el;
        });
      });
    }
  };
  const onEdit = (id: string | number) => {
    if (todos.length != 0) {
      setTodos((prevState: TodoElement[]) => {
        return prevState.map((el: TodoElement) => {
          if (el.id === id && !el.edit) {
            setUpdateTodo(el.todo);
            return { ...el, edit: true } as TodoElement;
          } else return { ...el, edit: false };
        });
      });
    }
  };
  const onRemove = (id: string | number) => {
    if (todos.length != 0) {
      setTodos((prevState: TodoElement[]) => {
        return prevState.filter((el) => el.id != id);
      });
    }
  };
  const onCompleted = (id: string | number) => {
    if (todos.length != 0) {
      setTodos((prevState: TodoElement[]) => {
        return prevState.map((el) => {
          if (el.id === id) {
            switch (el.task) {
              case "Active": {
                return { ...el, task: "Completed" } as TodoElement;
              }
              case "Completed": {
                return { ...el, task: "Active" } as TodoElement;
              }
              default:
                return el;
            }
          } else return el;
        });
      });
    }
  };
  return (
    <ul className="todo-list">
      {todos.map((el) => {
        if (filter === "All")
          return (
            <Todo
              TodoTimer={TodoTimer}
              onUpdateTodo={onUpdateTodo}
              updateTodo={updateTodo}
              setUpdateTodo={setUpdateTodo}
              key={el.id}
              onBlurTodo={onBlurTodo}
              onEdit={onEdit}
              onRemove={onRemove}
              onCompleted={onCompleted}
              element={el}
            />
          );
        if (filter === "Active" && el.task === "Active")
          return (
            <Todo
              TodoTimer={TodoTimer}
              onUpdateTodo={onUpdateTodo}
              updateTodo={updateTodo}
              setUpdateTodo={setUpdateTodo}
              key={el.id}
              onBlurTodo={onBlurTodo}
              onEdit={onEdit}
              onRemove={onRemove}
              onCompleted={onCompleted}
              element={el}
            />
          );
        if (filter === "Completed" && el.task === "Completed")
          return (
            <Todo
              TodoTimer={TodoTimer}
              onUpdateTodo={onUpdateTodo}
              updateTodo={updateTodo}
              setUpdateTodo={setUpdateTodo}
              key={el.id}
              onBlurTodo={onBlurTodo}
              onEdit={onEdit}
              onRemove={onRemove}
              onCompleted={onCompleted}
              element={el}
            />
          );
      })}
    </ul>
  );
}

export default TodoList;
