import AddTodo from './AddTodo.tsx'
import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../apis/task.ts'
import TaskList from './TaskList.tsx'

function App() {
  return (
    <>
      <AddTodo />
      <TaskList />
      
      <footer className="footer"></footer>
    </>
  )
}

export default App
