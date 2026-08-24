import TaskItem from './TaskItem.jsx'

function TaskList({ tasks = [] }) {
  if (tasks.length === 0) {
    return <p className="task-list__empty">Todavía no tienes tareas. Añade la primera arriba.</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}

export default TaskList
