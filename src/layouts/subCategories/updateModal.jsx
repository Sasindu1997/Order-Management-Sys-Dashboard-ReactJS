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
  const [initData, setInitData] = useState({
    title: '',
    description: '',
    categoryId: '',
  });
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: initData,
  });
  const form = new FormData();

  useEffect(() => {
    userId && SDK.SubCategoryType.getById(userId)
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data)
      reset(res?.data);
      setCategoryId(res?.data.categoryId)
    })
    .catch((error) => {
      console.log("Error: ", error)
      setOpen(false, 'error');
    })

    SDK.CategoryType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setCategoryData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

  const handleChangeCategory = (event) => {
    console.log(event.target.value)
    setCategoryId(event.target.value);
  };

  const onSubmit = (values) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    const obj = {
        title: values.title,
        description: values.description,
        categoryId: values.categoryId,
        isActive: true
      }
      console.log(obj);
      
      SDK.SubCategoryType.update(userId, obj)
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
        <DialogTitle>Update Sub Category</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          {console.log("userData.fullName", userData.fullName)}
          <TextField
              {...register("title")}
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
              {...register("description")}
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
              {...register("categoryId")}
              label="Category"
              fullWidth
              name="categoryId"
              sx={{ minWidth: 120,  minHeight: 40 }}
              onChange={handleChangeCategory}
            >
            {categoryData.length > 0 && categoryData.map((category) => (
              <MenuItem value={category.id}>{category.title}</MenuItem>
            ))}
            </Select>
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
