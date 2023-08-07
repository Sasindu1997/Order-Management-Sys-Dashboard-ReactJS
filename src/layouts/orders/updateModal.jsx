import * as React from 'react';
import { useState, useEffect } from "react";
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

import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import {SDK} from "../../api/index";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
 { id : 1, name: 'Oliver Hansen'},
 { id : 2, name: 'test'},
 { id : 3, name: 'xxxx'},
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FormDialogUpdate({open, setOpen, orderId}) {
  const [data, setData] = useState({});
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [customerId, setCustomerId] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [productId, setProductId] = React.useState('');
  const [payemntMethod, setPayemntMethod] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [shippingMethod, setShippingMethod] = React.useState('');
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [checked, setChecked] = React.useState(true);

  useEffect(() => {
    orderId && SDK.OrderType.getById(orderId)
    .then((res) => {
      console.log("RES: ", res);
      setData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
        customerId : data.get('customerId'),
        userId : data.get('userId'),
        productId :data.get('products').split(','),
        barcode : data.get('barcode'),
        weight : data.get('weight'),
        itemCount :data.get('itemCount'),
        paid : data.get('paid') === "on" ? true : false,
        total : data.get('total'),
        status : data.get('status'),
        shippingAddress : data.get('shippingAddress'),
        paymentMethod : data.get('paymentMethod'),
        shippingMethod : data.get('shippingMethod'),
        trackingNumber : data.get('trackingNumber'),
        isActive: true
      }
      console.log(obj);
      
      SDK.OrderType.update(userId, obj)
      .then((res) => {
        console.log("RES: ", res);
        res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
        window.history.pushState("", "", "/orders");
        setOpen(false);
      })
      .catch((error) => {
        console.log("Error: ", error)
        setErrorSB(true);
        setOpen(false);
      })
  };

  const handleChangeUserId = (event) => {
    console.log(event.target.value)
    setUserId(event.target.value);
  };

  const handleChangeCustomerId = (event) => {
    console.log(event.target.value)
    setCustomerId(event.target.value);
  };

  const handleChangeStatus = (event) => {
    console.log(event.target.value)
    setStatus(event.target.value);
  };

  const handleChangePayment = (event) => {
    console.log(event.target.value)
    setPayemntMethod(event.target.value);
  };

  const handleChangeShippingMethod = (event) => {
    console.log(event.target.value)
    setShippingMethod(event.target.value);
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
        <DialogTitle>Update Order</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          
          <InputLabel id="demo-multiple-name-label" 
            sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Products</InputLabel>
            <Select
              sx={{ minWidth: 120,  minHeight: 40 }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              name="products"
              value={personName}
              fullWidth
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {names.map((obj) => (
                <MenuItem
                  key={obj.id}
                  value={obj.id}
                  style={getStyles(obj.name, personName, theme)}
                >
                  {obj.name}
                </MenuItem>
              ))}
            </Select>

            <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>User</InputLabel>
            <Select
              labelId="userId"
              id="userId"
              value={userId}
              label="userId"
              fullWidth
              name="userId"
              sx={{ minWidth: 120,  minHeight: 40 }}
              onChange={handleChangeUserId}
            >
              <MenuItem value={1}>user 1</MenuItem>
              <MenuItem value={2}>user 2</MenuItem>
              <MenuItem value={3}>user 3</MenuItem>
            </Select>

            <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Customer</InputLabel>
            <Select
              labelId="customerId"
              id="customerId"
              value={customerId}
              label="customerId"
              fullWidth
              name="customerId"
              sx={{ minWidth: 120,  minHeight: 40 }}
              onChange={handleChangeCustomerId}
            >
              <MenuItem value={1}>customer 1</MenuItem>
              <MenuItem value={2}>customer 2</MenuItem>
              <MenuItem value={3}>customer 3</MenuItem>
            </Select>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="weight (Kg)"
              type="number"
              label="Weight"
              name="weight"
              autoComplete="weight"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="itemCount"
              label="Item Count"
              type="number"
              id="itemCount"
              autoComplete="itemCount"
            />

            <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Paid</InputLabel>
              <Switch
              checked={checked}
              name="paid"
              onChange={handleChangeSwitch}
              inputProps={{ 'aria-label': 'controlled' }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="total"
              label="total"
              type="number"
              id="total"
              autoComplete="total"
            />

            <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              value={status}
              label="status"
              fullWidth
              name="status"
              sx={{ minWidth: 120,  minHeight: 40 }}
              onChange={handleChangeStatus}
            >
              <MenuItem value={"Packing"}>Packing</MenuItem>
              <MenuItem value={"Delivered"}>Delivered</MenuItem>
              <MenuItem value={"Returned"}>Returned</MenuItem>
            </Select>

            <TextField
              margin="normal"
              required
              fullWidth
              name="shippingAddress"
              label="Shipping Address"
              id="shippingAddress"
              autoComplete="shippingAddress"
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
              <MenuItem value={"gift"}>Gift</MenuItem>
            </Select>

            <InputLabel id="demo-simple-select-label" 
            sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Shipping Method</InputLabel>
            <Select
              labelId="shippingMethod"
              id="shippingMethod"
              value={shippingMethod}
              label="Shipping Method"
              fullWidth
              name="shippingMethod"
              sx={{ minWidth: 120,  minHeight: 40 }}
              onChange={handleChangeShippingMethod}
            >
              <MenuItem value={"Rider"}>Rider</MenuItem>
              <MenuItem value={"Delivery Service"}>Delivery Service</MenuItem>
              <MenuItem value={"gift"}>Gift</MenuItem>
            </Select>

            <TextField
              margin="normal"
              required
              fullWidth
              name="trackingNumber"
              label="Tracking Number"
              id="trackingNumber"
              autoComplete="trackingNumber"
            />

        <div style={{display: "flex", alignItems: "right", justifyContent: "end"}}>
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
