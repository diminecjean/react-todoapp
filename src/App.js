import logo from './logo.svg';
import Task from './Task';
import TaskForm from './TaskForm';
import './App.css';
import { useEffect, useState } from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

function ToDoApp() {
  const [tasks, setTasks] = useState([]); // using array

  useEffect(() => {
    if (tasks.length === 0)
      return;
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    setTasks(tasks);
  }, [])


  // function to add a task
  function addTask(name) {
    setTasks(prev => { return [...prev, { name: name, done: false }]; });
  }

  // function to check a task as done
  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev]; // create new array of tasks
      newTasks[taskIndex].done = newDone; // modifying the done property of newTasks[taskIndex]
      return newTasks;
    });
  }

  return (
    <main>
      <div>
        <TaskForm onAdd={addTask} />
        {tasks.map((task, index) =>
          <Task {...task} onToggle={done => updateTaskDone(index, done)} />
        )}
      </div>
    </main>
  );
}

export default ToDoApp;
