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
import moment from 'moment';

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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>View Order</DialogTitle>
        <DialogContent  sx={{ ml: 2 }}>
          <Box component="form" noValidate sx={{ mt: 1 }}>
         
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
            {data.ccfullName || "-"}
          </Typography>

          <Typography  variant="h6" >
          Customer Phone Number
         </Typography>
         <Typography  variant="body2" sx={{ mb: 3 }}>
           {data.cphone || "-"}
         </Typography>

          <Typography  variant="h6" >
          Delivery Charge
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }}>
          {data.deliveryCharge || "-"}
        </Typography>


          <Typography  variant="h6" >
            Total
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.total || "-"}
          </Typography>

          <Typography  variant="h6" >
          Suppplier
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }}>
          {data.supplierName || "-"}
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
            {data.caddress || "-"}
          </Typography>

          <Typography  variant="h6" >
          District
         </Typography>
         <Typography  variant="body2" sx={{ mb: 3 }}>
           {data.cdistrict || "-"}
         </Typography>

         <Typography  variant="h6" >
          Hub
         </Typography>
         <Typography  variant="body2" sx={{ mb: 3 }}>
           {data.hub || "-"}
         </Typography>

         <Typography  variant="h6" >
         Parcel Type
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }}>
          {data.parcelType || "-"}
        </Typography>

        <Typography  variant="h6" >
           Weight
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {`${data.weight} Kg` || "-"}
          </Typography>

          <Typography  variant="h6" >
          Payment Method
          </Typography>
          <Typography  variant="body2" sx={{ mb: 3 }}>
            {data.paymentMethod || "-"}
          </Typography>

          <Typography  variant="h6" >
            Delivery Method
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

          <Typography  variant="h6" >
          Remark
         </Typography>
         <Typography  variant="body2" sx={{ mb: 3 }}>
           {data.remark || "-"}
         </Typography>

         <Typography  variant="h6" >
         Order Date
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }}>
          {moment(data.createdAt).format('DD-MM-YYYY') || "-"}
        </Typography>

        <div style={{display: "flex", alignItems: "right", justifyContent: "end"}}>
        <Button onClick={handleClose}  sx={{ mt: 3, mb: 2 }}>Cancel</Button>
        </div>
        </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
