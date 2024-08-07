// export  const sentanse = 'Hello my friends!!!'
//
// export const splitInWords =(sentanse:string)=> {
//     return sentanse.split(" ")
// }
//
// export const sum =(a:number,b:number)=>{
//     return a+b
// }

import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST",
    payload: {
        todolistId: string
    }
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTitleTodolistAT = {
    type: 'CHANGE-TITLE',
    payload: {
        title: string,
        todolistId: string
    }
}

export type ChangeFilterTodolistAT = {
    type: "CHANGE-FILTER",
    payload: {
        filter: FilterValuesType,
        todolistId: string
    }
}


type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTitleTodolistAT | ChangeFilterTodolistAT

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]
export const todolistsReducer1 = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodolistType = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: "all"
            }
            return [...state, newTodo]
        }
        case "CHANGE-FILTER": {
            return state.map(tl => tl.id === action.payload.todolistId ?
                {...tl, filter: action.payload.filter} :
                tl)
        }
        case "CHANGE-TITLE": {
            return state.map(tl => tl.id === action.payload.todolistId ?
                {...tl, title: action.payload.title} : tl)
        }
        default:
            return state
    }

}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => ({
    type: "REMOVE-TODOLIST",
    payload: {
        todolistId: todolistId
    }
})

export const AddTodolistAC = (title: string, todolistId: string): AddTodolistAT => ({
    type: 'ADD-TODOLIST',
    payload: {
        title: title,
        todolistId: todolistId
    }
})

export const ChangeTitleTodolistAC = (title: string, todolistId: string): ChangeTitleTodolistAT => ({
    type: 'CHANGE-TITLE',
    payload: {
        title: title,
        todolistId: todolistId
    }
})

export const ChangeFilterTodolistAC = (filter: FilterValuesType, todolistId: string): ChangeFilterTodolistAT => ({
    type: "CHANGE-FILTER",
    payload: {
        filter: filter,
        todolistId: todolistId
    }
})

