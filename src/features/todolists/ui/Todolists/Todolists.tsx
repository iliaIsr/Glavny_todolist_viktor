import Paper from "@mui/material/Paper"

import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { Todolist } from "./Todolist/Todolist"
import Grid from "@mui/material/Grid"

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()

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
