import axios from "axios";

export const GET_USER = "GET_USER";
export const DISABLE_USER = "DISABLE_USER";
export const ENABLE_USER = "ENABLE_USER";
export const DELETE_USER = "DELETE_USER"
export const UPDATE_USER = "UPDATE_USER"

export const disableUser = (learnerId, active) => {
  return (dispatch) => {
    return axios({
      method: "PUT",
      url: "http://localhost:5000/api/user/desactiverlearnerbyid/" + learnerId,
      data: {
        id: learnerId,
        active: false,
      },
    })
      .then(function (response) {
        dispatch({ type: DISABLE_USER, payload: { learnerId } });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const enableUser = (learnerId, active) => {
  return (dispatch) => {
    return axios({
      method: "PUT",
      url: "http://localhost:5000/api/user/activerlearnerbyid/" + learnerId,
      data: {
        active: true,
      },
    })
      .then(function (response) {
        dispatch({ type: ENABLE_USER, payload: active });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: "http://localhost:5000/api/user/" + id,
    })
      .then(function (response) {
        console.log(response);
        dispatch({ type: DELETE_USER, payload: response.data });

      })
      .catch(function (error) {
        console.log(error);
      });
  };
};


export const updateUser = (userId, data) => {
  return (dispatch) => {
    return axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { data },
    })
      .then((res) => {
        dispatch({ type: UPDATE_USER, payload: data });
      })
      .catch((err) => console.log(err));
  };
};

