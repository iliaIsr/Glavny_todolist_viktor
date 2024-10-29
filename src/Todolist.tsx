import {FilterValuesType, TaskType, TodolistType} from "./AppWithRedux";
import {ChangeEvent, memo, useCallback, useMemo} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {ButtonProps} from "@mui/material/Button/Button";
import Task from "./state/Task";
import {TaskWithRedux} from "./TaskWithRedux";


type PropsType = {
	title: string
	todolistId: string
	tasksProps: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	updateTask: (todolistId: string, taskId: string, title: string) => void
	updateTodolist: (todolistId: string, title: string) => void
}


export const Todolist =memo (({title,
								  tasksProps,
								  filter,
								  removeTask,
								  changeFilter,
								  addTask,
								  changeTaskStatus,
								  todolistId,
								  removeTodolist,
								  updateTask,
								  updateTodolist}: PropsType) => {


	// const changeFilterTasksHandler = (filter: FilterValuesType) => {
	// 	changeFilter(filter,todolistId)
	// }

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const addTaskCallback = useCallback((title: string) => {
		addTask(title, todolistId)
	},[addTask,todolistId])

	const changeTodolistTitleHandler = useCallback((title: string) => {
		updateTodolist(todolistId, title)
	},[title,todolistId])

	const onAllClickHandler=useCallback(()=> changeFilter('all', todolistId),[changeFilter,todolistId])
	const onActiveClickHandler=useCallback(()=>changeFilter('active', todolistId),[changeFilter,todolistId])
	const onCompletedClickHandler=useCallback(()=>changeFilter('completed', todolistId),[changeFilter,todolistId])


	let tasks = tasksProps

	tasks=useMemo(()=>{

		if (filter === 'active') {
			tasks = tasks.filter(task => !task.isDone)
		}

		if (filter === 'completed') {
			tasks = tasks.filter(task => task.isDone)
		}
		return tasks
	},[tasks, filter])

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/></h3>
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon/>

				</IconButton>
			</div>
			<AddItemForm addItem={addTaskCallback}/>
			{
				tasksProps.length === 0
					? <p>Тасок нет</p>
					// : <List>
					// 	{tasks.map((task) => {
					// 		return <Task key={task.id} title={title} task={task} todolistId={todolistId} updateTask={updateTask} removeTask={removeTask} changeTaskStatus={changeTaskStatus}/>
					// 	})}
					// </List>
					: <List>
						{tasks.map((task) => {
							return <TaskWithRedux key={task.id} task={task} todolistId={todolistId}/>
						})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<ButtonWithMemo
					variant={filter === 'all' ? 'outlined' : 'text'}
					color={'inherit'}
					onClick={onAllClickHandler}>
					All
				</ButtonWithMemo>
				<ButtonWithMemo
					variant={filter === 'active' ? 'outlined' : 'text'}
					color={'primary'}
					onClick={onActiveClickHandler}>
					Active
				</ButtonWithMemo>
				<ButtonWithMemo
					variant={filter === 'completed' ? 'outlined' : 'text'}
					color={'secondary'}
					onClick={onCompletedClickHandler}>
					Completed
				</ButtonWithMemo>
			</Box>
		</div>
	)
})

type ButtonWithMemoPropsType=ButtonProps & {}
const ButtonWithMemo=memo(({variant, onClick, color, children,...rest}:ButtonWithMemoPropsType)=>{
	return <Button variant={variant}
				   onClick={onClick}
				   color={color}
		{...rest}>
		{children}
	</Button>
})

//useMemo: Используется для мемоизации значений.
// memo: Используется для мемоизации компонентов.
// useCallback: Используется для мемоизации функций.