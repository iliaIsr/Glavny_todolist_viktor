import { FilterValuesType, TaskType } from "./App";
import { ChangeEvent, KeyboardEvent, useState } from "react";

import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Checkbox from '@mui/material/Checkbox';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Box } from "@mui/material";
import { buttonsContainerSx, getListItemSx } from "./Todolist.styles";

type PropsType = {
	title: string
	tasks: TaskType[]
	todolistId: string
	filter: FilterValuesType

	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	removeTodolist: (todolistId: string) => void
	changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
	changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
	const {
		title,
		tasks,
		todolistId,
		filter,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		removeTodolist,
		changeTaskTitle,
		changeTodolistTitle
	} = props

	const addTaskCallback = (taskTitle: string) => {
		addTask(taskTitle, todolistId)
	}

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, todolistId)
	}

	const changeTodolistTitleCallback = (newTitle: string) => changeTodolistTitle(newTitle, todolistId)

	return (
		<div>
			<h3>
				<EditableSpan changeTitle={changeTodolistTitleCallback} title={title} />
				<IconButton onClick={() => removeTodolist(todolistId)} color="primary" >
					<DeleteOutlineIcon fontSize="small" />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTaskCallback} />
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List disablePadding={true}>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todolistId)
							}
							const changeTaskTitleCallback = (newTitle: string) => {
								changeTaskTitle(task.id, newTitle, todolistId)
							}

							return <ListItem
								sx={getListItemSx(task.isDone)}
								key={task.id} >
								<div>
									<Checkbox
										size="small"
										color="secondary"
										checked={task.isDone}
										onChange={changeTaskStatusHandler}
									/>
									<EditableSpan changeTitle={changeTaskTitleCallback} title={task.title} />
								</div>
								<IconButton onClick={removeTaskHandler} color="primary" >
									<DeleteOutlineIcon fontSize="small" />
								</IconButton>
							</ListItem >
						})}
					</List>
			}
			<Box sx={buttonsContainerSx}>
				<Button
					size="small"
					variant="contained"
					disableElevation
					color={filter === 'all' ? 'secondary' : 'primary'}
					onClick={() => changeFilterTasksHandler('all')}
				>All</Button>
				<Button
					size="small"
					variant="contained"
					disableElevation
					color={filter === 'active' ? 'secondary' : 'primary'}
					onClick={() => changeFilterTasksHandler('active')}
				>Active</Button>
				<Button
					size="small"
					variant="contained"
					disableElevation
					color={filter === 'completed' ? 'secondary' : 'primary'}
					onClick={() => changeFilterTasksHandler('completed')}
				>Completed</Button>
			</Box>
		</div>
	)
}
