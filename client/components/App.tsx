import AddTodo from './AddTodo.tsx'
import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../apis/task.ts'
import { Link } from 'react-router-dom'

function App() {
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
        <AddTodo />
      </header>
      <section className="main">
        <ul className="todo-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <p>
                <Link to={`/tasks/${task.id}`}> {task.task} {task.completed}</Link>
              </p>
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
