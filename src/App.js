// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import HomePage from "./Conponent/HomePage";
// import ChooseUser from "./Conponent/ChooseUser";
// import Login from "./Conponent/Login";
// import AdminDashboard from "./Admin/AdminDashboard";
// import AdminHomePage from "./Admin/AdminHomePage"; 
// import AddNotice from "./Admin/noticeRelated/AddNotice";
// import ShowNotices from "./Admin/noticeRelated/ShowNotices";
// import Logout from "./Admin/Logout"; 
// import TeacherDashboard from "./Teacher/TeacherDashboard";
// import TeacherHomePage from "./Teacher/TeacherHomePage";
// import StudentDashboard from "./Student/StudentDashboard";
// // import TeacherProfile from "./Teacher/TeacherProfile";
// // import TeacherClassDetails from "./Teacher/TeacherClassDetails";
// // import TeacherViewStudent from "./Teacher/TeacherViewStudent";
// // import StudentAttendance from "./Teacher/StudentAttendance";
// // import StudentExamMarks from "./Teacher/StudentExamMarks";
// // import StudentDashboard from "./Student/StudentDashboard";

// function App() {
//   return (
//     <React.Fragment>
//       <Router>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/Login" element={<ChooseUser />} />

//           {/* Login routes */}
//           <Route path="/Adminlogin" element={<Login role="Admin" />} />
//           <Route path="/Studentlogin" element={<Login role="Student" />} />
//           <Route path="/Teacherlogin" element={<Login role="Teacher" />} />

//           {/* AdminDashboard with child routes */}
//           <Route path="/Admin/dashboard/*" element={<AdminDashboard />}>
//             <Route path="" element={<AdminHomePage />} />
//             <Route path="Admin/addnotice" element={<AddNotice />} />
//             <Route path="Admin/notices" element={<ShowNotices />} />
//             <Route path="logout" element={<Logout />} />
//           </Route>


          
//           {/* TeacherDashboard with child routes */}
//           <Route path="/Teacher/dashboard/*" element={<TeacherDashboard />}>
//             <Route path="" element={<TeacherHomePage />} />
//         {/*    <Route path="profile" element={<TeacherProfile />} />
//             <Route path="class" element={<TeacherClassDetails />} />
//             <Route path="class/student/:id" element={<TeacherViewStudent />} />
//             <Route path="class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
//             <Route path="class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />*/} 
//             <Route path="logout" element={<Logout />} />
//           </Route>

//           {/* Other dashboard routes */}
//           <Route path="/Student/dashboard" element={<StudentDashboard />} />

//           {/* Logout route */}
//           <Route path="/logout" element={<Logout />} />
//         </Routes>
//       </Router>
//     </React.Fragment>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
import StudentDashboard from "./Student/StudentDashboard";

// Import class-related components
import AddClass from "./Admin/classRelated/AddClass";
// import ClassDetails from "./Admin/noticeRelated/ClassDetails";
// import ShowClasses from "./Admin/classRelated/ShowClasses";
// import ClassDetails from "./Admin/classRelated/ClassDetails";
// import AddStudent from "./Admin/classRelated/AddStudent";

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
            <Route path="" element={<AdminHomePage />} />
            <Route path="addnotice" element={<AddNotice />} />
            <Route path="Admin/notices" element={<ShowNotices />} />
            <Route path="Admin/addnotice" element={<AddNotice />} />


            {/* Class-related routes */}
           {/*   <Route path="classes/class/:id" element={<ClassDetails />} /> */}
            <Route path="Admin/classes" element={<AddClass />} />
         {/*    <Route path="classes" element={<ShowClasses />} />
            <Route path="class/addstudents/:id" element={<AddStudent situation="Class" />} />*/}
            

            <Route path="logout" element={<Logout />} />
          </Route>

          {/* TeacherDashboard with child routes */}
          <Route path="/Teacher/dashboard/*" element={<TeacherDashboard />}>
            <Route path="" element={<TeacherHomePage />} />
            {/* Additional teacher routes can be added here */}
            <Route path="logout" element={<Logout />} />
          </Route>

          {/* Other dashboard routes */}
          <Route path="/Student/dashboard" element={<StudentDashboard />} />

          {/* Logout route */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
