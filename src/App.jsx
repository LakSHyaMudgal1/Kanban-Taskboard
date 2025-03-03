import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Column from './components/Column';
import TaskForm from './components/TaskForm';

// Initial data for the Kanban board
const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Create project structure', status: 'To Do' },
    'task-2': { id: 'task-2', content: 'Implement drag and drop', status: 'To Do' },
    'task-3': { id: 'task-3', content: 'Design UI components', status: 'In Progress' },
    'task-4': { id: 'task-4', content: 'Add task creation functionality', status: 'In Progress' },
    'task-5': { id: 'task-5', content: 'Write documentation', status: 'Done' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-3', 'task-4'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-5'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

function App() {
  const [state, setState] = useState(initialData);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Handle drag end event
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item is dropped back to its original position
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Get source and destination columns
    const sourceColumn = state.columns[source.droppableId];
    const destinationColumn = state.columns[destination.droppableId];

    // If moving within the same column
    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one column to another
    const sourceTaskIds = Array.from(sourceColumn.taskIds);
    sourceTaskIds.splice(source.index, 1);
    
    const destinationTaskIds = Array.from(destinationColumn.taskIds);
    destinationTaskIds.splice(destination.index, 0, draggableId);

    // Update the task's status based on the destination column
    const updatedTask = {
      ...state.tasks[draggableId],
      status: destinationColumn.title,
    };

    const newState = {
      ...state,
      tasks: {
        ...state.tasks,
        [draggableId]: updatedTask,
      },
      columns: {
        ...state.columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          taskIds: sourceTaskIds,
        },
        [destinationColumn.id]: {
          ...destinationColumn,
          taskIds: destinationTaskIds,
        },
      },
    };

    setState(newState);
  };

  // Add a new task
  const addTask = (content) => {
    const newTaskId = `task-${uuidv4()}`;
    const newTask = {
      id: newTaskId,
      content,
      status: 'To Do',
    };

    // Add the task to the "To Do" column
    const column = state.columns['column-1'];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(newTaskId);

    const newState = {
      ...state,
      tasks: {
        ...state.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...state.columns,
        'column-1': {
          ...column,
          taskIds: newTaskIds,
        },
      },
    };

    setState(newState);
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Kanban Taskboard</h1>
        <p className="text-gray-600 mt-2">Drag and drop tasks between columns to update their status</p>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Add New Task
        </button>
      </header>

      {isFormOpen && (
        <TaskForm onSubmit={addTask} onCancel={() => setIsFormOpen(false)} />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
            
            return (
              <Column 
                key={column.id} 
                column={column} 
                tasks={tasks} 
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;