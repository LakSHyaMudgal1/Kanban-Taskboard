import React, { useState } from 'react';

const TaskForm = ({ onSubmit, onCancel }) => {
  const [taskContent, setTaskContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskContent.trim()) {
      onSubmit(taskContent);
      setTaskContent('');
    }
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-3">Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="taskContent" className="block text-sm font-medium text-gray-700 mb-1">
            Task Description
          </label>
          <input
            type="text"
            id="taskContent"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;