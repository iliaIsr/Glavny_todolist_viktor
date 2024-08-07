//
// import {splitInWords, sum} from "./todolists-reducer";
// test('sum should be corrected',()=>{
//     let a=1
//     let b=2
//     let v=3
//     //action
//     const result=sum(a,b)
//     //expect result
//     expect(result).toBe(v)
//
// })
// test('split',()=>{
//     let b="Hello world"
//     let c="Hello my friend"
//
//     const result=splitInWords(b)
//     const result2=splitInWords(c)
//
//     expect(result[0]).toBe('Hello')
//     expect(result.length).toBe(2)
//     // expect(result2).toBe(['Hello', 'my', 'friend'])
// })
//
import {
    AddTodolistAC,
    AddTodolistAT, ChangeFilterTodolistAC,
    ChangeFilterTodolistAT, ChangeTitleTodolistAC,
    ChangeTitleTodolistAT, RemoveTodolistAC,
    RemoveTodolistAT,
    todolistsReducer1
} from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../App'
import {RemoveTodolistActionType} from "../reducers/todolists-reducer";


test("todolist should be removed",()=>{
//1 data
    let todolistId1=v1()
    let todolistId2=v1()

    const startState: TodolistType[]=[
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' }
    ]

    //2 action

    const action:RemoveTodolistAT = RemoveTodolistAC(todolistId1)

    const endState = todolistsReducer1(startState,action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

test("todolist should be add",()=>{
//1 data
    let todolistId1=v1()
    let todolistId2=v1()

    const startState: TodolistType[]=[
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' }
    ]

    //2 action

    const action:AddTodolistAT = AddTodolistAC('wow',todolistId1)///

    const endState = todolistsReducer1(startState,action)
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(action.payload.title)///

})

test("should be new title todlist",()=>{
//1 data
    let todolistId1=v1()
    let todolistId2=v1()

    const startState: TodolistType[]=[
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' }
    ]

    //2 action

    const action:ChangeTitleTodolistAT = ChangeTitleTodolistAC("WOW", todolistId2)

    const endState = todolistsReducer1(startState,action)
    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(action.payload.title)//

})

test("should be new title todlist",()=>{
//1 data
    let todolistId1=v1()
    let todolistId2=v1()

    const startState: TodolistType[]=[
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' }
    ]

    //2 action

    const action:ChangeFilterTodolistAT = ChangeFilterTodolistAC('completed',todolistId2)

    const endState = todolistsReducer1(startState,action)
    expect(endState[1].filter).toBe('completed')
    expect(endState[0].filter).toBe('all')

})

