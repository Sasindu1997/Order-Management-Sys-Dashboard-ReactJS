import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import {SDK} from "../../api/index";

export default function FormDialog({open, setOpen, id}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [userData, setUserData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
        userName: data.get('userName'),
        passWord: data.get('password'),
        description: data.get('description'),
        clientId: data.get('clientId'),
        apiKey: data.get('apiKey'),
        isActive: true
      }
      console.log(obj);
      
      SDK.DeliveryType.add(obj)
      .then((res) => {
      console.log("RES: ", res);
      res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
      // window.history.pushState("", "", "/users");
      setOpen(false, 'success');
    })
    .catch((error) => {
      console.log("Error: ", error)
      setErrorSB(true);
      setOpen(false, 'error');
    })
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="userName"
              label="User Name"
              type="userName"
              id="userName"
              autoComplete="userName"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="description"
              id="description"
              autoComplete="description"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="clientId"
              label="Client ID"
              type="clientId"
              id="clientId"
              autoComplete="clientId"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="apiKey"
              label="API Key"
              type="apiKey"
              id="apiKey"
              autoComplete="apiKey"
            />
            <div style={{display: "flex", alignItems: "right", justifyContent: "end"}} >
              <Button onClick={handleClose}  sx={{ mt: 3, mb: 2 }}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, color: 'wheat'}}
                >
                  Add
              </Button>
            </div>
            </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
