import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoList from '@/components/TodoList'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
