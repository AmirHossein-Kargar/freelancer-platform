// ? auth
// ? auth user via OTP : one time password
// ? 1. form => getOTP => input, button => phoneNumber => send OTP
// ? form => checkOTP => request => ... ?? 
// ? complete profile

// ? request => axios (useState,)
// ? useFetch(data, loading, error)
// ? React-Query => redux (remote state)

import { Route, Routes } from "react-router-dom"
import Auth from "./components/Auth/Auth"

function App() {

  return <Routes>
    <Route path="/auth" element={<Auth />} />
  </Routes>
}

export default App
