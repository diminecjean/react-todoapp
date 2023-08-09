import React from 'react';
import Task from './component/Task';
import TaskForm from './component/TaskForm';
import './App.css';
import { useEffect, useState } from 'react';



function ToDoApp() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    else {
      setTheme('light');
    }
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };


  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0)
      return;
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    setTasks(tasks || []);
  }, [])


  // function to add a task
  function addTask(name, color) {
    setTasks(prev => {
      return [...prev, { name: name, done: false, color: color }];
    });
  }

  // function to remove a task from the array
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


  // function to edit task name
  function renameTask(taskIndex, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].name = newName;
      return newTasks;
    })
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  return (
    <main>
      <div>
        <h1>Task List </h1>
        <h2>
          <p>{numberComplete}/{numberTotal} ☑️</p>
          <progress value={numberComplete / numberTotal} />
        </h2>
        <TaskForm onAdd={addTask} />
        {tasks.map((task, index) =>
          <Task {...task}
            onToggle={done => updateTaskDone(index, done)}
            onTrash={() => removeTask(index)}
            onRename={newName => renameTask(index, newName)}
          />
        )}

      </div>
    </main >
  );
}

export default ToDoApp;
