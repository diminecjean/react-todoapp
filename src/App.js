import Task from './Task';
import TaskForm from './TaskForm';
import './App.css';
import { useEffect, useState } from 'react';



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

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject, index) => index !== indexToRemove);
    });
  }

  // function to check a task as done
  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev]; // create new array of tasks
      newTasks[taskIndex].done = newDone; // modifying the done property of newTasks[taskIndex]
      return newTasks;
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  return (
    <main>
      <div>
        <h1>📝 Task List </h1>

        <h2>
          <progress value={numberComplete / numberTotal} />
        </h2>
        <TaskForm onAdd={addTask} />
        {tasks.map((task, index) =>
          <Task {...task}
            onToggle={done => updateTaskDone(index, done)}
            onTrash={() => removeTask(index)} />
        )}

      </div>
    </main>
  );
}

export default ToDoApp;
