import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import HomePage from "./Conponent/HomePage";
import ChooseUser from "./Conponent/ChooseUser";
import Login from "./Conponent/Login";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminHomePage from "./Admin/AdminHomePage";
import AddNotice from "./Admin/noticeRelated/AddNotice";
import ShowNotices from "./Admin/noticeRelated/ShowNotices";
import Logout from "./Admin/Logout";
import TeacherDashboard from "./Teacher/TeacherDashboard";
import TeacherHomePage from "./Teacher/TeacherHomePage";
import TeacherProfile from "./Teacher/TeacherProfile";
import AddClass from "./Admin/classRelated/AddClass";
import ShowSubjects from "./Admin/subjectRelated/ShowSubjects";

// import TeacherComplain from "./Teacher/TeacherComplain";
// import TeacherClassDetails from "./Teacher/TeacherClassDetails";
// import TeacherViewStudent from "./Teacher/TeacherViewStudent";
// import StudentAttendance from "./Teacher/StudentAttendance";
// import StudentExamMarks from "./Teacher/StudentExamMarks";
// import StudentDashboard from "./Student/StudentDashboard";
import StudentDashboard from "./Student/StudentDashboard";
import ShowClasses from "./Admin/classRelated/ShowClasses";
import AdminProfile from "./Admin/AdminProfile";
import ShowStudents from "./Admin/studentRelated/ShowStudents";
import ShowTeachers from "./Admin/teacherRelated/ShowTeachers";
import SeeComplains from "./Admin/studentRelated/SeeComplains";
import StudentProfile from "./Student/StudentProfile";
import StudentHomePage from "./Student/StudentHomePage";
import StudentComplain from "./Student/StudentComplain";
import StudentSubjects from "./Student/StudentSubjects";
import ChooseClass from "./Admin/teacherRelated/ChooseClass";
import TeacherDetails from "./Admin/teacherRelated/TeacherDetails";
import ClassDetails from "./Admin/classRelated/ClassDetails";
import TeacherComplain from "./Teacher/TeacherComplain";
import ViewStudent from "./Admin/studentRelated/ViewStudent";
import SubjectForm from "./Admin/subjectRelated/SubjectForm";
import AddStudent from "./Admin/studentRelated/AddStudent";
import ChooseSubject from './Admin/teacherRelated/ChooseSubject'




function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<ChooseUser />} />

          {/* Login routes */}
          <Route path="/Adminlogin" element={<Login role="Admin" />} />
          <Route path="/Studentlogin" element={<Login role="Student" />} />
          <Route path="/Teacherlogin" element={<Login role="Teacher" />} />

          {/* AdminDashboard with child routes */}
          <Route path="/Admin/dashboard/*" element={<AdminDashboard />}>
            <Route index element={<AdminHomePage />} />
            <Route path="Admin/notices" element={<ShowNotices />} />

            <Route path="addnotice" element={<AddNotice />} />
            {/* <Route path="Admin/classes" element={<ShowClasses />}>
              <Route path="addclass" element={<AddClass />}>
                <Route path="class/:id" element={<ClassDetails />} />
              </Route>
            </Route> */}

            <Route path="Admin/classes" element={<ShowClasses />} />
            <Route path="Admin/addclass" element={<AddClass />} />
            <Route path="Time/:id" element={<ClassDetails />} />

            <Route path="Admin/complains" element={<SeeComplains />} />
            <Route path="Admin/profile" element={<AdminProfile />} />
            <Route path="Admin/subjects" element={<ShowSubjects />} />
            <Route path="Admin/students" element={<ShowStudents />} />
            <Route path="Admin/teachers" element={<ShowTeachers />} />
            <Route
              path="chooseclass"
              element={<ChooseClass situation="Teacher" />}
            />
            <Route
              path="Admin/class/subject/:id/:id"
              element={<ViewStudent />}
            />
            <Route path="Admin/addsubject/:id" element={<SubjectForm />} />
            <Route
              path="class/addstudents/:id"
              element={<AddStudent situation="Class" />}
            />
            <Route
              path="teachers/choosesubject/:id"
              element={<ChooseSubject situation="Norm" />}
            />

            {/* <Route path="classes" element={<AddClass />} /> */}
            {/* Add other routes as needed */}

            <Route path="logout" element={<Logout />} />
          </Route>

          {/* TeacherDashboard with child routes */}
          <Route path="/Teacher/dashboard/*" element={<TeacherDashboard />}>
            <Route index element={<TeacherHomePage />} />
            <Route path="Teacher/profile" element={<TeacherProfile />} />
            <Route
              path="Admin/teachers/teacher/:id"
              element={<TeacherDetails />}
            />
            <Route
              path="chooseclass"
              element={<ChooseClass situation="Subject" />}
            />
            <Route path="Teacher/complain" element={<TeacherComplain />} />

            {/* <Route path="complain" element={<TeacherComplain />} /> */}
            {/* <Route path="class" element={<TeacherClassDetails />} /> */}
            {/* <Route path="class/student/:id" element={<TeacherViewStudent />} /> */}
            {/* <Route path="class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} /> */}
            {/* <Route path="class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} /> */}
            <Route path="logout" element={<Logout />} />
          </Route>

          {/* StudentDashboard */}
          <Route path="/Student/dashboard" element={<StudentDashboard />}>
            <Route index element={<StudentHomePage />} />
            {/* <Route path="subjects" element={<StudentSubjects />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="complain" element={<StudentComplain />} />*/}
            <Route path="Student/profile" element={<StudentProfile />} />
            <Route path="Student/complain" element={<StudentComplain />} />
            <Route path="Student/subjects" element={<StudentSubjects />} />
          </Route>

          {/* General Logout route */}
          <Route path="/logout" element={<Logout />} />

          {/* Redirect unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Homepage from "./pages/Homepage";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import StudentDashboard from "./pages/student/StudentDashboard";
// import TeacherDashboard from "./pages/teacher/TeacherDashboard";
// import LoginPage from "./pages/LoginPage";
// import AdminRegisterPage from "./pages/admin/AdminRegisterPage";
// import ChooseUser from "./pages/ChooseUser";

// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import { AppBar, Drawer } from '../../components/styles';
// import Logout from '../Logout';
// import SideBar from './SideBar';
// import AdminProfile from './AdminProfile';
// import AdminHomePage from './AdminHomePage';

// import AddStudent from './studentRelated/AddStudent';
// import SeeComplains from './studentRelated/SeeComplains';
// import ShowStudents from './studentRelated/ShowStudents';
// import StudentAttendance from './studentRelated/StudentAttendance';
// import StudentExamMarks from './studentRelated/StudentExamMarks';
// import ViewStudent from './studentRelated/ViewStudent';

// import AddNotice from './noticeRelated/AddNotice';
// import ShowNotices from './noticeRelated/ShowNotices';

// import ShowSubjects from './subjectRelated/ShowSubjects';
// import SubjectForm from './subjectRelated/SubjectForm';
// import ViewSubject from './subjectRelated/ViewSubject';

// import AddTeacher from './teacherRelated/AddTeacher';
// import ChooseClass from './teacherRelated/ChooseClass';
// import ChooseSubject from './teacherRelated/ChooseSubject';
// import ShowTeachers from './teacherRelated/ShowTeachers';
// import TeacherDetails from './teacherRelated/TeacherDetails';

// import AddClass from './classRelated/AddClass';
// import ClassDetails from './classRelated/ClassDetails';
// import AccountMenu from '../../components/AccountMenu';

// import TeacherSideBar from './TeacherSideBar';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import Logout from '../Logout'
// import AccountMenu from '../../components/AccountMenu';
// import { AppBar, Drawer } from '../../components/styles';
// import StudentAttendance from '../admin/studentRelated/StudentAttendance';

// import TeacherClassDetails from './TeacherClassDetails';
// import TeacherComplain from './TeacherComplain';
// import TeacherHomePage from './TeacherHomePage';
// import TeacherProfile from './TeacherProfile';
// import TeacherViewStudent from './TeacherViewStudent';
// import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import StudentSideBar from './StudentSideBar';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import StudentHomePage from './StudentHomePage';
// import StudentProfile from './StudentProfile';
// import StudentSubjects from './StudentSubjects';
// import ViewStdAttendance from './ViewStdAttendance';
// import StudentComplain from './StudentComplain';
// import Logout from '../Logout'
// import AccountMenu from '../../components/AccountMenu';
// import { AppBar, Drawer } from '../../components/styles';

// <Routes>
// <Route path="/" element={<StudentHomePage />} />
// <Route path='*' element={<Navigate to="/" />} />
// <Route path="/Student/dashboard" element={<StudentHomePage />} />

// <Route path="/Student/subjects" element={<StudentSubjects />} />
// <Route path="/Student/attendance" element={<ViewStdAttendance />} />
// <Route path="/Student/complain" element={<StudentComplain />} />

// <Route path="/logout" element={<Logout />} />
// </Routes>

// const App = () => {
//   const { currentRole } = useSelector((state) => state.user);

//   return (
//     <React.Fragment>
//       <Router>
//         {currentRole === null && (
//           <Routes>
//             <Route path="/" element={<Homepage />} />
//             <Route path="/choose" element={<ChooseUser visitor="normal" />} />
//             <Route
//               path="/chooseasguest"
//               element={<ChooseUser visitor="guest" />}
//             />

//             <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
//             <Route
//               path="/Studentlogin"
//               element={<LoginPage role="Student" />}
//             />
//             <Route
//               path="/Teacherlogin"
//               element={<LoginPage role="Teacher" />}
//             />

//             <Route path="/Adminregister" element={<AdminRegisterPage />} />

//             <Route path="*" element={<Navigate to="/" />} />
//             <Routes>
//             <Route path="/" element={<TeacherHomePage />} />
//             <Route path='*' element={<Navigate to="/" />} />
//             <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
//             <Route path="/Teacher/profile" element={<TeacherProfile />} />

//             <Route path="/Teacher/complain" element={<TeacherComplain />} />

//             <Route path="/Teacher/class" element={<TeacherClassDetails />} />
//             <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />

//             <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
//             <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

//             <Route path="/logout" element={<Logout />} />
//             <Routes>
//             <Route path="/" element={<AdminHomePage />} />
//             <Route path='*' element={<Navigate to="/" />} />
//             <Route path="/Admin/dashboard" element={<AdminHomePage />} />
//             <Route path="/Admin/profile" element={<AdminProfile />} />
//             <Route path="/Admin/complains" element={<SeeComplains />} />

//             {/* Notice */}
//             <Route path="/Admin/addnotice" element={<AddNotice />} />
//             <Route path="/Admin/notices" element={<ShowNotices />} />

//             {/* Subject */}
//             <Route path="/Admin/subjects" element={<ShowSubjects />} />
//             <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
//             <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />

//             <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
//             <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />

//             <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
//             <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

//             {/* Class */}
//             <Route path="/Admin/addclass" element={<AddClass />} />
//             <Route path="/Admin/classes" element={<ShowClasses />} />
//             <Route path="class/:id" element={<ClassDetails />} />
//             <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

//             {/* Student */}
//             <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
//             <Route path="/Admin/students" element={<ShowStudents />} />
//             <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
//             <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
//             <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

//             {/* Teacher */}
//             <Route path="/Admin/teachers" element={<ShowTeachers />} />
//             <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
//             <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
//             <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
//             <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
//             <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

//             <Route path="/logout" element={<Logout />} />
//         </Routes>
//         </Routes>
//           </Routes>

//         )}

//         {currentRole === "Admin" && (
//           <>
//             <AdminDashboard />
//           </>
//         )}

//         {currentRole === "Student" && (
//           <>
//             <StudentDashboard />
//           </>
//         )}

//         {currentRole === "Teacher" && (
//           <>
//             <TeacherDashboard />
//           </>
//         )}
//       </Router>
//     </React.Fragment>
//   );
// };

// export default App;
