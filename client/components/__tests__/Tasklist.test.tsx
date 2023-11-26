//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute  } from '../../test/setup'
import nock from 'nock'
import {waitForElementToBeRemoved,} from '@testing-library/react/pure'



const mockTasks = {
  tasks: [
    {
      id: 65,
      task: 'Cleaning',
      completed: false,
    },
    {
      id: 66,
      task: 'Dusting',
      completed: false,
    },
  ],
}

describe('TaskList', () => {
  it('should render loading message', async () => {
    nock('http://localhost').get('/api/v1/tasks').reply(200, mockTasks)

    const screen = renderRoute('/')
    const loadingMessage = screen.getByText('Loading...')
    expect(loadingMessage).toBeInTheDocument()
  })

  it('should render tasks', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/tasks')
      .reply(200, mockTasks)

    const screen = renderRoute('/') 

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

    const taskList = screen.getByRole('group')
    expect(taskList.children).toHaveLength(2)
    expect(taskList.children[0]).toHaveTextContent('Cleaning')

    expect(scope.isDone()).toBe(true)

  })

  it('should render error message', async () => {
    const scope = nock('http://localhost').get('/api/v1/tasks').reply(500)
    
    const screen = renderRoute('/')

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

    const error = screen.getByText("An error has occurred")

    expect(error).toBeVisible()
    expect (scope.isDone()).toBe(true)
  })
  
})
