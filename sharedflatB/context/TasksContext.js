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
        key: action.task.key,
        uri: action.task.uri,
        points: action.task.points,
        repeat: action.task.repeat,
        id: action.task.id,
        name: action.task.name,
        assignedTo: action.task.assignedTo,
        description: action.task.description,
        due: action.task.due,
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
    description: "just vacuum the living room and the kitchen!", 
    assignedTo: "You",
    due: today,
    points: 2,
    repeat: "Weekly",
    uri: "https://cdn.icon-icons.com/icons2/2716/PNG/512/user_circle_icon_172814.png"
  },
  { 
    key: '3',
    id: 3,
    name: 'Cook for friends', 
    description: "Buy dough and Mushrooms for the Pizza and don’t forget that Lino and Sara are Vegetarians!",
    assignedTo: "Lara",
    repeat: "Never",
    due: new Date(anotherDay),
    points: 4,
    uri: "https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg"
  },
  {
    key: '2',
    id: 2,
    name: 'Wash Dishes',
    description: "put the plates in the dishwasher except for Sara’s special plates with the frogs on it 🐸",
    assignedTo: "You",
    due: new Date(tomorrow),
    points: 2,
    repeat: "Daily",
    uri: "https://cdn.icon-icons.com/icons2/2716/PNG/512/user_circle_icon_172814.png"
  },
  {
    key: '100',
    id: 100,
    name: 'Clean Bathroom',
    description: "clean the sink, toilet, floor and the bathtub it’s DISGUSTING!",
    assignedTo: "Lino",
    due: new Date(anotherDay),
    points: 4,
    repeat: "Weekly",
    uri: "https://t4.ftcdn.net/jpg/02/45/56/35/360_F_245563558_XH9Pe5LJI2kr7VQuzQKAjAbz9PAyejG1.jpg"
  },
];