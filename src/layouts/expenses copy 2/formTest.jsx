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

export default function FormDialog({open, setOpen, id}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [userData, setUserData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
        name: data.get('name'),
        description: data.get('description'),
        amount: data.get('amount'),
        isActive: true
      }
      console.log(obj);
      SDK.UtilityExpensesType.add(obj)
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
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="name"
              id="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="amount"
              label="Amount"
              type="number"
              id="amount"
              autoComplete="amount"
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
                Add
                </Button>
            </div>
            </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}