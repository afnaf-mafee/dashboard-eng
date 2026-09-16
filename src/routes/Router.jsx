import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home/Home";
import Students from "../pages/Students/Students";
import StudentProfile from "../pages/Students/StudentProfile";
import Attendance from "../pages/Attendance/Attendance";
import FeeCollection from "../pages/FeeCollection/FeeCollection";
import ResultManagement from "../pages/ResultManagement/ResultManagement";
import Batch from "../pages/Batch/Batch";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/students", element: <Students /> },
      { path: "/students", element: <Students /> },
      { path: "/attendance", element: <Attendance /> },
      {
        path: "/students-profile/:id",
        element: <StudentProfile />,
      }, {
        path: "/fee-collection",
        element: <FeeCollection/>,
      }, {
        path: "/result",
        element: <ResultManagement/>,
      },{
        path: "/batch",
        element: <Batch/>,
      },
    ],
  },
]);
