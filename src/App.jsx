import React, { useEffect } from 'react'
import Taskform from './Components/Taskform'
import TaskList from './Components/TaskList'
import Progresstracker from './Components/Progresstracker'

import SearchBar from "./Components/SearchBar";

import { useState } from 'react'
import "./Style.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => { localStorage.setItem("tasks", JSON.stringify(tasks))
  });

  const addTask = (task) => {
    setTasks([...tasks,task]);
  }

  const updateTask = (updateTask, index) => {
    const newtask = [...tasks];
    newtask[index] = updateTask;
    setTasks(newtask);

  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i != index))
    
  }

  const clearTasks = () => {
    setTasks([]);
  }
  return (
    <div className='App'>
      <header>
      <h1 className='title'>Task Focus</h1>
      <p className='tagline'>Our Friendly TaskManager</p>
      </header>
      <Taskform addTask={addTask}/>

      <SearchBar setSearch={setSearch} />

     <TaskList 
  tasks ={tasks.filter(t => t.text.toLowerCase().includes(search.toLowerCase()))}
  updateTask = {updateTask}
  deleteTask={deleteTask}
/>

          <Progresstracker tasks = {tasks}/>

      {/* ✅ Task Stats Dashboard – only added, nothing changed above */}
      <div className="stats-dashboard">
        <h3>Task Summary</h3>
        <div className="stats-grid">
          <div className="stat-card total">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-value">{tasks.length}</span>
          </div>
          <div className="stat-card completed">
            <span className="stat-label">Completed</span>
            <span className="stat-value">
              {tasks.filter(t => t.completed).length}
            </span>
          </div>
          <div className="stat-card pending">
            <span className="stat-label">Pending</span>
            <span className="stat-value">
              {tasks.filter(t => !t.completed).length}
            </span>
          </div>
          <div className="stat-card rate">
            <span className="stat-label">Completion Rate</span>
            <span className="stat-value">
              {tasks.length === 0 
                ? "0%" 
                : `${Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%`}
            </span>
          </div>
        </div>
      </div>

      {tasks.length>0 && <button onClick={clearTasks} className='clear-btn'>Clear all tasks</button>}


      
      
    </div>
  )
}
