import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAddTask(trimmed)
    setText('')
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
      <button type="submit" className="task-form__submit">
        Añadir
      </button>
    </form>
  )
}

export default TaskForm
