import List from "@mui/material/List";
import {ChangeEvent} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./common/components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TodolistType} from "./model/todolists-reducer";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from "./model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {Task} from "./Task";

type Props = {
    todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
    const dispatch = useDispatch()

    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({ taskId, todolistId }))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({ taskId, isDone: taskStatus, todolistId }))
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({ taskId, title, todolistId }))
    }

    const allTodolistTasks = tasks[todolist.id]

    let tasksForTodolist = allTodolistTasks

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }
    return (
        <>
            {tasksForTodolist.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasksForTodolist.map(task => {
                        return (
                            <Task todolist={todolist} task={task}/>
                        )
                    })}
                </List>
            )}
        </>
    )
}