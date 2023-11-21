import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'add': {
      return [...tasks, {
        id: action.id,
        name: action.name,
        assignedTo: action.assignedTo,
        description: action.text,
        due: action.due,
      }];
    }
    case 'change': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'delete': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const today = new Date();

const initialTasks = [
    {
        id: 0, 
        name: 'Philosopher’s Path', 
        description: "Very cool task", 
        assignedTo: "Bob",
        due: today 
    },
    {
        id: 1,
        name: 'Visit the temple',
        description: "Very cool task",
        assignedTo: "Bob",
        due: new Date(today.getDate() + 1)
    },
    { 
        id: 2,
        name: 'Drink matcha', 
        description: "Very cool task",
        assignedTo: "Laura",
        due: new Date(today.getDate() + 3)
    }
];
