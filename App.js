import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEdit, setTodoEdit] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)

    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }
    setTodos([...todos].concat(newTodo))
    setTodo('')
  }

  function deleteTodo(id) {
    const updatedTodo = [...todos].filter((todo) => todo.id !== id)

    setTodos(updatedTodo)
  }

  function toggleComplete(id) {
    const updatedTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodo);
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEdit(null);
    setEditText("");
  }

  return (
    <div className="App">
      <h1>나의 Todo-list</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type="submit">등록</button>
      </form>
      {todos.map((todo) => <div key={todo.id}>
        <input type="checkbox"
          onChange={() => toggleComplete(todo.id)}
          checked={todo.completed}
        />
        {todoEdit === todo.id ?
          (<input type="text"
            onChange={(e) => setEditText(e.target.value)}
            value={editText}
          />)
          :
          (<div>{todo.text}</div>)}

        {todoEdit === todo.id ?
          ("")
          :
          (<button onClick={() => deleteTodo(todo.id)}>삭제</button>)}

        {todoEdit === todo.id ?
          (<button onClick={() => editTodo(todo.id)}>수정완료</button>)
          :
          (<button onClick={() => setTodoEdit(todo.id)}>수정</button>)}
      </div>
      )}
    </div>
  );
}

export default App;
