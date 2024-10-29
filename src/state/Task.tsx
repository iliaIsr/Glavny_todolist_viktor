import React, {ChangeEvent, memo, useCallback} from 'react';
import {getListItemSx} from "../Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TaskType} from "../AppWithRedux";

type TaskPropsType = {
    title:string
    task:TaskType
    todolistId:string
    updateTask: (todolistId: string, taskId: string, title: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void

}
export const Task = memo(({task,todolistId,updateTask,removeTask,changeTaskStatus}:TaskPropsType) => {

    const removeTaskHandler = () => removeTask(task.id, todolistId)
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(task.id, newStatusValue, todolistId)}

    const changeTaskTitleHandler = (title: string) => updateTask(todolistId, task.id, title)


    return <ListItem sx={getListItemSx(task.isDone)}>
        <div>
            <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
            <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
        </div>
        <IconButton onClick={removeTaskHandler}>
            <DeleteIcon/>
        </IconButton>
    </ListItem>
})

export default Task;