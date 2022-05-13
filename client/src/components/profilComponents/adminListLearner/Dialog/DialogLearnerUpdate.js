import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch} from 'react-redux'
import { updateUser } from "../../../../actions/user.actions";


const DialogTest = (props) => {

  const { selectedValueUpdate, onClose, open } = props;
  console.log(selectedValueUpdate);
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();

  
  const handleClose = (e) => {
    onClose(e);
  }

  const handleUpdateLearner = (e) => {
    //console.log(firstName + lastName + email);
    if (firstName ===undefined) {
        setFirstName(selectedValueUpdate.firstName)
    }
    if (lastName ===undefined) {
        setLastName(selectedValueUpdate.lastName)
    }
    if (email ===undefined) {
        setEmail(selectedValueUpdate.email)
    }
    const data = {firstName, lastName, email}
    console.log(data);
    let learnerId = selectedValueUpdate._id
    dispatch(updateUser(learnerId, data))
    onClose(selectedValueUpdate);

  };

  return (
    
    <Dialog
    PaperProps={{
      style: {
        width: 500,
        height: 600,
      },
    }}
    onClose={(e) => handleClose(e)}
    open={open}
  >
    <DialogTitle component="form" noValidate sx={{ marginLeft: 20 }}>
      Update Learner
    </DialogTitle>

    <List>
      <ListItem>
        <Box style={{ display: "inline-grid" }}>
          <TextField
            sx={{ width: 450, margin: 1 }}
            label="FirstName"
            variant="standard"
            name="firstName"
            autoComplete="given-name"
            defaultValue={selectedValueUpdate.firstName}
            value={firstName}
            fullWidth
            autoFocus
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            sx={{ width: 450, margin: 1 }}
            label="LastName"
            variant="standard"
            name="lastName"
            autoComplete="given-name"
            defaultValue={selectedValueUpdate.lastName}
            value={lastName}
            fullWidth
            autoFocus
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            sx={{ width: 450, margin: 1 }}
            label="Email"
            variant="standard"
            name="email"
            autoComplete="email"
            defaultValue={selectedValueUpdate.email}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button
            sx={{ margin: 1 }}
            variant="contained"
            onClick={(e) => handleUpdateLearner(e)}
          >
            Update
          </Button>
        </Box>
      </ListItem>
    </List>
  </Dialog>
  );
};

export default DialogTest;
