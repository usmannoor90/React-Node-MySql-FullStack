import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AccountLayout from "./Pages/layoutes/AccountLayout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Employee from "./Pages/Employee";
import Loading from "./Pages/Loading";
import ErrorPage from "./Pages/ErrorPage";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "./Pages/layoutes/DashboardLayout";
import ProtectedRoute from "./Pages/layoutes/ProtectedRoute";

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<AccountLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard/" element={<DashboardLayout />}>
              <Route path="signup/" element={<Signup />} />
              <Route path="home/" element={<Home />} />
              <Route path="employee/" element={<Employee />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
