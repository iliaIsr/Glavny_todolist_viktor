import Paper from "@mui/material/Paper"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { fetchTodolistsTC, selectTodolists } from "../../model/todolistsSlice"
import { Todolist } from "./Todolist/Todolist"
import Grid from "@mui/material/Grid"
import { useGetTodolistsQuery } from "../../api/_todolistsApi"

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()
  console.log("todolists", todolists)
  return (
    <>
      {todolists?.map((tl) => {
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
