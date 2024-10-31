import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType, TaskType} from "./model/tasks-reducer";
import {TodolistType} from "./model/todolists-reducer";
import {ChangeEvent} from "react";


type PropsType = {
    todolist: TodolistType
    task:TaskType
}
export const Task=({todolist,task}:PropsType)=>{

    const dispatch=useDispatch()


    const removeTaskHandler = () => {
        dispatch(removeTaskAC({ taskId:task.id, todolistId:todolist.id }))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        dispatch(changeTaskStatusAC({taskId:task.id, isDone,todolistId:todolist.id}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({ taskId: task.id, title, todolistId: todolist.id }))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}