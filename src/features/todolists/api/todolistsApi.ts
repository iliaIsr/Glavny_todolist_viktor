import axios from "axios";
import {Todolist} from "./todolistsApi.types";
import {instance} from "../../../common/instance/instance";
import {BaseResponse} from "../../../common/types/types";

export const todolistsApi = {
    getTodolists: () => {
        return instance.get<Todolist[]>('todo-lists')
    },
    createTodolist: (title: string) => {
        return instance.post<BaseResponse<{item:Todolist}>>('todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<BaseResponse>(`/todo-lists/${id}`)
    },
    updateTodolist(args:{id:string,title:string}){
        const {id, title} = args;
        return instance
            .put<BaseResponse>(`todo-lists/${id}`, {title})}
}

