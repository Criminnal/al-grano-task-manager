import { useState } from 'react'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'

function App() {
  const [tasks, setTasks] = useState([])

  function addTask(text) {
    const trimmedText = text.trim()
    if (!trimmedText) return

    const newTask = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
      createdAt: Date.now(),
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  function toggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    )
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Al Grano — Gestor de tareas</h1>
      </header>
      <main className="app__main">
        <TaskForm onAddTask={addTask} />
        <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
      </main>
    </div>
  )
}

export default App
