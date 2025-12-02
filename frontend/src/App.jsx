// ? auth
// ? auth user via OTP : one time password
// ? 1. form => getOTP => input, button => phoneNumber => send OTP
// ? form => checkOTP => request => ... ?? 
// ? complete profile

// ? request => axios (useState,)
// ? useFetch(data, loading, error)
// ? React-Query => redux (remote state)

import { Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import Auth from "./pages/Auth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>
    <>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            background: 'rgb(var(--color-secondary-0) / 1)',
            color: 'rgb(var(--color-secondary-900) / 1)',
            border: '1px solid rgb(var(--color-secondary-200) / 1)',
          },
        }}
      />
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  </QueryClientProvider>
}

export default App
