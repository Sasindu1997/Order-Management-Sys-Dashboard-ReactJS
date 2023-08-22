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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {SDK} from "../../../api/index";
import moment from 'moment';

export default function FormDialogView({open, setOpen, userId, type, id}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [userData, setUserData] = useState({});
  const [productData, setProductData] = useState();
  const [openBackDrop, setOpenBackDrop] = React.useState(false);

  useEffect(() => {
    setOpenBackDrop(true)
    userId && SDK.StockType.getById(userId)
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
    if(type == 'prod'){
      id && SDK.ProductType.getById(id)
    .then((res) => {
      console.log("RES: ", res);
      setProductData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
    setTimeout(function(){
      setOpenBackDrop(false);
    }, 1000);

    }else if(type == 'chem'){
      id && SDK.ChemicalsType.getById(id)
    .then((res) => {
      console.log("RES: ", res);
      setProductData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
    setTimeout(function(){
      setOpenBackDrop(false);
    }, 1000);
    
    }else if(type == 'raw'){
      id && SDK.RawMatsType.getById(id)
    .then((res) => {
      console.log("RES: ", res);
      setProductData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
    setTimeout(function(){
      setOpenBackDrop(false);
    }, 1000);
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
        email: data.get('email'),
        password: data.get('password'),
        fullName: data.get('fullName'),
        userName: data.get('userName'),
        role: data.get('role'),
        phoneNumber: data.get('phone'),
        address: data.get('address'),
        isActive: true
      }
      console.log(obj);
      
      SDK.UserType.update(userId, obj)
    .then((res) => {
      console.log("RES: ", res);
      res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
      window.history.pushState("", "", "/users");
      setOpen(false);
    })
    .catch((error) => {
      console.log("Error: ", error)
      setErrorSB(true);
      setOpen(false);
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
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ ml: 1 }}>View Stock Record</DialogTitle>
        <DialogContent sx={{ ml: 2 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mr: 1 }}>
          {console.log("userData.fullName", userData.fullName)}
         
        <Typography  variant="h6" >
          Stock Item Name
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }}>
          {productData?.productName || productData?.name}
        </Typography>

        <Typography  variant="h6" >
        Added Quantity
      </Typography>
      <Typography  variant="body2" sx={{ mb: 3 }}>
        {userData?.quantity}
      </Typography>

        <Typography  variant="h6" >
          Total Stock Available
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3, color: productData?.maxStockLevel > 0 ? '#00FF00' : '#ff0000' }} >
          {productData?.maxStockLevel}
        </Typography>
        
        <Typography  variant="h6" >
          Added Date
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }} >
          {moment(userData.createdAt).format('DD-MM-YYYY')  || "-"}
        </Typography>
        <div style={{display: "flex", alignItems: "right", justifyContent: "end"}}>
        <Button onClick={handleClose}  sx={{ mt: 3, mb: 2 }}>Cancel</Button>
        </div>
        </Box>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
        // onClick={handleCloseBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        </DialogContent>
      </Dialog>
    </div>
  );
}
