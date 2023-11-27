import { beforeEach, expect } from 'vitest'
import { cleanup, render } from '@testing-library/react/pure'
import userEvent from '@testing-library/user-event'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../components/App'

beforeEach(cleanup)
expect.extend(matchers)

export function renderRoute() {
  const user = userEvent.setup()
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
  return { user, ...screen }
}
