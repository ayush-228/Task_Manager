// src/TaskForm.js
import React from 'react';

function TaskForm({
  title,
  description,
  dueDate,
  priority,
  setTitle,
  setDescription,
  setDueDate,
  setPriority,
  handleSaveTask,
}) {
  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleSaveTask}>Add/Update Task</button>
    </div>
  );
}

export default TaskForm;
