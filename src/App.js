import React ,{ useState , useEffect } from 'react';
import './App.css';
import { Button , FormControl , Input , InputLabel } from '@material-ui/core';
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {

  const [todos,setTodos] = useState([]);
  const [input,setInput] = useState([]);
  console.log(todos);
  useEffect(()=>{
    db.collection("todos").orderBy("timestamp","desc").onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc=> ({id:doc.id, todo: doc.data().todo})))
    })
    
  },[]);
  const addTodo = (event) => {
    
    db.collection("todos").add({
      todo: input,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })

    //setTodos([...todos, input]);
    event.preventDefault(); // to prevent the refresh when submit it pressed
    setInput(""); // to clear the input
  }

  return (
    <div className="App">
      <h1>Welecome to TODO </h1>
      <form>

        <FormControl>
          <InputLabel>Write to do List</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add Todo</Button>
        {/* <button type="submit" onClick={addTodo} >Add Todo</button> */}
      </form>
      <ul className="todo_ul">
      {todos.map(tod=>
      ( 
        <Todo id={tod.id} text={tod.todo}/>
        //<li>{todo}</li>
      ))}  
      </ul>
      
    </div>
  );
}

export default App;
