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
          success: {
            style: {
              background: 'rgb(17 24 39)',
              color: 'rgb(249 250 251)',
            },
          },
          error: {
            style: {
              background: 'rgb(17 24 39)',
              color: 'rgb(249 250 251)',
            },
          },
          style: {
            background: 'rgb(17 24 39)',
            color: 'rgb(249 250 251)',
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
