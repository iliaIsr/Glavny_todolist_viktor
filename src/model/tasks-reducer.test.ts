import {v1} from "uuid";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../App";
import {addTodolistAC} from "./todolists-reducer";

test("remove tasks-reducer test",()=>{

    const startState:TasksStateType={
        ['1']: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        ['2']: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ],
    }

    const endTasksState=tasksReducer(startState,RemoveTaskAC('2','2'))

    expect(endTasksState).toEqual({
        '1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        '2': [
            {id: '1', title: 'Rest API', isDone: true},
        ],
    })
    expect(endTasksState[2].length).toBe(1)
    expect(endTasksState[1].length).toBe(3)
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        '1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        '2': [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }

    const endState=tasksReducer(startState,AddTaskAC('2','juce'))

    expect(endState['1'].length).toBe(3)
    expect(endState['2'].length).toBe(4)
    expect(endState['2'][0].id).toBeDefined()
    expect(endState['2'][0].title).toBe('juce')
    expect(endState['2'][0].isDone).toBe(false)
})


test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        '1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        '2': [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }

    const endState = tasksReducer(startState,ChangeTaskStatusAC('2','2',false))


    expect(endState['2'][1].isDone).toBe(false)
    expect(endState['1'][1].isDone).toBe(true)
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        '1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        '2': [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'age', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }

    const endState=tasksReducer(startState,ChangeTaskTitleAC('2','1','Milk'))

    expect(endState['2'][0].title).toBe('Milk')
    expect(endState['1'][0].title).toBe('CSS')

})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        'todolistId2': [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }

    const endState = tasksReducer(startState, addTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})