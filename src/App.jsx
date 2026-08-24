import { useRef, useState } from 'react'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import { loadTasks, saveTasks } from './storage.js'

const VALID_PRIORITIES = ['baja', 'media', 'alta']

function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [saveFailed, setSaveFailed] = useState(false)
  const tasksRef = useRef(tasks)

  function persistTasks(updateTasks) {
    const nextTasks = updateTasks(tasksRef.current)
    tasksRef.current = nextTasks

    const didSave = saveTasks(nextTasks)
    setTasks(nextTasks)
    setSaveFailed(!didSave)
  }

  function addTask(text, priority) {
    const trimmedText = text.trim()
    if (!trimmedText) return

    const safePriority = VALID_PRIORITIES.includes(priority) ? priority : 'media'

    const newTask = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
      priority: safePriority,
      createdAt: Date.now(),
    }

    persistTasks((prevTasks) => [...prevTasks, newTask])
  }

  function toggleTask(id) {
    persistTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    )
  }

  function deleteTask(id) {
    persistTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Al Grano — Gestor de tareas</h1>
      </header>
      <main className="app__main">
        {saveFailed && (
          <p className="save-error" role="alert">
            No se han podido guardar los cambios en este navegador. Si recargas la página, podrías
            perderlos.
          </p>
        )}
        <TaskForm onAddTask={addTask} />
        <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
      </main>
    </div>
  )
}

export default App
