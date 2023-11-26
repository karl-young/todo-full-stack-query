import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../apis/task.ts'
import { DeleteButton } from './Delete.tsx'

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
        <ul className="todo-list" role="group">
          {tasks.map((task, index) => (
            <li key={index} className="completed">
              <p>{task.task}</p>
              <div key={task.id}>
                <DeleteButton id={task.id} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default TaskList
