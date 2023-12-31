// eslint-disable-next-line no-unused-vars
import { ChangeEvent, FormEvent, useState } from 'react'
import { TaskData } from '../../models/taskModels'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '../apis/task'

const initialFormData = {
  task: '',
  completed: false,
}

function AddTodo() {
  const [form, setForm] = useState<TaskData>(initialFormData)
  const queryClient = useQueryClient()

  const taskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    taskMutation.mutate(form)
    setForm(initialFormData)
  }

  if (taskMutation.isLoading) {
    return <p>Adding Task</p>
  }

  if ( taskMutation.isError) {
    return <p>Error</p>
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">Task:</label>
        <input
          id="task"
          type='text'
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={handleChange}
          name="task"
          value={form.task}
        />
      </form>
    </>
  )
}

export default AddTodo
