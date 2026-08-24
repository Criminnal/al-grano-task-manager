import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Al Grano — Gestor de tareas</h1>
      </header>
      <main className="app__main">
        <TaskForm />
        <TaskList />
      </main>
    </div>
  )
}

export default App
