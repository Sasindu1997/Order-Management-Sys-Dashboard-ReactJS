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

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {SDK} from "../../api/index";

export default function FormDialogUpdate({open, setOpen, userId}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [userData, setUserData] = useState({});
  const [initData, setInitData] = useState({email: '',
  password: '',
  fullName: '',
  userName: '',
  role: '',
  phoneNumber: '',
  address: ''});
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: initData,
  });
  const form = new FormData();

  useEffect(() => {
    userId && SDK.UserType.getById(userId)
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data);
      reset(res?.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setOpen(false, 'error');
    })
  }, [reset])

  const onSubmit = (values) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    const obj = {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        userName: values.userName,
        role: values?.role,
        phoneNumber: values.phoneNumber,
        address: values.address,
        isActive: true
      }
      console.log(values);
      
      SDK.UserType.update(userId, obj)
    .then((res) => {
      console.log("RES: ", res);
      res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
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

  const handleFormChange = (event) => {
    console.log(event.currentTarget)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }} form={form} onChange={handleFormChange}>
          {console.log("userData.fullName", userData.fullName)}
          <TextField
            margin="normal"
            required
            {...register("fullName")}
            fullWidth
            name="fullName"
            label="Full Name"
            type="fullName"
            id="fullName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            {...register("email")}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            {...register("userName")}
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
            {...register("password")}
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
            {...register("role")}
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
          {...register("phoneNumber")}
          fullWidth
          name="phoneNumber"
          label="Phone"
          type="number"
          id="phoneNumber"
        />
        <TextField
          margin="normal"
          required
            {...register("address")}
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
            sx={{ mt: 3, mb: 2, color: 'wheat', }}
            >
            Update
            </Button>
        </div>
        </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
