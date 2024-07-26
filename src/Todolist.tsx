import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
	title: string
	todolistId:string,
	tasks: TaskType[]
	removeTask: (todolistId:string, taskId: string) => void
	changeFilter: (todolistId:string,filter: FilterValuesType) => void
	addTask: (todolistId:string,title: string) => void
	changeTaskStatus: (todolistId:string,taskId: string, taskStatus: boolean) => void
	filter: FilterValuesType
	removeTodolist:(removeTodolist:string)=>void
	changeTaskTitle:(todolistId: string, taskId:string, newTitle:string)=>void
	changeTodoListTitle:(todolistId: string,newTitle:string)=>void

}

export const Todolist = (props: PropsType) => {
	const removeTodolistHandler=()=>{
		props.removeTodolist(todolistId)
	}
	const {title, tasks, filter, removeTask, changeFilter, addTask, todolistId, changeTaskStatus, changeTaskTitle,changeTodoListTitle} = props





	const obertkAddTask=(newTitle:string)=>{
		props.addTask(props.todolistId, newTitle)
	}


	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(props.todolistId,filter)
	}

	// const changeTaskStatus=(newTitle:string)=>{
	//
	// }
	const obertkaChangeTodoListTitle=(newTitle:string)=>{
		changeTodoListTitle(todolistId, newTitle)
	}
	// const getTaskHandlerId=(taskID:string)=>{
	// 	console.log(taskID)
	// }
	const obertkaChangeTaskTitle=(taskId:string, newTitle:string)=>{

		changeTaskTitle(todolistId,taskId,newTitle)
	}

	return (
		<div>
			<div className={'todolist-title-container'}>
			{/*<h3>{title}</h3>*/}
				<h3><EditableSpan oldTitle={title} obertkaChangeTaskTitle={ obertkaChangeTodoListTitle}/></h3>
			<Button title={'x'} onClick={removeTodolistHandler}/>
			</div>
			<AddItemForm
				addItem={obertkAddTask}
				 />
			{tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {
							// const getTaskID=()=>{
							// 	getTaskHandlerId(task.id)
							// }

							const removeTaskHandler = () => {
								removeTask(props.todolistId, task.id)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(todolistId,task.id, newStatusValue)
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<EditableSpan
									// onChange={task.id}
									oldTitle={task.title}
									obertkaChangeTaskTitle={(newTitle)=>obertkaChangeTaskTitle(task.id, newTitle)}
								/>
								{/*kak eto rabotaet?*/}
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : '' } title={'All'} onClick={()=> changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : '' } title={'Active'} onClick={()=> changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : '' } title={'Completed'} onClick={()=> changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}
