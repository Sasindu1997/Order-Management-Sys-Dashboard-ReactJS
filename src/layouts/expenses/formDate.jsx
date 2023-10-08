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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {SDK} from "../../api/index";

export default function FormDialogDatePicker({open, setOpen, id}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [userData, setUserData] = useState([]);
  const [errorSB, setErrorSB] = useState(false);
  const [errorVM, setErrorVM] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(data.get('name') == '' || data.get('name') == 'undefined' || data.get('name') == null){
      setErrorVM("Enter a Valid Name.");
      return;
    }
    else if(data.get('amount') == '' || data.get('amount') == 'undefined' || data.get('amount') == null){
      setErrorVM("Enter a Valid Amount.");
      return;
    } else {
      setErrorVM(false)
    }

    const obj = {
        name: data.get('name'),
        description: data.get('description'),
        amount: data.get('amount'),
        isActive: true
      }
      console.log(obj);
      SDK.ExpenseType.add(obj)
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
               <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
               <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
              <TextField
              margin="normal"
              required
              fullWidth
              name="startDate"
              label="startDate"
              type="startDate"
              id="startDate"
              autoComplete="startDate"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="endDate"
              label="endDate"
              name="endDate"
              autoComplete="endDate"
            />
            
            <div style={{ color: 'red', marginLeft: '3px', fontStyle : 'italic', fontWeight : 'bold' }}>
               <MDTypography variant="p" color="red">
                {errorVM ? errorVM : ''}
              </MDTypography>
            </div>
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
