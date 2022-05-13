import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import DialogCourse from "./Dialog/DialogCourse";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

//import { UidContext } from "../../../components/AppContext";

const AdminListCourse = () => {
  //const uid = useContext(UidContext);

  const [courses, setCourses] = useState([]);
  const [selectedValueUpdate, setSelectedValueUpdate] = useState("");
  const [openCourseUpdate, setOpenCourseUpdate] = useState(false);
 
  //console.log(course)

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/course/getallcourse")
      .then((res) => {
        console.log(res);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (idCourse) => {
    console.log(idCourse);
    axios({
      method: "delete",
      url: "http://localhost:5000/api/removecoursebyid/" + idCourse,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCloseUpdate = () => {
    setOpenCourseUpdate(false);
  };

  function disableUser(courseId) {
    console.log(courseId);
    axios({
      method: "PUT",
      url: "http://localhost:5000/api/course/disableCourse/" + courseId,
      data: {
        status: false,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function enableUser(courseId) {
    console.log(courseId);
    axios({
      method: "PUT",
      url: "http://localhost:5000/api/course/enablecourse/" + courseId,
      data: {
        status: true,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSwitch = (idCourse, status) => {
    console.log("trigged course status updating");

    if (status === true) {
      console.log("trigger disable course action");
      disableUser(idCourse);
    } else {
      console.log("trigger activate course action");
      enableUser(idCourse);
    }
  };

  return (
    <>
      <>
        <DialogCourse
          selectedValueUpdate={selectedValueUpdate}
          open={openCourseUpdate}
          onClose={handleCloseUpdate}
        />
      </>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell>Supprimer</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.nameTeacher}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(course._id)}>
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
                <TableCell key={course._id}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={(e) => handleSwitch(course._id, course.status)}
                  >
                    {course.status === true ? "DESACTIVER" : "ACTIVER"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminListCourse;
