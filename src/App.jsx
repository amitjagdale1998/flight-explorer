import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import FetchData from "./component/FetchData";
import Home from "./component/Home";
import AdminHome from "./admin/AdminHome";
import BookNow from "./component/BookNow";
import ProtectedRoute from "./component/common/ProtectRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected User Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/getdata"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <FetchData />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booknow"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <BookNow />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
