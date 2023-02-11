import React, { useState, useEffect} from 'react'
import './index.css'
import Header from './MyComponents/Header'
import {Todos} from './MyComponents/Todos'
import { AddTodo } from './MyComponents/AddTodo'
import {Footer} from './MyComponents/Footer'
import { About } from './MyComponents/About'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  let initTodo;
  if(localStorage.getItem('todos') === null){
    initTodo = []
  }else{
    initTodo = JSON.parse(localStorage.getItem('todos'))
  }

  const onDelete = (todo) => {
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const addTodo = (title, desc) => {
    let sno;
    if(todos.length===0){
      sno =0;
    }else{
      sno = todos[todos.length-1].sno + 1;
    }
    const myTodo = {
      sno,
      title,
      desc
    }
    setTodos([...todos, myTodo])
    console.log(myTodo);
    
  }
  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
  return (
    <>
    <Router>
    <Header title="My Todo List" searchBar = {false}/>
    <Routes>
      <Route path='/' element={
        <React.Fragment>
        <AddTodo addTodo={addTodo}/>
        <Todos todos={todos} onDelete={onDelete}/></React.Fragment>}/>
      <Route path='/about' element={<About/>} />
    </Routes>
    <Footer/>
    </Router>
    </>
  )
}


export default App
