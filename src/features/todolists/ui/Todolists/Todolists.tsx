import Paper from "@mui/material/Paper"

import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectTodolists } from "../../model/todolistsSelectors"
import { Todolist } from "./Todolist/Todolist"
import { Grid } from "@mui/material"
import { todolistsApi } from "../../api/todolistsApi"
import { fetchTodolistsThunk, setTodolistsAC } from "../../model/todolists-reducer"

import { AppDispatch } from "app/store"
import { useDispatch } from "react-redux"
import { addTaskTC } from "../../model/tasks-reducer"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()
  // const dispatch= useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsThunk)
  }, [])
  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
