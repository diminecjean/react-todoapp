import React from 'react';
import Task from './component/Task';
import TaskForm from './component/TaskForm';
import './App.css';
import { useEffect, useState } from 'react';
// import uuid from 'react-uuid';
import axios from 'axios';
import uuid from 'react-uuid';


function ToDoApp() {

  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (tasks.length === 0)
      return;
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    setTasks(tasks || []);
  }, [])

  // -------------- API connection ----------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      await
        axios.get('http://localhost:8000/apis/v1/')
          .then(response => {
            setTasks(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    }
    fetchData();
  }, [counter])

  // function postTaskToAPI(task) {
  //   axios.post('http://localhost:8000/apis/v1/', task)
  //     .then(response => {
  //       console.log(response);
  //       setCounter(counter + 1);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // function deleteTaskFromAPI(taskId) {
  //   axios.delete(`https://jsonplaceholder.typicode.com/posts/${taskId}`)
  //     .then(response => {
  //       console.log(`Deleted post with ID ${taskId}`);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  // -------------- End of API connection ---------------------------------------


  // function to add a task
  function addTask(name, color) {
    const newTask = { id: uuid(), name: name, done: false, color: color };
    setTasks(prev => [...prev, newTask]);

    const postTaskToAPI = async (task) => {
      await
        axios.post('http://localhost:8000/apis/v1/', task)
          .then(response => {
            console.log(response);
            console.log("Task Added");
            setCounter(counter + 1);
          })
          .catch(error => {
            console.log(error);
          });
    }

    postTaskToAPI(newTask);
  }

  // function to remove a task from the array
  function removeTask(Task) {
    // setTasks(prev => {
    //   return prev.filter((taskObject, index) => index !== indexToRemove);
    // });
    const deleteTaskFromAPI = async (taskId) => {
      await
        axios.delete(`http://localhost:8000/apis/v1/${taskId}/`)
          .then(response => {
            console.log(`Deleted post with ID ${taskId}`);
            setCounter(counter + 1);
          })
          .catch(error => {
            console.error(error);
          });
    }

    deleteTaskFromAPI(Task.id);
  }

  // function to check a task as done
  function updateTaskDone(Task, newDone) {
    // setTasks(prev => {
    //   const newTasks = [...prev]; // create new array of tasks
    //   newTasks[taskIndex].done = newDone; // modifying the done property of newTasks[taskIndex]
    //   return newTasks;
    // });

    const updateDoneFromAPI = async (taskId, done) => {
      await
        axios.patch(`http://localhost:8000/apis/v1/${taskId}/`, {
          done: done,
        })
          .then(response => {
            console.log(`Toggle done (task ${taskId})`);
            setCounter(counter + 1);
          })
          .catch(error => {
            console.error(error);
          });
    }

    updateDoneFromAPI(Task.id, newDone);

  }

  // function to edit task name
  function renameTask(Task, newName) {
    // setTasks(prev => {
    //   const newTasks = [...prev];
    //   newTasks[taskIndex].name = newName;
    //   return newTasks;
    // })

    const updateRenameTaskFromAPI = async (taskId, name) => {
      await
        axios.patch(`http://localhost:8000/apis/v1/${taskId}/`, {
          name: name,
        })
          .then(response => {
            console.log(`Rename task ${taskId}`);
            setCounter(counter + 1);
          })
          .catch(error => {
            console.error(error);
          });
    }

    updateRenameTaskFromAPI(Task.id, newName);
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

        {tasks.map((task, id) =>
          <Task {...task} key={id}
            onToggle={done => updateTaskDone(task, done)}
            onTrash={() => removeTask(task)}
            onRename={newName => renameTask(task, newName)}
          />
        )}

      </div>
    </main >
  );
}

export default ToDoApp;
