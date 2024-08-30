import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Typography, Tab, Tabs, IconButton } from '@mui/material';
import { BlueButton, GreenButton, PurpleButton } from "../../Conponent/buttonStyles";
import TableTemplate from "../../Conponent/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../Conponent/SpeedDialTemplate";
import Popup from "../../Conponent/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
import axios from 'axios';

const ClassDetails = () => {
    const params = useParams();
    const navigate = useNavigate();

    const classID = params.id;

    const [subjectsList, setSubjectsList] = useState([]);
    const [sclassStudents, setSclassStudents] = useState([]);
    const [sclassDetails, setSclassDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(false);
    const [getresponse, setGetResponse] = useState(false);
    const [value, setValue] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const classDetails = await axios.get(`http://localhost:5000/api/classes/${classID}/details`);
                const subjectList = await axios.get(`http://localhost:5000/api/classes/${classID}/subjects`);
                const classStudents = await axios.get(`http://localhost:5000/api/classes/${classID}/students`);

                setSclassDetails(classDetails.data);
                setSubjectsList(subjectList.data);
                setSclassStudents(classStudents.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchClassDetails();
    }, [classID]);

    if (error) {
        console.log(error);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ];

    const subjectRows = subjectsList.map((subject) => ({
        name: subject.subName,
        code: subject.subCode,
        id: subject._id,
    }));

    const SubjectsButtonHaver = ({ row }) => (
        <div>
            <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                <DeleteIcon color="error" />
            </IconButton>
            <BlueButton
                variant="contained"
                onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
            >
                View
            </BlueButton>
        </div>
    );

    const subjectActions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate(`/Admin/addsubject/${classID}`)
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => (
        <>
            {response ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate(`/Admin/addsubject/${classID}`)}
                    >
                        Add Subjects
                    </GreenButton>
                </Box>
            ) : (
                <>
                    <Typography variant="h5" gutterBottom>
                        Subjects List:
                    </Typography>
                    <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                    <SpeedDialTemplate actions={subjectActions} />
                </>
            )}
        </>
    );

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ];

    const studentRows = sclassStudents.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    }));

    const StudentsButtonHaver = ({ row }) => (
        <div>
            <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                <PersonRemoveIcon color="error" />
            </IconButton>
            <BlueButton
                variant="contained"
                onClick={() => navigate(`/Admin/students/student/${row.id}`)}
            >
                View
            </BlueButton>
            <PurpleButton
                variant="contained"
                onClick={() => navigate(`/Admin/students/student/attendance/${row.id}`)}
            >
                Attendance
            </PurpleButton>
        </div>
    );

    const studentActions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate(`/Admin/class/addstudents/${classID}`)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => (
        <>
            {getresponse ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate(`/Admin/class/addstudents/${classID}`)}
                    >
                        Add Students
                    </GreenButton>
                </Box>
            ) : (
                <>
                    <Typography variant="h5" gutterBottom>
                        Students List:
                    </Typography>
                    <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                    <SpeedDialTemplate actions={studentActions} />
                </>
            )}
        </>
    );

    const ClassTeachersSection = () => (
        <div>
            Teachers
        </div>
    );

    const ClassDetailsSection = () => (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Class Details
            </Typography>
            <Typography variant="h5" gutterBottom>
                This is Class {sclassDetails.sclassName}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Number of Subjects: {subjectsList.length}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Number of Students: {sclassStudents.length}
            </Typography>
            {getresponse && (
                <GreenButton
                    variant="contained"
                    onClick={() => navigate(`/Admin/class/addstudents/${classID}`)}
                >
                    Add Students
                </GreenButton>
            )}
            {response && (
                <GreenButton
                    variant="contained"
                    onClick={() => navigate(`/Admin/addsubject/${classID}`)}
                >
                    Add Subjects
                </GreenButton>
            )}
        </div>
    );

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Box sx={{ width: '100%', typography: 'body1' }} >
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Details" />
                        <Tab label="Subjects" />
                        <Tab label="Students" />
                        <Tab label="Teachers" />
                    </Tabs>
                    <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                        {value === 0 && <ClassDetailsSection />}
                        {value === 1 && <ClassSubjectsSection />}
                        {value === 2 && <ClassStudentsSection />}
                        {value === 3 && <ClassTeachersSection />}
                    </Container>
                </Box>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;
