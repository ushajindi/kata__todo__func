import React, {ChangeEvent, useState} from "react";
import {todoElement} from "../../App.tsx";
type propsType={
    setTodos:React.Dispatch<React.SetStateAction<todoElement[]>>
}

function TodoInput({setTodos}:propsType) {
    const [newTodo,setNewTodo]=useState("")

    const onChangeNewTodo=(e:ChangeEvent<HTMLInputElement>)=>{
        setNewTodo(e.target.value)
    }

    const onPress=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(newTodo!=""&& newTodo!=" "){
            if(e.key==="Enter"){
                setTodos((prevState:todoElement[])=>{
                    return [{id:Math.random()*360,todo:newTodo,task:"Active",edit:false},...prevState]
                })
                setNewTodo("")
            }
        }
    }
    return (
        <>
            <input onKeyPress={onPress} value={newTodo} onChange={onChangeNewTodo} className="new-todo" placeholder="What needs to be done?" autoFocus/>
        </>

    );
}


export default TodoInput