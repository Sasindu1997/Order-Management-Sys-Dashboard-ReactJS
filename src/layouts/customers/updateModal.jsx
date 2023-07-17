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
  const [data, setData] = useState({});
  const [initData, setInitData] = useState({
    email: "",
    fullName: "",
    district: "",
    phone: "",
    address: "",
    isActive: true
  });
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: initData,
  });
  const form = new FormData();

  useEffect(() => {
    userId && SDK.CustomerType.getById(userId)
    .then((res) => {
      console.log("RES: ", res);
      setData(res?.data);
      reset(res?.data);
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [reset])

  const onSubmit = (values) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    const obj = {
        email: values.email,
        fullName: values.fullName,
        district: values.district,
        phone: values.phone,
        address: values.address,
        isActive: true
      }
      console.log(values);
      
      SDK.CustomerType.update(userId, obj)
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

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Customer</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }} form={form} >
          {console.log("data.fullName", data.fullName)}
          <TextField
          margin="normal"
          required
          fullWidth
          name="fullName"
          label="Full Name"
          type="fullName"
          id="fullName"
          autoFocus
          {...register("fullName")}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          {...register("email")}
        />
        <TextField
        margin="normal"
        required
        fullWidth
        name="district"
        label="District"
        type="district"
        id="district"
        autoComplete="district"
        {...register("district")}
      />
        <TextField
          margin="normal"
          required
          fullWidth
          name="phone"
          label="Phone"
          type="number"
          id="phone"
          {...register("phone")}
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
          {...register("address")}
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
