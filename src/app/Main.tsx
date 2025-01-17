import Container from "@mui/material/Container"

import { Path } from "common/router"
import { AddItemForm } from "common/components"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { Navigate } from "react-router-dom"

import { addTodolistTC } from "../features/todolists/model/todolistsSlice"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import Grid from "@mui/material/Grid"
import { useCreateTodolistsMutation } from "../features/todolists/api/_todolistsApi"
import { selectIsLoggedIn } from "app/appSlice"

export const Main = () => {
  const [createTodolists, { data, error, isLoading }] = useCreateTodolistsMutation()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const addTodolist = (title: string) => {
    createTodolists(title)
  }

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
