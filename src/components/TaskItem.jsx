function TaskItem({ task }) {
  return (
    <li className="task-item">
      <label className="task-item__label">
        <input type="checkbox" checked={task.completed} readOnly />
        <span className="task-item__text">{task.text}</span>
      </label>
      <button
        type="button"
        className="task-item__delete"
        aria-label={`Eliminar tarea: ${task.text}`}
      >
        Eliminar
      </button>
    </li>
  )
}

export default TaskItem
