import { describe, it, expect, vi, beforeEach} from 'vitest'
import request from 'supertest'
import server from '../../server'
import * as db from '../../db/db'

vi.mock('../../db/db')

beforeEach(async () => {
  vi.resetAllMocks()
})

describe('Routes', () => {
  it('GET /api/v1/tasks', async () => {
    vi.mocked(db.getAllTasks).mockResolvedValue([{
      id: 1,
      task: 'Dust',
      completed: false
    }])

    const response = await request(server).get("/api/v1/tasks")

    expect(response.statusCode).toBe(200)
    expect(vi.mocked(db.getAllTasks)).toBeCalled()
  })
  it('should return an error', async () => {
    vi.mocked(db.getAllTasks).mockRejectedValue(
      new Error('Something went wrong')
    )
      vi.spyOn(console, 'error').mockImplementation(() => {})

      const response = await request(server).get("/api/v1/tasks")

     
      expect(console.error).toBeCalledWith(
        new Error('Something went wrong')
        )
        
        expect(response.statusCode).toBe(500)
  })
})

describe("Post", () => {
  it('POST /api/v1/tasks', async () => {
    vi.mocked(db.addTask).mockResolvedValue({
      id: 1,
      task: 'Dust',
      completed: false
    })

    const response = await request(server).post("/api/v1/tasks").send({newTask:{task: 'Dust',
    completed: false}})

    expect(response.status).toBe(200)
    expect(response.body).toMatchInlineSnapshot(`
      {
        "completed": false,
        "id": 1,
        "task": "Dust",
      }
    `)
    
  })
 
})