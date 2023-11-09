import { useState } from "react";
import TodoInput from "./Components/TodoInput/TodoInput.tsx";
import TodoList from "./Components/TodoList/TodoList.tsx";
import TodoFilter from "./Components/TodoFilter/TodoFilter.tsx";
import "./App.css";

export type FilterType = "All" | "Active" | "Completed";
export type TodoElement = {
  todo: string;
  task: "Completed" | "Active";
  edit: boolean;
  id: number | string;
  dateCreated: Date;
  min: number;
  sec: number;
  timerId: any;
};

const App = () => {
  const [todos, setTodos] = useState<TodoElement[]>([]);
  const [filter, setFilter] = useState<FilterType>("All");
  const TodoTimer = (id: number | string, action: "PLAY" | "CLEAR") => {
    switch (action) {
      case "PLAY": {
        const timerId = setInterval(() => {
          setTodos((prevState) => {
            return prevState.map((el) => {
              if (el.id == id) {
                if (el.min === 0 && el.sec === 0) {
                  return el;
                }
                if (el.min > 0 && el.sec > 0) {
                  return {
                    ...el,
                    sec: el.sec - 1,
                    timerId,
                  };
                }
                if (el.min > 0 && el.sec === 0) {
                  return {
                    ...el,
                    min: el.min - 1,
                    sec: 59,
                    timerId,
                  };
                }
                if (el.min === 0 && el.sec > 0) {
                  return {
                    ...el,
                    sec: el.sec - 1,
                    timerId,
                  };
                }
              }
              return el;
            });
          });
        }, 1000);
        break;
      }
      case "CLEAR": {
        setTodos((prevState) => {
          return prevState.map((el) => {
            if (el.id === id) {
              return {
                ...el,
                timerId: null,
              };
            }
            return el;
          });
        });
        break;
      }
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoInput TodoTimer={TodoTimer} setTodos={setTodos} />
      </header>
      <section className="main">
        <TodoList
          TodoTimer={TodoTimer}
          filter={filter}
          todos={todos}
          setTodos={setTodos}
        />
        <TodoFilter
          todos={todos}
          setTodos={setTodos}
          filter={filter}
          setFilter={setFilter}
        />
      </section>
    </section>
  );
};
export default App;
