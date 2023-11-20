import request from 'superagent'
import { Task, TaskData } from '../../models/taskModels'

// GET /api/v1/tasks
export async function getTasks(): Promise<Task[]> {
  const response = await request.get('/api/v1/tasks')
  // console.log(response.body, 'this is getTasks')
  return response.body.tasks
}

// POST /api/v1/tasks
export async function addTask(newTask: TaskData): Promise<Task> {
  const response = await request.post('/api/v1/tasks').send({ newTask })
  return response.body.newTask
}

export async function deleteTask(id: number): Promise<void> {
  await request.delete(`/api/v1/tasks/${id}`)
}
