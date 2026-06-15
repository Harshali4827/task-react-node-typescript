import {
  Routes,
  Route,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";

import StudentForm from "./components/StudentForm";

import StudentList from "./components/StudentList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
       <Routes>
      <Route
        path="/"
        element={<LoginForm />}
      />

      <Route
        path="/students"
        element={<StudentList />}
      />

      <Route
        path="/register"
        element={<StudentForm />}
      />

      <Route
        path="/edit/:id"
        element={<StudentForm />}
      />
    </Routes>
    </>
  );
}

export default App;