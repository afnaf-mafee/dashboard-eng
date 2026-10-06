import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home/Home";
import Students from "../pages/Students/Students";
import StudentProfile from "../pages/Students/StudentProfile";
import Attendance from "../pages/Attendance/Attendance";
import FeeCollection from "../pages/FeeCollection/FeeCollection";
import ResultManagement from "../pages/ResultManagement/ResultManagement";
import Batch from "../pages/Batch/Batch";
import Login from "../pages/Login/Login";
import FeeHistory from "../pages/FeeHistory/FeeHistory";
import CreateUser from "../pages/CreateUser/CreateUser";
import PrivateRoute from "./PrivateRoute";
import ResultRanking from "../pages/ResultRanking/ResultRanking";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/students",
        element: <Students />,
      },

      {
        path: "/attendance",
        element: <Attendance />,
      },

      {
        path: "/students-profile/:id",
        element: <StudentProfile />,
      },

      {
        path: "/fee-history",
        element: <FeeHistory />,
      },

      {
        path: "/fee-collection",
        element: <FeeCollection />,
      },

      {
        path: "/result",
        element: <ResultManagement />,
      },
      {
        path: "/result-ranking",
        element: <ResultRanking />,
      },
    ],
  },

  // Public Routes

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/create-user",
    element: <CreateUser />,
  },
]);
