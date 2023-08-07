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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
  const [measureUnit, setMeasureUnit] = React.useState('');
  const [payemntMethod, setPayemntMethod] = React.useState('');
  const [userData, setUserData] = useState({});
  const [initData, setInitData] = useState({
    name : '',
    code : '',
    supplier : '',
    unitOfMeasure : '',
    unitPrice : '',
    paymentMethod : '',
    isActive: '',
});
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: initData,
  });
  const form = new FormData();

  useEffect(() => {
    userId && SDK.ChemicalsType.getById(userId)
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data);
      setMeasureUnit(res?.data?.unitOfMeasure);
      setPayemntMethod(res?.data?.paymentMethod);
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
        name : values.name,
        code : values.code,
        supplier : values.supplier,
        unitOfMeasure : measureUnit,
        unitPrice : values.unitPrice,
        paymentMethod : payemntMethod,
        isActive: true
      }
      console.log(values);
      
      SDK.ChemicalsType.update(userId, obj)
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

  const handleChangeMeasureUnit = (event) => {
    console.log(event.target.value)
    setMeasureUnit(event.target.value);
  };

  const handleChangePayment = (event) => {
    console.log(event.target.value)
    setPayemntMethod(event.target.value);
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
        <DialogTitle>Update Chemical</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }} form={form} onChange={handleFormChange}>
          <TextField
              margin="normal"
              required
              fullWidth
              {...register("name")}
              name="name"
              label="Chemical Name"
              type="name"
              id="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              {...register("code")}
              required
              fullWidth
              id="code"
              label="Chemical Code"
              name="code"
              autoComplete="code"
            />
            <TextField
              {...register("supplier")}
              margin="normal"
              required
              fullWidth
              name="supplier"
              label="Supplier"
              type="supplier"
              id="supplier"
              autoComplete="supplier"
            />
            <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Measured Unit</InputLabel>
              <Select
                {...register("measureUnit")}
                labelId="measureUnit"
                id="measureUnit"
                value={measureUnit}
                label="Measured Unit"
                fullWidth
                name="measureUnit"
                sx={{ minWidth: 120,  minHeight: 40 }}
                onChange={handleChangeMeasureUnit}
              >
                <MenuItem value={"unit"}>Unit</MenuItem>
                <MenuItem value={"kg"}>Kilo Gram</MenuItem>
                <MenuItem value={"g"}>Gram</MenuItem>
                <MenuItem value={"mg"}>Mili Gram</MenuItem>
                <MenuItem value={"l"}>Litre</MenuItem>
                <MenuItem value={"ml"}>Mili Litre</MenuItem>
                <MenuItem value={"m"}>Metre</MenuItem>
                <MenuItem value={"mm"}>Mili Metre</MenuItem>
            </Select>
            <TextField
                {...register("unitPrice")}
                margin="normal"
                required
                fullWidth
                name="unitPrice"
                label="Unit Price"
                type="number"
                id="unitPrice"
                autoComplete="unitPrice"
            />
            <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Payment Method</InputLabel>
              <Select
                {...register("payemntMethod")}
                labelId="payemntMethod"
                id="payemntMethod"
                value={payemntMethod}
                label="payemntMethod"
                fullWidth
                name="payemntMethod"
                sx={{ minWidth: 120,  minHeight: 40 }}
                onChange={handleChangePayment}
              >
                <MenuItem value={"cash"}>Cash</MenuItem>
                <MenuItem value={"card"}>Card</MenuItem>
                <MenuItem value={"cheque"}>Cheque</MenuItem>
                <MenuItem value={"gift"}>Gift</MenuItem>
              </Select>
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
