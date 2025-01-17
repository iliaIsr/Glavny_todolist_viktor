import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { Todolist } from "./todolistsApi.types"
import {
  BaseQueryMeta,
  BaseQueryResult,
  createApi,
  EndpointBuilder,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"
import { DomainTodolist } from "../model/todolistsSlice"
import { baseApi } from "app/baseApi"

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists")
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { title, id } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
}

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getTodolists: build.query<DomainTodolist[], void>({
        query: () => "todo-lists",
        transformResponse(todolists: Todolist[]): DomainTodolist[] {
          return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
        },
        providesTags: ["Todolist"],
      }),
      createTodolists: build.mutation<BaseResponse<{ item: Todolist }>, string>({
        query: (title) => {
          return {
            url: "todo-lists",
            method: "POST",
            body: { title },
          }
        },
        invalidatesTags: ["Todolist"],
      }),
      removeTodolist: build.mutation<BaseResponse, string>({
        query: (id) => {
          return {
            url: `todo-lists/${id}`,
            method: "DELETE",
          }
        },
        invalidatesTags: ["Todolist"],
      }),
      updateTodolist: build.mutation<BaseResponse, { id: string; title: string }>({
        query: ({ id, title }) => {
          return {
            url: `todo-lists/${id}`,
            method: "PUT",
            body: {
              title,
            },
          }
        },
        invalidatesTags: ["Todolist"],
      }),
    }
  },
})
export const {
  useGetTodolistsQuery,
  useCreateTodolistsMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistMutation,
} = todolistsApi
