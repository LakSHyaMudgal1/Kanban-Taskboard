import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index }) => {
  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return 'bg-gray-200 text-gray-800';
      case 'In Progress':
        return 'bg-blue-200 text-blue-800';
      case 'Done':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-3 rounded-md shadow-sm bg-white border-l-4 ${
            snapshot.isDragging ? 'shadow-lg' : ''
          } ${
            task.status === 'To Do' ? 'border-gray-400' :
            task.status === 'In Progress' ? 'border-blue-400' :
            'border-green-400'
          }`}
        >
          <div className="flex justify-between items-start">
            <p className="font-medium text-gray-800">{task.content}</p>
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;