
import {AddItemForm} from "../../../../../common/components/AddItemForm";
import {addTaskAC} from "../../../../../model/tasks-reducer";
import {TodolistType} from "../../../../../model/todolists-reducer";
import {FilterTasksButtons} from "../../../../../FilterTasksButtons";
import {Tasks} from "../../../../../Tasks";
import {TodolistTitle} from "../../../../../TodolistTitle";
import {useDispatch} from "react-redux";


type PropsType = {
	todolist:TodolistType

}

export const Todolist = ({todolist}: PropsType) => {



const dispatch=useDispatch()

	const addTaskCallback = (title: string) => {
		dispatch(addTaskAC({title, todolistId:todolist.id}))
	}

	return (
		<div>
			<TodolistTitle todolist={todolist}/>
			<AddItemForm addItem={addTaskCallback}/>
			<Tasks todolist={todolist}/>

			<FilterTasksButtons todolist={todolist} />

		</div>
	)
}
