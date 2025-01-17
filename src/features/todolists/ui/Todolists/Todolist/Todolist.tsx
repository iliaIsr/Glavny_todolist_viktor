import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks"
import { addTaskTC } from "../../../model/tasksSlice"
import { DomainTodolist } from "../../../model/todolistsSlice"

import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { useAddTaskMutation } from "../../../api/_tasksApi"

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const [data] = useAddTaskMutation()
  console.log("addTask", data)
  const dispatch = useAppDispatch()

  const addTaskCallback = (title: string) => {
    // dispatch(addTaskTC({ title, todolistId: todolist.id }))
    data({ title, todolistId: todolist.id })
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  )
}
