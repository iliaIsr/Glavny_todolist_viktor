import {EditableSpan} from "./common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, removeTodolistAC, TodolistType} from "./model/todolists-reducer";
import {useDispatch} from "react-redux";

type PropsType={
    todolist:TodolistType
}
export const TodolistTitle=({todolist}:PropsType)=>{

    const { title, id } = todolist

    const dispatch=useDispatch()
    const updateTodolistHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id,title}))
    }
    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }

    return (
        <>
            <div className={"todolist-title-container"}>
                <h3><EditableSpan value={todolist.title} onChange={updateTodolistHandler}/></h3>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </>
    )
}