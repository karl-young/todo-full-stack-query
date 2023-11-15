import express from 'express'
import * as db from '../db/db'
import { Task, TaskData } from '../../models/taskModels'

const router = express.Router()

//  GET /api/v1/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await db.getAllTasks()
    res.json({ tasks })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

// POST /api/v1/tasks
router.post('/', async (req, res) => {
  try {
    const { task } = req.body

    if (!task) {
      res.sendStatus(400)
      return
    }

    const newTask = await db.addTask(task)
    res.json(newTask)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})
