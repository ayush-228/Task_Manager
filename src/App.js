// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [completed, setCompleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Load tasks from local storage on app startup
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage whenever the task list changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add or update a task
  const handleSaveTask = () => {
    if (title.trim() === '' || description.trim() === '' || dueDate === '') {
      alert('Please fill all fields before saving.');
      return;
    }

    const newTask = {
      title,
      description,
      dueDate,
      priority,
      completed,
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
    setCompleted(false);
  };

  // Edit a task
  const handleEditTask = (index) => {
    const task = tasks[index];
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setCompleted(task.completed);
  };

  // Delete a task
  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Toggle task completion
  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Filter tasks based on priority and status
  const filteredTasks = tasks.filter((task) => {
    const matchesPriority =
      filterPriority === 'All' || task.priority === filterPriority;
    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Completed' && task.completed) ||
      (filterStatus === 'Pending' && !task.completed);
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesPriority && matchesStatus && matchesSearch;
  });

  // Sectioning the tasks for the dashboard
  const currentDate = new Date().toISOString().split('T')[0];
  const upcomingTasks = filteredTasks.filter(
    (task) => task.dueDate > currentDate && !task.completed
  );
  const overdueTasks = filteredTasks.filter(
    (task) => task.dueDate < currentDate && !task.completed
  );
  const completedTasks = filteredTasks.filter((task) => task.completed);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management Dashboard</h1>

        {/* Search and Filter */}
        <TaskFilters
          searchQuery={searchQuery}
          filterPriority={filterPriority}
          filterStatus={filterStatus}
          setSearchQuery={setSearchQuery}
          setFilterPriority={setFilterPriority}
          setFilterStatus={setFilterStatus}
        />

        {/* Task Form */}
        <TaskForm
          title={title}
          description={description}
          dueDate={dueDate}
          priority={priority}
          setTitle={setTitle}
          setDescription={setDescription}
          setDueDate={setDueDate}
          setPriority={setPriority}
          handleSaveTask={handleSaveTask}
        />

        {/* Dashboard Sections */}
        <h2>Upcoming Tasks</h2>
        <TaskList
          tasks={upcomingTasks}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleToggleComplete={handleToggleComplete}
          isCompletedSection={false}
        />

        <h2>Overdue Tasks</h2>
        <TaskList
          tasks={overdueTasks}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleToggleComplete={handleToggleComplete}
          isCompletedSection={false}
        />

        <h2>Completed Tasks</h2>
        <TaskList
          tasks={completedTasks}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleToggleComplete={handleToggleComplete}
          isCompletedSection={true}
        />
      </header>
    </div>
  );
}

export default App;
