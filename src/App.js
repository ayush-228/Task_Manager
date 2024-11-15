import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [priority,setpriority]=useState([])
  const [p, setp] = useState(0);

  // Load TODOs from local storage on app startup
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    const storedprior = JSON.parse(localStorage.getItem('prior'));
    if (storedprior) {
      setpriority(storedprior);
    }
  }, []);


  // Update local storage whenever TODOs change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('prior', JSON.stringify(priority));
  }, [priority]);


  const handleAddTodo = () => {
    setpriority([...priority, p]);
    if (task.trim() !== '') {
      setTodos([...todos, task]);
      setTask('');
    }
  };

  const handleRemoveTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO App</h1>
        {priority}
        <div className="todo-input">
          <input
            type="text"
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input type="number" id="numberInput" name="numberInput" min="1" max="3" value={p} required/>
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              {priority[index]}
              <button onClick={() => handleRemoveTodo(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;