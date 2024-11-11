import {DomainTask, FieldError} from "../../features/todolists/api/tasksApi.types";

export type BaseResponse<T={}>={
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: T
}