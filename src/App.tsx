import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>(
        [
            {id: todolistID1, title: 'What to lern', filter: 'active'},
            {id: todolistID2, title: 'What to bue', filter: 'all'}
        ]
    )

    const [tasks, setTasks] = useState<TasksStateType>(
        {
            [todolistID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
            ]
        }
    )

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks((prevState) => (
                {
                    ...prevState,
                    [todolistId]: [newTask, ...prevState[todolistId]]
                }
            )
        )
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists((prevState) => prevState.map(tl => tl.id === todolistId ?
            {...tl, filter}
            :
            tl))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ?
                {...t, isDone: taskStatus}
                :
                t)
        })
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (Title: string) => {
    const idd=v1()
        const newTodoshka:TodolistType={id: idd, title:Title, filter: 'all'}
        alert(Title)
        setTodolists([newTodoshka,...todolists])
        setTasks({...tasks,[idd]:[
                {id: v1(), title: 'HTML&CSS', isDone: true}
            ]})

    }

    const changeTaskTitle =(todolistId: string, taskId:string, newTitle:string)=>{
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(t=>t.id===taskId?
                {...t,title:newTitle}
                :
            t)})
    }


    return (
        <div className="App">
            <AddItemForm  addItem={addTodolist}/>
            {todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id]

                if (tl.filter === 'active') {
                    allTodolistTasks = tasks[tl.id].filter(task => !task.isDone)
                    console.log(allTodolistTasks)
                }

                if (tl.filter === 'completed') {
                    allTodolistTasks = tasks[tl.id].filter(task => task.isDone)
                }

                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={allTodolistTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskTitle={changeTaskTitle}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    )
}

export default App;