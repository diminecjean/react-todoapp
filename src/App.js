import logo from './logo.svg';
import Task from './Task';
import TaskForm from './TaskForm';
import './App.css';
import { useState } from 'react';

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
  const [task, setTask] = useState([]); // using array
  return (
    <main>
      <div>
        <TaskForm />
        <Task />
        {task.map(task => { <Task {...Task} /> })}
      </div>
    </main>
  );
}

export default ToDoApp;
