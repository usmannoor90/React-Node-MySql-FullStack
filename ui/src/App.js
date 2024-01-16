import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AccountLayout from "./Pages/layoutes/AccountLayout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Department from "./Pages/Department";
import Employee from "./Pages/Employee";
import Loading from "./Pages/Loading";
import ErrorPage from "./Pages/ErrorPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<AccountLayout />}>
            <Route index element={<Login />} />
            <Route path="signup/" element={<Signup />} />
            <Route path="home/" element={<Home />} />
            <Route path="department/" element={<Department />} />
            <Route path="employee/" element={<Employee />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
