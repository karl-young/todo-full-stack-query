import db from './connection'
import { Task, TaskData } from '../../models/taskModels'

export async function getAllTasks(): Promise<Task[]> {
  const todo = await db('tasks').select('*')
  return todo
}

export async function addTask(task: string): Promise<TaskData> {
  return db('tasks').insert({ task }).returning(['id', 'task', 'completed'])
}

export function deleteTask(id: number): Promise<void> {
  return db('tasks').where('id', id).delete()
}

export function updateTask(
  id: number,
  task: string
): Promise<Task | undefined> {
  return db('tasks')
    .where({ id })
    .update({ task })
    .returning(['id', 'task', 'completed'])
}
