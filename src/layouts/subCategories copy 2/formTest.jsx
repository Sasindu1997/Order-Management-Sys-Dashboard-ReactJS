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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

import {SDK} from "../../api/index";

export default function FormDialog({open, setOpen, id}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [userData, setUserData] = useState([]);
  const [categoryId, setCategoryId] = React.useState('');
  const [errorVM, setErrorVM] = useState(false);

  useEffect(() => {
    SDK.CategoryType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('title') == '' || data.get('title') == 'undefined' || data.get('title') == null){
      setErrorVM("Enter a Valid Sub-Category Title.");
      return;
    } 
    else if(data.get('categoryId') == '' || data.get('categoryId') == 'undefined' || data.get('categoryId') == null){
      setErrorVM("Enter a Valid Category Id.");
      return;
    } else {
      setErrorVM(false)
    }
    const obj = {
        title: data?.get('title'),
        description: data?.get('description'),
        categoryId: data?.get('categoryId'),
        isActive: true
      }
      console.log(obj);
      
      SDK.SubCategoryType.add(obj)
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

  const handleChangeCategory = (event) => {
    console.log(event.target.value)
    setCategoryId(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Sub Category</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label="Title"
              type="name"
              id="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="description"
              id="description"
              autoComplete="description"
            />

            <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={categoryId}
              label="Category"
              fullWidth
              name="categoryId"
              sx={{ minWidth: 120,  minHeight: 40 }}
              onChange={handleChangeCategory}
            >
            {userData.map((category) => (
              <MenuItem value={category.id}>{category.title}</MenuItem>
            ))}
            </Select>
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
                Add
                </Button>
            </div>
            </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
