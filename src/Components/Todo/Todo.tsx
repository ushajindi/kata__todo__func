import { TodoElement } from "../../App.tsx";
import React, { ChangeEvent, useEffect, useState } from "react";
import { dateDistanceNow } from "./helpers/helpers";
type PropsType = {
  TodoTimer: (id: number | string, action: "PLAY" | "CLEAR") => void;
  onEdit: (id: string | number) => void;
  onRemove: (id: string | number) => void;
  onCompleted: (id: string | number) => void;
  onBlurTodo: (id: string | number) => void;
  element: TodoElement;
  updateTodo: string;
  setUpdateTodo: React.Dispatch<React.SetStateAction<string>>;
  onUpdateTodo: (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string | number,
  ) => void;
};
const Todo = ({
  TodoTimer,
  onEdit,
  onRemove,
  onCompleted,
  onBlurTodo,
  element: { todo, task, id, edit, dateCreated, min, sec, timerId },
  updateTodo,
  setUpdateTodo,
  onUpdateTodo,
}: PropsType) => {
  const [dateDistance, setDateDistance] = useState("");
  useEffect(() => {
    setInterval(() => {
      setDateDistance(dateDistanceNow(dateCreated));
    }, 10000);
  }, [dateCreated]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTodo(e.target.value);
  };

  const timerController = (action: "PLAY" | "PAUSE") => {
    switch (action) {
      case "PAUSE": {
        clearInterval(timerId);
        TodoTimer(id, "CLEAR");
        break;
      }
      case "PLAY": {
        if (!timerId) {
          TodoTimer(id, "PLAY");
        }
        break;
      }
      default:
        break;
    }
  };
  const render = () => {
    const buttons = () => {
      return (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
            className="icon icon-edit"
          ></button>
          <button
            onClick={() => {
              clearInterval(timerId);
              onRemove(id);
            }}
            className="icon icon-destroy"
          ></button>
        </>
      );
    };
    const labels = () => {
      return (
        <div className="label">
          <span className="title">{todo}</span>
          <span className="description">
            <button
              onClick={(e) => {
                e.stopPropagation();
                timerController("PLAY");
              }}
              className="icon icon-play"
            ></button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                timerController("PAUSE");
              }}
              className="icon icon-pause"
            ></button>
            {min || 0}:{sec || 0}
          </span>
          <span className="description">
            created {dateDistance || "1 sec"} ago
          </span>
        </div>
      );
    };
    if (edit) {
      return (
        <li className="editing">
          <input
            onKeyPress={(e) => {
              e.stopPropagation();
              onUpdateTodo(e, id);
            }}
            onChange={onChange}
            onBlur={() => {
              onBlurTodo(id);
            }}
            type="text"
            className="edit"
            value={updateTodo}
          />
        </li>
      );
    }
    switch (task) {
      case "Active": {
        return (
          <li key={id}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                onCompleted(id);
              }}
              className="view"
            >
              <input
                checked={task === "Active" && false}
                className="toggle"
                type="checkbox"
              />
              {labels()}
              {buttons()}
            </div>
          </li>
        );
      }
      case "Completed": {
        return (
          <li key={id} className="completed">
            <div
              onClick={(e) => {
                e.stopPropagation();
                onCompleted(id);
              }}
              className="view"
            >
              <input
                checked={task === "Completed"}
                className="toggle"
                type="checkbox"
              />
              {labels()}
              {buttons()}
            </div>
          </li>
        );
      }
      default:
        return <></>;
    }
  };
  return render();
};

export default Todo;
