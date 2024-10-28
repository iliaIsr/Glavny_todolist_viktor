import {v1} from "uuid";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType, TodolistType} from "../AppWithRedux";
import {addTodolistAC} from "./todolists-reducer";


let startState:TasksStateType;

beforeEach(()=>{
   startState={
        'todolistId1': [
            {id: '1', title: 'HTML&CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ]
    };
})
test("remove tasks-reducer test",()=>{


    const endTasksState=tasksReducer(startState,RemoveTaskAC('todolistId2','2'))


    expect(endTasksState['todolistId1'].length).toBe(3)
    expect(endTasksState['todolistId2'].length).toBe(2)
    expect(endTasksState['todolistId2'].every(t=>t.id!='2'))
})
test('correct task should be added to correct array', () => {

    const endState=tasksReducer(startState,AddTaskAC('todolistId2','juce'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})


test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState,ChangeTaskStatusAC('todolistId2','2',false))

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(true)
})

test('title of specified task should be changed', () => {

    const endState=tasksReducer(startState,ChangeTaskTitleAC('todolistId2','1','Milk'))

    expect(endState['todolistId2'][0].title).toBe('Milk')
    expect(endState['todolistId1'][0].title).toBe('HTML&CSS')

})

test('new array should be added when new todolist is added', () => {

    const endState = tasksReducer(startState, addTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})