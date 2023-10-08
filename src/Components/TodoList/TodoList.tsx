import Todo from "../Todo/Todo.tsx";
import {filterType, todoElement} from "../../App.tsx";
import React, {useState} from "react";

type propsType={
    todos:todoElement[],
    setTodos:React.Dispatch<React.SetStateAction<todoElement[]>>,
    filter:filterType
}


function TodoList({todos,setTodos,filter}:propsType) {
    const [updateTodo,setUpdateTodo]=useState("")

    const onUpdateTodo=(e:React.KeyboardEvent<HTMLInputElement>,id:string|number)=>{
        if (e.key==="Enter"){
            setTodos((prevState:todoElement[])=>{
                return prevState.map(el=>{
                    if(id===el.id){
                        return {...el,todo:updateTodo,edit:false}
                    }
                    return el
                })
            })
        }
    }
    const onBlurTodo=(id:string|number)=>{
        if(todos.length!=0){
            setTodos((prevState)=>{
                return prevState.map((el)=>{
                    setUpdateTodo("")
                    if(el.id===id) return {...el,edit:false,todo:updateTodo}
                    return el
                })
            })
        }
    }
    const onEdit=(id:string | number)=>{
        if(todos.length!=0){
            setTodos((prevState:todoElement[])=>{
                return prevState.map((el: todoElement) => {
                    if (el.id === id && !el.edit) {
                        setUpdateTodo(el.todo)
                        return {...el, edit: true} as todoElement
                    } else return {...el,edit:false}
                })
            })
        }

    }
    const onRemove=(id:string | number)=>{
        if(todos.length!=0){
            setTodos((prevState:todoElement[])=>{
                return prevState.filter((el) => el.id != id)
            })
        }
    }
    const onCompleted=(id:string | number)=>{
        if(todos.length!=0){
            setTodos((prevState:todoElement[])=>{
                return prevState.map((el) => {
                    if (el.id === id) {
                        switch (el.task) {
                            case "Active": {
                                return {...el, task: "Completed"} as todoElement
                            }
                            case "Completed": {
                                return {...el, task: "Active"} as todoElement
                            }
                            default:
                                return el
                        }
                    } else return el
                })
            })
        }
    }
    return (
        <ul className="todo-list">
            {
                todos.map((el)=>{
                    if(filter==="All") return <Todo onUpdateTodo={onUpdateTodo} updateTodo={updateTodo} setUpdateTodo={setUpdateTodo} key={el.id} onBlurTodo={onBlurTodo} onEdit={onEdit} onRemove={onRemove} onCompleted={onCompleted} element={el}/>
                    if(filter==="Active"&&el.task==="Active") return <Todo onUpdateTodo={onUpdateTodo} updateTodo={updateTodo} setUpdateTodo={setUpdateTodo} key={el.id} onBlurTodo={onBlurTodo} onEdit={onEdit} onRemove={onRemove} onCompleted={onCompleted} element={el}/>
                    if (filter==="Completed"&&el.task==="Completed") return <Todo onUpdateTodo={onUpdateTodo} updateTodo={updateTodo} setUpdateTodo={setUpdateTodo} key={el.id} onBlurTodo={onBlurTodo} onEdit={onEdit} onRemove={onRemove} onCompleted={onCompleted} element={el}/>
                })
            }
        </ul>
    );
}

export default TodoList;