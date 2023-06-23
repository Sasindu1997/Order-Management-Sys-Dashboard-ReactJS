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

import {SDK} from "../../api/index";

export default function FormDialogUpdate({open, setOpen, userId}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    userId && SDK.CustomerType.getById(userId)
    .then((res) => {
      console.log("RES: ", res);
      setData(res?.data)
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
        fullName: data.get('fullName'),
        district: data.get('district'),
        phone: data.get('phone'),
        address: data.get('address'),
        isActive: true
      }
      console.log(obj);
      
      SDK.CustomerType.update(userId, obj)
    .then((res) => {
      console.log("RES: ", res);
      res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
      window.history.pushState("", "", "/customers");
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Customer</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {console.log("data.fullName", data.fullName)}
          <TextField
          defaultValue={data.fullName}
          margin="normal"
          required
          fullWidth
          name="fullName"
          label="Full Name"
          type="fullName"
          id="fullName"
          autoFocus
        />
        <TextField
          defaultValue={data.email}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
        defaultValue={data.district}
        margin="normal"
        required
        fullWidth
        name="district"
        label="District"
        type="district"
        id="district"
        autoComplete="district"
      />
        <TextField
          defaultValue={data.phone}
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
          defaultValue={data.address}
          margin="normal"
          required
          fullWidth
          name="address"
          label="Address"
          type="address"
          id="address"
          autoComplete="address"
        />
        <div style={{justifySelf: 'center', alignItems: 'flex-end'}} sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
        <Button onClick={handleClose}  sx={{ mt: 3, mb: 2 }}>Cancel</Button>
        <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, color: (theme) => theme.palette.white[500], }}
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
