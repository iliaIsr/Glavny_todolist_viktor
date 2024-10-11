import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

// export type FirstActionType={
// 	type:'REMOVE-TASK',
// 	taskId:string,
// 	todolistId:string
// }
export type RemoveTaskActionType=ReturnType <typeof RemoveTaskAC>
export type AddTAskActionType=ReturnType <typeof AddTaskAC>
export type ChangeTaskStatusActionType=ReturnType<typeof ChangeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof ChangeTaskTitleAC>

type ActionsType=RemoveTaskActionType|AddTAskActionType|ChangeTaskStatusActionType|ChangeTaskTitleActionType|AddTodolistActionType|RemoveTodolistActionType;
export const tasksReducer = (state: TasksStateType , action: ActionsType):TasksStateType=> {
	switch (action.type) {
		case 'REMOVE-TASK': {
			return {
				...state,
				[action.todolistId]:state[action.todolistId].filter(task=>task.id!==action.taskId)
			}
		}
		case "ADD-TASK":{
				return {
					...state,
					[action.todolistId]:[{id:v1(),title:action.title,isDone:false},...state[action.todolistId]]
				}
		}
		case "CHANGE-TASK-STATUS":{
			return {
				...state,[action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId?{...t,isDone:action.isDone}:t)
			}}
		case "CHANGE-TASK-TITLE":
			return {
				...state,[action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId?{...t,title:action.title}:t)
			}
		case "ADD-TODOLIST":{
			return {
				...state,
				[action.todolistId]:[]
			}
		}
		case "REMOVE-TODOLIST":{
			let copyState=JSON.parse(JSON.stringify(state))
			// let coptState={...state}
			delete copyState[action.todolistId];
			return copyState
			// const {[action.todolistId]:[],...rest}=state
			// return rest
		}
		default:
			throw new Error("error")
		}}

export const RemoveTaskAC=(todolistId:string,taskId:string)=>{
	return {type:'REMOVE-TASK',todolistId,taskId} as const
}
export const AddTaskAC=(todolistId:string,title:string)=>{
	return {type:'ADD-TASK', todolistId,title} as const
}
export const ChangeTaskStatusAC=(todolistId:string,taskId:string,isDone:boolean)=>{
	return {type:'CHANGE-TASK-STATUS', todolistId,taskId,isDone} as const
}
export const ChangeTaskTitleAC=(todolistId:string,taskId:string,title:string)=>{
	return {type:"CHANGE-TASK-TITLE", todolistId,taskId,title} as const
}
