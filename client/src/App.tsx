import {
  Routes,
  Route,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";

import StudentForm from "./components/StudentForm";

import StudentList from "./components/StudentList";

function App() {
  return (
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
  );
}

export default App;