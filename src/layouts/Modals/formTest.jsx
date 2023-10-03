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
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

import {SDK} from "../../api/index";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
        email: data.get('email'),
        password: data.get('password'),
        fullName: data.get('fullName'),
        userName: data.get('userName'),
        role: data.get('role'),
        phoneNumber: data.get('phone'),
        address: data.get('address'),
        isActive: true
      }
      console.log(obj);
      
      SDK.UserType.add(obj)
    .then((res) => {
      console.log("RES: ", res);
      res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
      setOpen(false);
    })
    .catch((error) => {
      console.log("Error: ", error)
      setErrorSB(true);
      setOpen(false);
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
      <MDBox px={2} display="flex" justifyContent="space-between" alignItems="center" onClick={handleClickOpen}>
              <MDTypography variant="h6" fontWeight="medium"></MDTypography>
              <MDButton variant="gradient" color="dark" onClick={handleClickOpen}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;Add New User
              </MDButton>
            </MDBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
          margin="normal"
          required
          fullWidth
          name="fullName"
          label="Full Name"
          type="fullName"
          id="fullName"
          autoComplete="fullName"
          autoFocus
        />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
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
            name="role"
            label="Role"
            type="role"
            id="role"
            autoComplete="role"
          />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              type="number"
              id="phone"
              autoComplete="phone"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              type="address"
              id="address"
              autoComplete="address"
            />
            <div style={{display: "flex", alignItems: "right", justifyContent: "end"}}>
            <Button onClick={handleClose}  sx={{ mt: 3, mb: 2 }}>Cancel</Button>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, color: (theme) => '#FFFFFF', }}
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
