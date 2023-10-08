import {todoElement} from "../../App.tsx";
import React, {ChangeEvent} from "react";

type propsType = {
    onEdit: (id: string | number) => void,
    onRemove: (id: string | number) => void,
    onCompleted: (id: string | number) => void,
    onBlurTodo:(id:string|number)=>void,
    element: todoElement,
    updateTodo:string,
    setUpdateTodo:React.Dispatch<React.SetStateAction<string>>
    onUpdateTodo:(e:React.KeyboardEvent<HTMLInputElement>,id:string|number)=>void
}
const Todo=({onEdit, onRemove, onCompleted,onBlurTodo, element: {todo, task, id,edit},updateTodo,setUpdateTodo,onUpdateTodo}: propsType)=> {
    const onChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setUpdateTodo(e.target.value)
    }
    const render = () => {
        const buttons = () => {
            return <>
                <button onClick={() => {
                    onEdit(id)
                }
                } className="icon icon-edit"></button>
                <button
                    onClick={() => {
                        onRemove(id)
                    }
                    }
                    className="icon icon-destroy"></button>
            </>
        }
        const labels=()=>{
            return(
                <label>
                    <span className="description">{todo}</span>
                    <span className="created">created 5 minutes ago</span>
                </label>
            )
        }
        if(edit){
            return (
                <li className="editing">
                    <input onKeyPress={(e)=>{
                        onUpdateTodo(e,id)
                    }} onChange={onChange}  onBlur={()=>{
                        onBlurTodo(id)
                    }}  type="text" className="edit" value={updateTodo}/>
                </li>
            )
        }
        switch (task) {
            case "Active": {
                return (<li key={id}>
                    <div onClick={()=>{onCompleted(id)}} className="view">
                        <input checked={task==="Active"&&false} className="toggle" type="checkbox"/>
                        {labels()}
                        {buttons()}
                    </div>
                </li>)
            }
            case "Completed": {
                return (<li key={id} className="completed">
                    <div onClick={()=>{onCompleted(id)}} className="view">
                        <input checked={task==="Completed"} className="toggle" type="checkbox"/>
                        {labels()}
                        {buttons()}
                    </div>
                </li>)
            }
            default:
                return <></>
        }
    }
    return (
        render()
    );
}

export default Todo;