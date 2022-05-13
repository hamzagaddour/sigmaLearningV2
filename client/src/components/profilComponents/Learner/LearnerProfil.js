import React, { useEffect, useState,useContext } from "react";
import { UidContext } from "../../AppContext";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {create} from '../../../features/course'



const LearnerProfil = () => {
  const uid = useContext(UidContext);

  const [courses, setCourses] = useState([]);
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/course/getenablecourse/",
    })
      .then(function (response) {
        //console.log(response);
        setCourses(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleCourse = (course) => {
    console.log(course);
    dispatch(
        create({
          id: course._id,
          title: course.title,
          picture: course.picture,
          description: course.description,
          dayDuration: course.dayDuration,
          idTeacher: course.idTeacher,
          nameTeacher: course.nameTeacher,
          learners: course.learners.push(uid),
        })
      );
    navigate('/course')
  };

  return (
    <div className="card">
      {courses.map((course) => {
        //let courseId = course._id

        return (
          <Card
            key={course._id}
            sx={{
              display: "inline-block",
              margin: 4,
              padding: 10,
              width: 275,
              height: 450,
            }}
          >
            <CardContent>
              <img
                src={require(`../../../uploads/${course.picture}`)}
                alt={course.picture}
              />
              <Typography variant="h5" component="div">
                {course.title}
              </Typography>
              <Typography color="red" variant="h7">
                {course.dayDuration}
              </Typography>

              <Typography color="darkcyan" variant="body2">
                {course.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleCourse(course)}
                size="large"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default LearnerProfil;
