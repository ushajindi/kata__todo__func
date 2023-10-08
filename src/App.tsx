import TodoInput from "./Components/TodoInput/TodoInput.tsx";
import TodoList from "./Components/TodoList/TodoList.tsx";
import TodoFilter from "./Components/TodoFilter/TodoFilter.tsx";
import "./App.css"
import {useState} from "react";
export type filterType="All"|"Active"|"Completed"
export type todoElement={
    todo:string,
    task:"Completed"|"Active",
    edit:boolean
    id:number|string
}

let todoData:todoElement[]=[{
    todo:"ahahaha",
    task:"Completed",
    edit:false,
    id:1
},
    {
        todo:"vahahaa",
        task:"Active",
        edit:false,
        id:2
    },
    {
        todo:"uhuhuhu",
        task:"Active",
        edit:false,
        id:3
    }]
const App=()=>{
    const [todos,setTodos]=useState<todoElement[]>(todoData)
    const [filter,setFilter]=useState<filterType>("All")

    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <TodoInput setTodos={setTodos}/>
            </header>
            <section className="main">
                <TodoList filter={filter} todos={todos} setTodos={setTodos}/>
                <TodoFilter todos={todos} setTodos={setTodos}  filter={filter} setFilter={setFilter}/>
            </section>
        </section>
    )
}
export default App