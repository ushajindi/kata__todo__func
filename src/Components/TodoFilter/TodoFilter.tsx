import {filterType, todoElement} from "../../App.tsx";
import React from "react";

type propsType={
    filter:filterType,
    setFilter:React.Dispatch<React.SetStateAction<filterType>>,
    todos:todoElement[],
    setTodos:React.Dispatch<React.SetStateAction<todoElement[]>>
}
function TodoFilter({filter,setFilter,todos,setTodos}:propsType) {
    const onClearCompliteTodos=()=>{
        setTodos((prevTodos)=>{
            return prevTodos.filter(el=>{
                return el.task !== "Completed";

            })
        })
    }
    const selectedFilter=(filter:filterType)=>{
        setFilter(filter)
    }
    return (
        <footer className="footer">
            <span className="todo-count">{
                todos.reduce((acc,item)=>{
                    if (item.task==="Completed") return ++acc
                    return acc
                },0)
            } items left</span>
            <ul className="filters">
                {["All","Active","Completed"].map((el:string)=>{
                    if(el===filter){
                        return (<li key={el}>
                            <button className="selected">{el}</button>
                        </li>)
                    }else{
                        return (<li key={el}>
                            <button onClick={()=>{
                                selectedFilter(el as filterType)
                            }}>{el}</button>
                        </li>)
                    }
                })}
            </ul>
            <button onClick={()=>{onClearCompliteTodos()}} className="clear-completed">Clear completed</button>
        </footer>
    );
}

export default TodoFilter;