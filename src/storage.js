const STORAGE_KEY = 'al-grano-tasks'
const VALID_PRIORITIES = ['baja', 'media', 'alta']

function isValidTask(value) {
  if (typeof value !== 'object' || value === null) return false
  const { id, text, completed, priority, createdAt } = value

  return (
    typeof id === 'string' &&
    id.length > 0 &&
    typeof text === 'string' &&
    text.trim().length > 0 &&
    typeof completed === 'boolean' &&
    VALID_PRIORITIES.includes(priority) &&
    typeof createdAt === 'number' &&
    Number.isFinite(createdAt)
  )
}

// Política: se filtran las entradas inválidas o con id duplicado y se conservan las
// válidas, en vez de descartar el array completo por una sola entrada corrupta.
function sanitizeTasks(parsed) {
  if (!Array.isArray(parsed)) return []

  const seenIds = new Set()
  const validTasks = []

  for (const item of parsed) {
    if (!isValidTask(item) || seenIds.has(item.id)) continue
    seenIds.add(item.id)
    validTasks.push({
      id: item.id,
      text: item.text.trim(),
      completed: item.completed,
      priority: item.priority,
      createdAt: item.createdAt,
    })
  }

  return validTasks
}

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return sanitizeTasks(JSON.parse(raw))
  } catch {
    return []
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    return true
  } catch {
    // el almacenamiento puede fallar (cuota excedida, modo privado); no debe romper la app
    return false
  }
}
