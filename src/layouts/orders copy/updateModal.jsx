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
import { useForm } from "react-hook-form";

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
  const [productId, setProductId] = React.useState([]);
  const [payemntMethod, setPayemntMethod] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [shippingMethod, setShippingMethod] = React.useState('');
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [initData, setInitData] = useState({
        customerId : '',
        userId : '',
        productId :'',
        barcode : '',
        weight : '',
        itemCount :'',
        paid : false,
        total : '',
        status : '',
        shippingAddress : '',
        paymentMethod : '',
        shippingMethod : '',
        trackingNumber : '',
  });
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: initData,
  });
  const form = new FormData();


  useEffect(() => {
    console.log("orderId", orderId)
    orderId && SDK.OrderType.getById(orderId)
    .then((res) => {
      console.log("RES order: ", res.data?.productId[0]);
      setData(res?.data)
      reset(res?.data);
      setCustomerId(res?.data?.customerId);
      setProductId(res?.data?.productId);
      setPayemntMethod(res?.data?.paymentMethod)
      setShippingMethod(res?.data?.shippingMethod)
      setStatus(res?.data?.status);
      setChecked(res?.data?.paid);
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
    SDK.ProductType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setProductData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })

    SDK.CustomerType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setCustomerData(res?.data)
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
    console.log(value)
    setProductId(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const onSubmit = (values) => {
    // event.preventDefault();
    const loggedUser = localStorage.getItem('loggedInUser');
    // const data = new FormData(event.currentTarget);
    const obj = {
        customerId : customerId,
        userId : loggedUser.id,
        productId : productId,
        barcode : values.barcode,
        weight : values.weight,
        itemCount :values.itemCount,
        paid : checked,
        total : values.total,
        status : status,
        shippingAddress : values.shippingAddress,
        paymentMethod : payemntMethod,
        shippingMethod :shippingMethod,
        trackingNumber : values.trackingNumber,
        isActive: true
      }
      console.log(obj);
      
      SDK.OrderType.update(orderId, obj)
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
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          
          <InputLabel id="demo-multiple-name-label" 
            sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Products</InputLabel>
            <Select
              sx={{ minWidth: 120,  minHeight: 40 }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              name="products"
              value={productId}
              fullWidth
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
            {productData?.map((obj) => (
            <MenuItem
              key={obj.id}
              value={obj.id}
              style={getStyles(obj.name, personName, theme)}
            >
              {obj.productName}
            </MenuItem>
          ))}
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
            {customerData?.map((obj) => (
              <MenuItem
                key={obj.id}
                value={obj.id}
                style={getStyles(obj.name, personName, theme)}
              >
                {obj.fullName}
              </MenuItem>
            ))}
            </Select>
            
            <TextField
            {...register("weight")}
              margin="normal"
              required
              fullWidth
              id="weight"
              type="number"
              label="Weight"
              name="weight"
              autoComplete="weight"
            />
            <TextField
            {...register("itemCount")}
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
            {...register("total")}
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
              <MenuItem value={"packing"}>Packing</MenuItem>
              <MenuItem value={"delivered"}>Delivered</MenuItem>
              <MenuItem value={"returned"}>Returned</MenuItem>
            </Select>

            <TextField
            {...register("shippingAddress")}
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
              {...register("trackingNumber")}
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
