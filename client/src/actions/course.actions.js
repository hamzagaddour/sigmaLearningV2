import axios from "axios";

export const GET_COURSE = "GET_COURSE";
export const PUT_COURSE = "PUT_COURSE"

export const getCourse = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/course/getallcourse`)
      .then((res) => {
        dispatch({ type: GET_COURSE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};


export const putCourse = (course) =>{
    return (dispatch) =>{
        return dispatch({ type: PUT_COURSE, payload: course });

    }
}