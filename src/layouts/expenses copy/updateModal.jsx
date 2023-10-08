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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "./customdatepickerwidth2.css";
import {SDK} from "../../api/index";

export default function FormDialogUpdate({open, setOpen, userId}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [userData, setUserData] = useState({});
  const [incomeStreams, setIncomeStreams] = useState([]);
  const [errorVM, setErrorVM] = useState(false);
  const [incomeName, setIncomeName] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [initData, setInitData] = useState({
    name: '',
    description: '',
  });
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: initData,
  });
  const form = new FormData();

  useEffect(() => {
    userId && SDK.IncomesType.getById(userId)
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data);
      setIncomeName(res?.data?.name);
      setStartDate(new Date(res?.data?.createdAt));
      reset(res?.data);
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
    SDK.IncomeStreamType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setIncomeStreams(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

  const onSubmit = (values) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    if(values?.name == '' || values?.name == 'undefined' || values?.name == null){
      setErrorVM("Enter a Valid Name.");
      return;
    }
    else if(values?.amount == '' || values?.amount == 'undefined' || values?.amount == null){
      setErrorVM("Enter a Valid Amount.");
      return;
    } else {
      setErrorVM(false)
    }

    const obj = {
        name: incomeName,
        description: values.description,
        amount: values.amount,
        createdAt: startDate,
        isActive: true
      }
      console.log(obj);
      
      SDK.IncomesType.update(userId, obj)
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

  const handleChangeName = (event) => {
    console.log(event.target.value)
    setIncomeName(event.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Expense</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          {console.log("userData.fullName", userData.fullName)}
          {/*<TextField
             {...register("name")}
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="name"
              id="name"
              autoComplete="name"
              autoFocus
          />*/}
            <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Income Name</InputLabel>
            <Select
              labelId="incomeName"
              id="incomeName"
              value={incomeName}
              label="incomeName"
              fullWidth
              name="incomeName"
              sx={{ minWidth: 120,  minHeight: 40 }}
              onChange={handleChangeName}
            >
            {incomeStreams.map((income) => (
              <MenuItem value={income.id}>{income.name}</MenuItem>
            ))}
            </Select>
            <TextField
            {...register("description")}
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
            />
            <TextField
            {...register("amount")}
              margin="normal"
              required
              fullWidth
              name="amount"
              label="Amount"
              type="number"
              id="amount"
              autoComplete="amount"
            />
            <Grid item xs={4} classname="customdatepickerwidth" >
              <InputLabel id="demo-simple-select-label" 
              style={{justifyContent: "start"}}
              sx={{ paddingTop: 2, paddingBottom: 3, paddingLeft: 2}}>Start Date</InputLabel>
              
              <div className="datepicker-container">
              <div className="dates-container">
                <div className="date-item"></div>
              </div>
              <div className="react-datepicker-wrapper">
                <DatePicker className='react-datepicker1' onChange={(date) => setStartDate(date)} selected={startDate}  dateformat="dd/mm/yyyy" />
              </div>
            </div>
            </Grid>
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
            Update
            </Button>
        </div>
        </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
