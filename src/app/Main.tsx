import {useDispatch} from "react-redux";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import {AddItemForm} from "../common/components/AddItemForm";


import React from "react";
import {Grid} from "@mui/material";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists";
import {addTodolistAC} from "../model/todolists-reducer";


export const Main = () => {

    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return (
        <>
            <CssBaseline/>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    <Todolists/>
                </Grid>
            </Container>
        </>
    );
}