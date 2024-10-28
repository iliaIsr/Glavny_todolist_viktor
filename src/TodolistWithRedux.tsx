import {FilterValuesType, TaskType} from "./AppWithRedux";
import {ChangeEvent} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType} from "./AppWithRedux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";


type PropsType = {
	todolistId: string
	title:string
	filter:FilterValuesType

}

export const TodolistWithRedux = ({todolistId,title,filter}:PropsType ) => {

	let tasks=useSelector<AppRootStateType, Array<TaskType>>(state=>state.tasks[todolistId])
	const dispatch=useDispatch()

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		dispatch(changeTodolistFilterAC(todolistId,filter))
	}

	const removeTodolistHandler = () => {
		dispatch(removeTodolistAC(todolistId))
	}

	const addTaskCallback = (title: string) => {
		dispatch(AddTaskAC(todolistId,title))
	}

	const updateTodolistHandler = (title: string) => {
		dispatch(changeTodolistTitleAC(todolistId,title))
	}


	if (filter === 'active') {
		tasks = tasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasks = tasks.filter(task => task.isDone)
	}
	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3><EditableSpan value={title} onChange={updateTodolistHandler}/></h3>
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon/>
				</IconButton>
			</div>
			<AddItemForm addItem={addTaskCallback}/>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <List>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								dispatch(RemoveTaskAC(todolistId,task.id))
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								dispatch(ChangeTaskStatusAC(todolistId,task.id,newStatusValue))
							}

							const changeTaskTitleHandler = (title: string) => {
								dispatch(ChangeTaskTitleAC(todolistId,task.id,title))
							}
							return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
								<div>
									<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
									<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
								</div>
								<IconButton onClick={removeTaskHandler}>
									<DeleteIcon/>
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<Button
					variant={filter === 'all' ? 'outlined' : 'text'}
					color={'inherit'}
					onClick={() => changeFilterTasksHandler('all')}>
					All
				</Button>
				<Button
					variant={filter === 'active' ? 'outlined' : 'text'}
					color={'primary'}
					onClick={() => changeFilterTasksHandler('active')}>
					Active
				</Button>
				<Button
					variant={filter === 'completed' ? 'outlined' : 'text'}
					color={'secondary'}
					onClick={() => changeFilterTasksHandler('completed')}>
					Completed
				</Button>
			</Box>
		</div>
	)
}
