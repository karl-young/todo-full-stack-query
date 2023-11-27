import * as db from '../db'
import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest'
import connection from '../connection'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(() => {
  connection.destroy()
})

describe('db', () => {
  it('should get all tasks', async () => {
    const tasks = await db.getAllTasks()
    expect(tasks.length).toBe(3)
    expect(tasks[0].id).toBe(1)
    expect(tasks[0].task).toBe('Dust')
    expect(Boolean(tasks[0].completed)).toBe(false) 
  }) 
  it('should add a task', async () => {
    const tasks = await db.getAllTasks()
    const fakeTask = {
      task: 'test task',
      completed: false,
    }
    
    const newTask = await db.addTask(fakeTask)
    const updatedTasks = await db.getAllTasks()
    expect(newTask.task).toBe(fakeTask.task)
    expect(tasks.length).toBe(3)
    expect(updatedTasks.length).toBe(4)
  })
  it('should update a task', async () => {
   await db.getAllTasks()
    const taskId = 1
    const newTaskName = 'new task name'
    await db.updateTask(taskId, newTaskName)

    const updatedTasks = await db.getAllTasks()
    const updatedTask = updatedTasks.find((task) => task.id === taskId)

    expect(updatedTask?.task).toBe(newTaskName)
    
  })
  it('should delete a task', async () => {
    const taskId = 1
    await db.deleteTask(taskId)
    const tasks = await db.getAllTasks()
    expect(tasks.length).toBe(2)
    expect(tasks.find((task) => task.id === taskId)).toBeUndefined()
  })
})
