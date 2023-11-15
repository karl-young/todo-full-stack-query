import request from 'superagent'
import { Task, TaskData } from '../../models/taskModels'

// GET /api/v1/tasks
export async function getTasks(): Promise<Task[]> {
  const response = await request.get('/api/v1/tasks')
  return response.body.tasks
}

// POST /api/v1/tasks
export async function addTask(newTask: TaskData): Promise<Task> {
  const response = await request.post('/api/v1/tasks').send({ newTask })
  return response.body.task
}
