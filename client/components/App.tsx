import AddTodo from './AddTodo.tsx'
import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../apis/task.ts'
import TaskList from './TaskList.tsx'

function App() {
  return (
    <>
      <TaskList />
      <AddTodo />

      <footer className="footer"></footer>
    </>
  )
}

export default App
