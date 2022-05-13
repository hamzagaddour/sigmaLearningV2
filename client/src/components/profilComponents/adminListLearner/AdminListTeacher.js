import React, { useState, useEffect, useContext } from "react";
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
  Dialog,
  DialogTitle,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box } from "@mui/system";
import DialogTeacherUpdate from './Dialog/DialogTeacherUpdate';
import { UidContext } from "../../../components/AppContext";
import { disableUser, enableUser, deleteUser } from "../../../actions/user.actions";
import { useDispatch } from "react-redux";



const AdminListTeacher = () => {
  const uid = useContext(UidContext);
  const dispatch = useDispatch()

  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [openLearnerUpdate, setOpenLearnerUpdate] = useState(false);
  const [selectedValueUpdate, setSlectedValueUpdate] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/getallteacher/` + uid )
      .then((res) => {
        console.log(res);
        setTeachers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function SimpleDialog(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const { onClose, selectedValue, open } = props;
    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleAddLearner = () => {
      
      //console.log(firstName + lastName + email + password);
      axios({
        method: "POST",
        url: "http://localhost:5000/api/user/register",
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          isTeacher : true,
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      onClose(selectedValue);
    };

    return (
      <Dialog
        PaperProps={{
          style: {
            width: 500,
            height: 600,
          },
        }}
        onClose={handleClose}
        open={open}
      >
        <DialogTitle component="form" noValidate sx={{ marginLeft: 20 }}>
          Add Teacher
        </DialogTitle>

        <List>
          <ListItem>
            <Box style={{ display: "inline-grid" }}>
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="firstNameLearnerAdd"
                label="FirstName"
                variant="standard"
                name="firstNameLearnerAdd"
                autoComplete="given-name"
                required
                fullWidth
                autoFocus
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="lastNameLearnerAdd"
                label="LastName"
                variant="standard"
                name="lastNameLearnerAdd"
                autoComplete="given-name"
                required
                fullWidth
                autoFocus
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="emailLearnerAdd"
                label="Email"
                variant="standard"
                name="emailLearnerAdd"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <Button
                sx={{ margin: 1 }}
                variant="contained"
                onClick={handleAddLearner}
              >
                Add
              </Button>
            </Box>
          </ListItem>
        </List>
      </Dialog>
    );
  }

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };




  function disable(learnerId, active) {
    dispatch(disableUser(learnerId, active));
    //setUpdateForm(false);
  }

  function enable(learnerId, active) {
    dispatch(enableUser(learnerId, active));
    //setUpdateForm(false);
  }

  const handleDelete = (id) => {
    console.log("delete handle");
    dispatch(deleteUser(id))
  };

  const handleActive = (active, id) => {
    if (active === true) {
      console.log("trigger disable user action");
      disable(id, active);
    } else {
      console.log("trigger activate user action");
      enable(id, active);
    }
  };

  const handleCloseUpdate = () => {
    setOpenLearnerUpdate(false);
  };

  return (
    <>
      <>
        <Button
          sx={{ margin: 3 }}
          color="success"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Add Teacher
        </Button>
        <SimpleDialog
          slectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
        <DialogTeacherUpdate
        selectedValueUpdate={selectedValueUpdate}
        open={openLearnerUpdate}
        onClose={handleCloseUpdate}
      />
      </>

      <br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Supprimer</TableCell>
              <TableCell>Modifier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher._id}>
                <TableCell>{teacher.firstName}</TableCell>
                <TableCell>{teacher.lastName}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell key={teacher._id}>
                <Button variant="outlined" color="primary" onClick={e => handleActive(teacher.active, teacher._id)}>
                          {(teacher.active === true ? ("DESACTIVER") : ("ACTIVER"))}
                    </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(teacher._id)}>
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => {
                      setSlectedValueUpdate(teacher);
                      setOpenLearnerUpdate(true);
                    }}>
                    <AutoFixHighIcon />
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

export default AdminListTeacher;
