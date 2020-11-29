import { ListItemText , ListItem , List , ListItemAvatar, Button, Modal} from '@material-ui/core';
import React, { useState } from 'react'
import "./Todo.css";
import db from "./firebase";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';  
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {
    
    const classes = useStyles();
    const [open , setOpen] = useState(false);
    const [input , setInput] = useState("");

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    const updateTodo = () => {
        //update to do 
        db.collection("todos").doc(props.id).set({todo:input},{merge:true});
        setOpen(false);
    }

    return (

        <div className="todo_final">
        <Modal open={open} onClose={ e => setOpen(false)} >
            <div className={classes.paper}>
                <h1>i am a modal</h1>
                <input placeholder={props.text} value={input} onChange={event => setInput(event.target.value)} />
                <Button onClick={updateTodo} variant="contained" color="primary">Update Todo</Button>
            </div>
        </Modal>

        <List className="todo_block">

            <ListItem >
                <ListItemText primary={props.text} secondary="End Line XD" />
            </ListItem>
            <button className="edit_btn" onClick={e => setOpen(true)} >EDIT</button>
            <DeleteForeverIcon  className="delete_btn" onClick={event => 
            db.collection("todos").doc(props.id).delete()} />

        </List>
        </div>   
    )
}

export default Todo;
