import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../ui/AppLayout";
import Auth from "../pages/Auth";
import CompleteProfile from "../pages/CompleteProfile";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Subscription from "../pages/Subscription";
import ApiDocs from "../features/api/ApiDocs";
import DashBoard from "../features/dashboard/owner/DashBoard";
import Projects from "../pages/Projects";
import Project from "../pages/Project";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/owner" element={<AppLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<Project />} />
      </Route>

      <Route path="/auth" element={<Auth />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/" element={<Home />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/api-docs" element={<ApiDocs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
