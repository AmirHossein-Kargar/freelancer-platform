// ? auth
// ? auth user via OTP : one time password
// ? 1. form => getOTP => input, button => phoneNumber => send OTP
// ? form => checkOTP => request => ... ?? 
// ? complete profile

// ? request => axios (useState,)
// ? useFetch(data, loading, error)
// ? React-Query => redux (remote state)

import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import Auth from "./pages/Auth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CompleteProfile from "./pages/CompleteProfile";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Subscription from "./pages/Subscription";
import AppLayout from "./ui/AppLayout";
import ApiDocs from "./features/api/ApiDocs";
import DashBoard from "./features/dashboard/owner/DashBoard";
import Dashboard from "./features/dashboard/freelancer/Dashboard";
import Projects from "./features/dashboard/owner/Projects";
import Project from "./pages/Project";

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>
    <>
      <Toaster
        toastOptions={{
          className: 'dark:!bg-secondary-800 dark:!text-secondary-100 dark:!border-secondary-700',
          style: {
            background: 'rgb(var(--color-secondary-0) / 1)',
            color: 'rgb(var(--color-secondary-900) / 1)',
            border: '1px solid rgb(var(--color-secondary-200) / 1)',
          },
        }}
      />
      <Routes>

        <Route path="/owner" element={<AppLayout />}>

          <Route index element={<Navigate to="dashboard" replace/>} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<Project />} />

        </Route>

        {/* Routes without Header */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/" element={<Home />} />
        <Route path="/Subscription" element={<Subscription />} />
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  </QueryClientProvider>
}

export default App
