import { AddItemForm } from './AddItemForm';
import './App.css';
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, CssBaseline, Grid, Paper } from '@mui/material';
import { MenuButton } from './MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { green, amber } from '@mui/material/colors'
import Switch from '@mui/material/Switch';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}
type TasksStateType = {
	[todolistId: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
	//BLL
	const todolistId_1 = v1()
	const todolistId_2 = v1()
	const [todolists, setTodolists] = useState<Array<TodolistType>>([
		{
			id: todolistId_1,
			title: "What to learn",
			filter: "all",
		},
		{
			id: todolistId_2,
			title: "What to bye",
			filter: "all",
		},
	])

	const [tasks, setTasks] = useState<TasksStateType>({
		[todolistId_1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: true },
		],
		[todolistId_2]: [
			{ id: v1(), title: 'Water', isDone: true },
			{ id: v1(), title: 'Icecream', isDone: true },
			{ id: v1(), title: 'Beer', isDone: false },
		],

	})
	// CRUD tasks:
	const addTask = (title: string, todolistId: string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		setTasks(
			{
				...tasks,
				[todolistId]: [...tasks[todolistId], newTask]
			}
		)
	}
	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		setTasks(
			{
				...tasks,
				[todolistId]: tasks[todolistId].map(t => t.id == taskId ? { ...t, isDone: taskStatus } : t)
			}
		)
	}
	const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
		setTasks(
			{
				...tasks,
				[todolistId]: tasks[todolistId].map(t => t.id == taskId ? { ...t, title: title } : t)
			}
		)
	}
	const removeTask = (taskId: string, todolistId: string) => {
		setTasks(
			{
				...tasks,
				[todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
			})
	}
	//CRUD todolists:
	const addTodolist = (title: string) => {
		const todolistId = v1()
		const newTodo: TodolistType = {
			id: todolistId,
			title: title,
			filter: "all"
		}
		const nextState: Array<TodolistType> = [...todolists, newTodo]
		setTodolists(nextState)
		setTasks({ ...tasks, [todolistId]: [] })
	}
	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		const nextState: Array<TodolistType> = todolists.map(tl => tl.id === todolistId ? { ...tl, filter: filter } : tl)
		setTodolists(nextState)
	}
	const changeTodolistTitle = (title: string, todolistId: string) => {
		const nextState: Array<TodolistType> = todolists.map(tl => tl.id === todolistId ? { ...tl, title: title } : tl)
		setTodolists(nextState)
	}
	const removeTodolist = (todolistId: string) => {
		const nextState: Array<TodolistType> = todolists.filter(tl => tl.id !== todolistId)
		setTodolists(nextState)
		delete tasks[todolistId]
	}
	//UI
	const todolistsComp: Array<JSX.Element> = todolists.map(tl => {


		let tasksForTodolist = tasks[tl.id]
		if (tl.filter === 'active') {
			tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
		}

		if (tl.filter === 'completed') {
			tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
		}



		return (

			<Grid item>
				<Paper sx={{ p: "20px 15px" }} elevation={8}>
					<Todolist
						key={tl.id}
						title={tl.title}
						tasks={tasksForTodolist}
						todolistId={tl.id}
						filter={tl.filter}

						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						removeTodolist={removeTodolist}
						changeTaskTitle={changeTaskTitle}
						changeTodolistTitle={changeTodolistTitle}
					/>
				</Paper>
			</Grid>
		)
	})


	const [isLight, setIsLight] = useState(true)

	const theme = createTheme({
		palette: {
			primary: green,
			secondary: amber,
			mode: isLight ? "light" : "dark"
		}
	})

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position="static">
					<Toolbar>
						<IconButton color="inherit">
							<MenuIcon />
						</IconButton>
						<MenuButton >Login</MenuButton>
						<MenuButton >Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
						<Switch color="secondary" onChange={() => setIsLight(!isLight)} />
					</Toolbar>
				</AppBar>
				<Container fixed>
					<Grid container sx={{ p: "10px 0" }}>
						<AddItemForm addItem={addTodolist} />
					</Grid>
					<Grid container spacing={4}>
						{todolistsComp}
					</Grid>
				</Container>
			</ThemeProvider>
		</div>
	);
}

export default App;
