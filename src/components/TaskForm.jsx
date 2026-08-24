import { useState } from 'react'

const PRIORITY_OPTIONS = [
  { value: 'baja', label: 'Baja' },
  { value: 'media', label: 'Media' },
  { value: 'alta', label: 'Alta' },
]

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('media')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAddTask(trimmed, priority)
    setText('')
    setPriority('media')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__field">
        <label htmlFor="task-name">Nombre de la tarea</label>
        <input
          id="task-name"
          name="task-name"
          type="text"
          placeholder="Ej. Comprar pan"
          autoComplete="off"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div className="task-form__field task-form__field--priority">
        <label htmlFor="task-priority">Prioridad</label>
        <select
          id="task-priority"
          name="task-priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="task-form__submit">
        Añadir
      </button>
    </form>
  )
}

export default TaskForm
