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
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
  const [userData, setUserData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [categoryId, setCategoryId] = React.useState('');
  const [errorVM, setErrorVM] = useState(false);
  const [initData, setInitData] = useState({
    text: ''
  });
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: initData,
  });
  const form = new FormData();

  useEffect(() => {
    userId && SDK.RawStreamType.getById(userId)
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data)
      reset(res?.data);
    })
    .catch((error) => {
      console.log("Error: ", error)
      setOpen(false, 'error');
    })
  }, [])

  const onSubmit = (values) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    if(values?.name == '' || values?.name == 'undefined' || values?.name == null){
      setErrorVM("Enter a Valid Material Name.");
      return;
    } 

    const obj = {
        name: values?.name,
        description: values?.description,
      }
      console.log(obj);
      SDK.RawStreamType.update(userId, obj)
      .then((res) => {
        console.log("RES: ", res);
        res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
        // window.history.pushState("", "", "/settings/subcategories");
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

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Expense Stream</DialogTitle>
        <DialogContent>
        <Box  component="form"  onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '25vw' }}>
          <TextField
           {...register("name")}
              margin="normal"
              fullWidth
              name="name"
              label="name"
              id="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
            {...register("description")}
              margin="normal"
              fullWidth
              name="description"
              label="description"
              id="description"
              autoComplete="description"
            />
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
