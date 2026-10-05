import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ProjectTasks from "./pages/ProjectTasks";
import { AppProvider } from "./context/AppContext";
import AddTask from "./pages/AddTask";
import AddProject from "./pages/AddProject";


export default function App() {
  return (
    <AppProvider>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/project/:id" element={<ProjectTasks />} /> 
          <Route path="/add-task/:projectId?" element={<AddTask />} />
          <Route path="/add-project" element={<AddProject />} />

        </Routes>
      </MainLayout>
    </BrowserRouter>
    </AppProvider>
  );
}
