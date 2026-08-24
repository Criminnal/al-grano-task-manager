function TaskForm() {
  return (
    <form className="task-form" onSubmit={(event) => event.preventDefault()}>
      <div className="task-form__field">
        <label htmlFor="task-name">Nombre de la tarea</label>
        <input
          id="task-name"
          name="task-name"
          type="text"
          placeholder="Ej. Comprar pan"
          autoComplete="off"
        />
      </div>
      <button type="submit" className="task-form__submit">
        Añadir
      </button>
    </form>
  )
}

export default TaskForm
