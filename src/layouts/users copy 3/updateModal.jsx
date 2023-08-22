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
  const [initData, setInitData] = useState({
    passWord: '',
    userName: '',
    description: '',
  });
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: initData,
  });
  const form = new FormData();

  useEffect(() => {
    userId && SDK.DeliveryType.getById(userId)
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
      userName: values.userName,
      passWord: values.passWord,
      description: values.description,
      clientId: values.clientId,
      apiKey: values.apiKey,
      isActive: true
    }
      console.log(values);
      
      SDK.DeliveryType.update(userId, obj)
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
            {...register("userName")}
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
              {...register("passWord")}
              margin="normal"
              required
              fullWidth
              name="passWord"
              label="Password"
              type=""
              id="passWord"
              autoComplete="current-passWord"
            />
            <TextField
              {...register("description")}
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
            {...register("clientId")}
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
            {...register("apiKey")}
              margin="normal"
              required
              fullWidth
              name="apiKey"
              label="API Key"
              type="apiKey"
              id="apiKey"
              autoComplete="apiKey"
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
