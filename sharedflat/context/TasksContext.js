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

let today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const anotherDay = new Date(today);
anotherDay.setDate(anotherDay.getDate() + 5);

let initialTasks = [
  {
      id: 1, 
      name: 'Vaccum', 
      description: "Very cool task", 
      assignedTo: "Bob",
      due: today,
      uri: "https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg"
  },
  {
      id: 2,
      name: 'Wash Dishes',
      description: "Very cool task",
      assignedTo: "Bob",
      due: new Date(tomorrow),
      uri: "https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg"
  },
  { 
      id: 3,
      name: 'Cook for friends', 
      description: "Very cool task",
      assignedTo: "Me",
      due: new Date(anotherDay),
      uri: "https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg"
  }
];