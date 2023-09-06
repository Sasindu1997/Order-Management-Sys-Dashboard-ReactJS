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
import Typography from '@mui/material/Typography';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { useState, useEffect } from "react";
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';

import {SDK} from "../../api/index";

export default function FormDialog({open, setOpen, userId}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [data, setData] = useState(false);
  const [searchTxt, setSearchTxt] = useState('');
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    
  }, [])

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    SDK.OrderType.updateCancelled(searchTxt, { isChecked : checked})
    .then((res) => {
      console.log("RES: ", res);
      setOpen(false, 'success');
    })
    .catch((error) => {
      setOpen(false, 'error');
      console.log("Error: ", error)
    })
    setOpen(false);
  };

  const handleReturn = () => {
    SDK.OrderType.updateReturned(searchTxt, { isChecked : checked})
    .then((res) => {
      console.log("RES: ", res);
      setOpen(false, 'success');
    })
    .catch((error) => {
      console.log("Error: ", error)
      setOpen(false, 'error');
    })
  };

  const handleSearchText = (e) => {
    console.log(e.target.value)
    setSearchTxt(e.target.value)
  }

  const handleSearchBtn = (e) => {
    searchTxt && SDK.OrderType.getById(searchTxt)
    .then((res) => {
      console.log("RES: ", res);
      setData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Returned or Cancelled Order</DialogTitle>
        <DialogContent>
        <div style={{display: "flex", alignItems: "right", justifyContent: "end"}}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="orderid"
          value={searchTxt}
          onChange={(e) => handleSearchText(e)}
          label="Order Id"
          name="Order Id"
        />
        <Button
            type="button"
            variant="outlined"
            onClick={handleSearchBtn}
            sx={{ mt: 2, mb: 2, color: 'blue', marginLeft : '5px',  marginBottom : '5px'  }}
            >
            Search
            </Button>
        </div>
       {data && <Box component="form" noValidate sx={{ mt: 1 }}>
          <Typography  variant="h6" >
           Products
          </Typography>
          {Array.isArray(data.productData) ? data.productData?.map((product) => (
            <Typography  variant="body2" sx={{ mb: 3 }}>
              {`${product.pName} - ${product.ocount}` || "-"}
            </Typography>)) : <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.productId  || "-"}
          </Typography>}

          <Typography  variant="h6" >
           User
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.ufullName || "-"}
          </Typography>

          <Typography  variant="h6" >
           Customer Name
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.cfullName || "-"}
          </Typography>

          <Typography  variant="h6" >
          Customer Phone Number
         </Typography>
         <Typography  variant="body2" sx={{ mb: 3 }}>
           {data.cphone || "-"}
         </Typography>

          <Typography  variant="h6" >
          Weight
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {`${data.weight} Kg` || "-"}
          </Typography>

          <Typography  variant="h6" >
           Type
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.type || "-"}
          </Typography>

          <Typography  variant="h6" >
            Paid Status
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.paid ? "Paid" : "Not Paid" || "-"}
          </Typography>

          {/*<Typography  variant="h6" >
            Item Count
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.itemCount || "-"}
          </Typography>*/}

          <Typography  variant="h6" >
            Total
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.total || "-"}
          </Typography>

          <Typography  variant="h6" >
           Order status
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.status || "-"}
          </Typography>

          <Typography  variant="h6" >
          Shipping Address
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.shippingAddress || "-"}
          </Typography>

          <Typography  variant="h6" >
          Payment Method
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.paymentMethod || "-"}
          </Typography>

          <Typography  variant="h6" >
            Shipping Method
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.shippingMethod || "-"}
          </Typography>

          <Typography  variant="h6" >
            Tracking Number
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.trackingNumber || "-"}
          </Typography>

          <InputLabel id="demo-simple-select-label" 
            sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Add Products back to stock</InputLabel>
            <Switch
            checked={checked}
            name="paid"
            onChange={handleChangeSwitch}
            inputProps={{ 'aria-label': 'controlled' }}
          />

        <div style={{display: "flex", alignItems: "right", justifyContent: "end"}}>
        <Button onClick={handleClose}  sx={{ mt: 3, mb: 2 }}>Cancel</Button>
        <Button onClick={handleCancel} varient='outlined'  sx={{ mt: 3, mb: 2 }}>Cancel Order</Button>
        <Button onClick={handleReturn} varient='outlined' sx={{ mt: 3, mb: 2 }}>Return Order</Button>
        </div>
        </Box>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
