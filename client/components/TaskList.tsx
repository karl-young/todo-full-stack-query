import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../apis/task.ts'

function TaskList() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({ queryKey: ['tasks'], queryFn: getTasks })

  if (error) {
    return <p>An error has occurred</p>
  }

  if (isLoading || !tasks) {
    return <p>Loading...</p>
  }

  return (
    <>
      <header className="header">
        <h1>Task List</h1>
      </header>
      <section className="main">
        <ul className="todo-list">
          {tasks.map((task) => (
            <li key={task.id} className="completed">
              <p>
                {task.task}

                {task.completed}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default TaskList
