import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({ column, tasks }) => {
  // Get the color based on column title
  const getColumnColor = (title) => {
    switch (title) {
      case 'To Do':
        return 'bg-gray-100';
      case 'In Progress':
        return 'bg-blue-50';
      case 'Done':
        return 'bg-green-50';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className={`rounded-lg shadow-md ${getColumnColor(column.title)} overflow-hidden`}>
      <h2 className="p-4 font-bold text-lg border-b bg-white">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-4 min-h-[500px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-200' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;