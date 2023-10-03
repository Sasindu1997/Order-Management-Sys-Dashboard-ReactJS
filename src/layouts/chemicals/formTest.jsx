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
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {SDK} from "../../api/index";

export default function FormDialog({open, setOpen, id}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [userData, setUserData] = useState([]);
  const [measureUnit, setMeasureUnit] = React.useState('');
  const [payemntMethod, setPayemntMethod] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
        name : data.get('name'),
        code : data.get('code'),
        supplier : data.get('supplier'),
        unitOfMeasure : measureUnit,
        unitPrice : data.get('unitPrice'),
        paymentMethod : data.get('payemntMethod'),
        isActive: true
      }
      console.log(obj);
      
      SDK.ChemicalsType.add(obj)
    .then((res) => {
      console.log("RES: ", res);
      res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
      window.history.pushState("", "", "/chemicals");
      setOpen(false);
    })
    .catch((error) => {
      console.log("Error: ", error)
      setErrorSB(true);
      setOpen(false);
    })
  };

  const handleChangeMeasureUnit = (event) => {
    console.log(event.target.value)
    setMeasureUnit(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChangePayment = (event) => {
    console.log(event.target.value)
    setPayemntMethod(event.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Chemical</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Chemical Name"
              type="name"
              id="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="Chemical Code"
              name="code"
              autoComplete="code"
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
              name="supplier"
              label="Supplier"
              type="supplier"
              id="supplier"
              autoComplete="supplier"
            />
            <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Measured Unit</InputLabel>
              <Select
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
                margin="normal"
                required
                fullWidth
                name="unitPrice"
                label="Unit Price"
                type="unitPrice"
                id="unitPrice"
                autoComplete="unitPrice"
            />
            <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Payment Method</InputLabel>
              <Select
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
                <MenuItem value={"card"}>Cheque</MenuItem>
                <MenuItem value={"gift"}>Gift</MenuItem>
              </Select>
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
