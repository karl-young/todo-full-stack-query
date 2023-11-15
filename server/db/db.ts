import db from './connection'
import { Task, TaskData } from '../../models/taskModels'

export async function getAllTasks(): Promise<Task[]> {
  const todo = await db('todos').select('*')
  return todo
}

export async function addTask(task: string): Promise<TaskData>{
  return db("todos").insert({task}).returning(["id", "task"])
}

export function deleteTask(id: number): Promise<void> {
  return db('todos').where('id', id).delete()
}

export function updateTask(id: number, task: string): Promise<Task | undefined> {
  return db('todos').where({id}).update({ task }).returning(["id", "task"])
}
