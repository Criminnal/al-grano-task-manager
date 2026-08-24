function TaskItem({ task, onToggle, onDelete }) {
  const textClassName = task.completed
    ? 'task-item__text task-item__text--completed'
    : 'task-item__text'

  return (
    <li className="task-item">
      <label className="task-item__label">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <span className={textClassName}>{task.text}</span>
      </label>
      <button
        type="button"
        className="task-item__delete"
        aria-label={`Eliminar tarea: ${task.text}`}
        onClick={() => onDelete(task.id)}
      >
        Eliminar
      </button>
    </li>
  )
}

export default TaskItem
