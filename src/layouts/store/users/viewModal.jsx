import * as React from 'react';
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
import Typography from '@mui/material/Typography';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { useState, useEffect } from "react";
import Divider from '@mui/material/Divider';

import {SDK} from "../../../api/index";

export default function FormDialogView({open, setOpen, userId}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    userId && SDK.UserType.getById(userId)
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

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
      
      SDK.UserType.update(userId, obj)
    .then((res) => {
      console.log("RES: ", res);
      res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
      window.history.pushState("", "", "/users");
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
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>View User</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {console.log("userData.fullName", userData.fullName)}
         
        <Typography  variant="h6" >
          Full Name
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }}>
          {userData.fullName}
        </Typography>

        <Typography  variant="h6" >
        Email
      </Typography>
      <Typography  variant="body2" sx={{ mb: 3 }}>
        {userData.email}
      </Typography>

        <Typography  variant="h6" >
          User Name
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }} >
          {userData.userName}
        </Typography>
        
        <Typography  variant="h6" >
          Password
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }} >
          {userData.password}
        </Typography>
        
        <Typography  variant="h6" >
         Role
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }} >
          {userData.role}
        </Typography>
       
        <Typography  variant="h6" >
          Phone Number
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }} >
          {userData.phoneNumber}
        </Typography>
        
        <Typography  variant="h6" >
          Address
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }} >
          {userData.address}
        </Typography>

        <div style={{justifySelf: 'center', alignItems: 'flex-end'}} sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
        <Button onClick={handleClose}  sx={{ mt: 3, mb: 2 }}>Cancel</Button>
        </div>
        </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
