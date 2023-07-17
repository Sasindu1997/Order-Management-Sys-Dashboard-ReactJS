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

import {SDK} from "../../api/index";

export default function FormDialogView({open, setOpen, userId}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    userId && SDK.OrderType.getById(userId)
    .then((res) => {
      console.log("RES: ", res);
      setData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>View Product</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 1 }}>
         
          <Typography  variant="h6" >
           Products
          </Typography>
          {Array.isArray(data.productDetails) ? data.productDetails?.map((product) => (
            <Typography  variant="body2" sx={{ mb: 3 }}>
              {product.pName || "-"}
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

          <Typography  variant="h6" >
            Item Count
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.itemCount || "-"}
          </Typography>

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

        <div style={{justifySelf: 'center', alignItems: 'flex-end'}} sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
        <Button onClick={handleClose}  sx={{ mt: 3, mb: 2 }}>Cancel</Button>
        </div>
        </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
