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
  const [userData, setUserData] = useState({});

  useEffect(() => {
    userId && SDK.RawMatsType.getById(userId)
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data)
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
        <DialogTitle>View Material</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 1, ml: 2 }}>
          {console.log("userData.fullName", userData.fullName)}
        <Typography  variant="h6" >
          Material Name
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }}>
          {userData.name}
        </Typography>

        <Typography  variant="h6" >
        Material Code
      </Typography>
      <Typography  variant="body2" sx={{ mb: 3 }}>
        {userData.code}
      </Typography>
        
        <Typography  variant="h6" >
        Supplier
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }} >
          {userData.supplier}
        </Typography>
        
        <Typography  variant="h6" >
        Unit Of Measure
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }} >
          {userData.unitOfMeasure}
        </Typography>
       
        <Typography  variant="h6" >
        Unit Price
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }} >
          {userData.unitPrice}
        </Typography>

        <Typography  variant="h6" >
          Payment Method
        </Typography>
        <Typography  variant="body2" sx={{ mb: 3 }} >
          {userData.paymentMethod}
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
