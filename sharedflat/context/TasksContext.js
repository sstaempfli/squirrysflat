import { createContext, useContext, useReducer, useState } from 'react';

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

const NutsContext = createContext(null)
const setNutsContext = createContext(null)

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  const [ myNuts, setMyNuts ] = useState(100)

  return (
    <NutsContext.Provider value={myNuts}>
      <setNutsContext.Provider value={setMyNuts}>
        <TasksContext.Provider value={tasks}>
          <TasksDispatchContext.Provider value={dispatch}>
            {children}
          </TasksDispatchContext.Provider>
        </TasksContext.Provider>
      </setNutsContext.Provider>
    </NutsContext.Provider>
    
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useMyNuts(){
  return useContext(NutsContext)
}

export function useSetMyNuts(){
  return useContext(setNutsContext)
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
      key: '1',
      id: 1, 
      name: 'Vaccum', 
      description: "Very cool task", 
      assignedTo: "Lino",
      due: today,
      points: 2,
      uri: "https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg"
  },
  {
      key: '2',
      id: 2,
      name: 'Wash Dishes',
      description: "Very cool task",
      assignedTo: "Lino",
      due: new Date(tomorrow),
      points: 2,
      uri: "https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg"
  },
  { 
      key: '3',
      id: 3,
      name: 'Cook for friends', 
      description: "Very cool task",
      assignedTo: "You",
      due: new Date(anotherDay),
      points: 4,
      uri: "https://cdn.icon-icons.com/icons2/2716/PNG/512/user_circle_icon_172814.png"
  }
];