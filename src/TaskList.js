// src/TaskList.js
import React from 'react';

function TaskList({
  tasks,
  handleEditTask,
  handleDeleteTask,
  handleToggleComplete,
  isCompletedSection,
}) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => handleEditTask(index)}>Edit</button>
          <button onClick={() => handleDeleteTask(index)}>Delete</button>
          <button onClick={() => handleToggleComplete(index)}>
            {isCompletedSection ? 'Mark as Pending' : 'Mark as Completed'}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
