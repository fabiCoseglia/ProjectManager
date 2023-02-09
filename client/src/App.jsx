import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { ConfirmAccount } from "./pages/ConfirmAccount";
import { ForgetPassword } from "./pages/ForgetPassword";
import { Login } from "./pages/Login";
import { RecoverPassword } from "./pages/RecoverPassword";
import { Register } from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/authProvider";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { Projects } from "./pages/Projects";
import { ProjectsProvider } from "./context/ProjectProvider";
import { ProjectAdd } from "./pages/ProjectAdd";
import { ProjectEdit } from "./pages/ProjectEdit";
import { Project } from "./pages/Project";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route
                path="recover-password/:token"
                element={<RecoverPassword />}
              />
              <Route path="confirm/:token" element={<ConfirmAccount />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
            <Route path="/projects" element={<ProtectedLayout />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<ProjectAdd />} />
              <Route path="edit-project/:id" element={<ProjectEdit />} />
              <Route path=":id" element={<Project />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
