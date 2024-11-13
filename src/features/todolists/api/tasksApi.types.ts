import { TaskPriority, TaskStatus } from "../lib/enums/enum"
export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModel = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

export type FieldError = {
  error: string
  field: string
}
