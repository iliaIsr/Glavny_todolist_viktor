import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";


let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
	{id: todolistID1, title: 'What to learn', filter: 'all'},
	{id: todolistID2, title: 'What to buy', filter: 'all'},
]

const initalState:Array<TodolistType>=[]
export const todolistsReducer = (state= initalState, action: TodolistsActionsType) => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter(tl => tl.id !== action.todolistId)
		}

		case 'ADD-TODOLIST': {
			const newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'}
			return [...state, newTodolist]
		}

		case 'CHANGE-TODOLIST-TITLE': {
			return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
		}

		case 'CHANGE-TODOLIST-FILTER': {
			return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
		}

		default:
			return state
	}
}

// Action creators
export const removeTodolistAC = (todolistId: string) => {
	return {type: 'REMOVE-TODOLIST',todolistId} as const
}

export const addTodolistAC = (title: string)=> {
	return {type: 'ADD-TODOLIST', title, todolistId:v1()} as const
};

export const changeTodolistTitleAC = (id: string, title: string)=> {
	return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
};

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
	return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}} as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type TodolistsActionsType = RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType


