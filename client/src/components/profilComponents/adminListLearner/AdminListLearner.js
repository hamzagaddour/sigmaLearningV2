import React, { useState, useEffect, Fragment } from "react";
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteUser,
  disableUser,
  enableUser,
} from "../../../actions/user.actions";
import DialogTest from "./Dialog/DialogLearnerUpdate";
import { Box } from "@mui/system";

const AdminListLearner = () => {
  const [learner, setLearner] = useState([]);
  const [updateForm, setUpdateForm] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [openLearnerUpdate, setOpenLearnerUpdate] = useState(false);
  const [selectedValueLearnerUpdate, setSlectedValueLearnerUpdate] =
    useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/`)
      .then((res) => {
        console.log(res);
        setLearner(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function disable(learnerId, active) {
    dispatch(disableUser(learnerId, active));
  }

  function enable(learnerId, active) {
    dispatch(enableUser(learnerId, active));
  }

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleActive = (id, active) => {
    if (active === true) {
      console.log("trigger disable user action");
      disable(id, active);
    } else {
      console.log("trigger activate user action");
      enable(id, active);
    }
    setUpdateForm(true);
  };

  function SimpleDialog(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
          Add Learner
        </DialogTitle>

        <List>
          <ListItem>
            <Box style={{ display: "inline-grid" }}>
              <TextField
                sx={{ width: 450, margin: 1 }}
                id="firstName"
                label="FirstName"
                variant="standard"
                name="firstName"
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
                id="lastName"
                label="LastName"
                variant="standard"
                name="lastName"
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
                id="email"
                label="Email"
                variant="standard"
                name="email"
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

  const handleCloseLearnerUpdate = () => {
    setOpenLearnerUpdate(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        sx={{ margin: 3 }}
        color="success"
        variant="contained"
      >
        Add Learner
      </Button>
      <SimpleDialog
        slectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <DialogTest
        selectedValueUpdate={selectedValueLearnerUpdate}
        open={openLearnerUpdate}
        onClose={handleCloseLearnerUpdate}
      />
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
            {learner.map((l) => {
              return (
                <TableRow key={l._id}>
                  <TableCell>{l.firstName}</TableCell>
                  <TableCell>{l.lastName}</TableCell>
                  <TableCell>{l.email}</TableCell>

                  <TableCell key={l._id}>
                    
                      
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={(e) => {
                            handleActive(l._id, l.active);
                          }}
                        >
                          {l.active === true ? "DESACTIVER" : "ACTIVER"}
                        </Button>
                      
                    
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(l._id)}>
                      <DeleteForeverIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setSlectedValueLearnerUpdate(l);
                        setOpenLearnerUpdate(true);
                      }}
                    >
                      <AutoFixHighIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminListLearner;
