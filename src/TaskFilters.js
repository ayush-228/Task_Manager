// src/TaskFilters.js
import React from 'react';

function TaskFilters({
  searchQuery,
  filterPriority,
  filterStatus,
  setSearchQuery,
  setFilterPriority,
  setFilterStatus,
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search Tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
      >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );
}

export default TaskFilters;
