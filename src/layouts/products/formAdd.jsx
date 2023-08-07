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

import {SDK} from "../../api/index";

export default function FormDialog({open, setOpen, id}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [userData, setUserData] = useState([]);
  const [category, setCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');
  const [dataCategory, setDataCategory] = useState([]);
  const [dataSubCategory, setDataSubCategory] = useState([]);

  useEffect(() => {
    SDK.CategoryType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setDataCategory(res?.data);
    })
    .catch((error) => {
      console.log("Error: ", error)
    })

    SDK.SubCategoryType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setDataSubCategory(res?.data);
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
        productName: data.get('productName'),
        description: data.get('description'),
        productCode: data.get('productCode'),
        price: data.get('price'),
        sku: data.get('sku'),
        categoryId: data.get('category'),
        subCategoryId: data.get('subCategory'),
        brand: data.get('brand'),
        type: data.get('type'),
        imageURL: data.get('imageURL'),
        isActive: true
      }
      console.log(obj);
      
      SDK.ProductType.add(obj)
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

  const handleChangeCategory = (event) => {
    console.log(event.target.value)
    setCategory(event.target.value);
  };

  const handleChangeSubCategory = (event) => {
    console.log(event.target.value)
    setSubCategory(event.target.value);
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
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              required
              fullWidth
              name="productName"
              label="Product Name"
              type="productName"
              id="productName"
              autoComplete="productName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="productCode"
              label="productCode"
              id="productCode"
              autoComplete="productCode"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="price"
              type="number"
              id="price"
              autoComplete="price"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="type"
              label="type"
              id="type"
              autoComplete="type"
            />
            
            <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 1, paddingBottom: 2, paddingLeft: 2 }}>Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={category}
              label="Category"
              fullWidth
              name="category"
              sx={{ minWidth: 120,  minHeight: 40 }}
              onChange={handleChangeCategory}
            >
            {dataCategory.length > 0 && dataCategory.map((category) => (
              <MenuItem value={category.id}>{category.title}</MenuItem>
            ))}
            </Select>

            <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Sub Category</InputLabel>
            <Select
              labelId="subCategory"
              id="subCategory"
              name="subCategory"
              value={subCategory}
              label="Sub Category"
              fullWidth
              sx={{ minWidth: 120,  minHeight: 40 }}
              onChange={handleChangeSubCategory}
            >
            {dataSubCategory.length > 0 && dataSubCategory.map((category) => (
              <MenuItem value={category.id}>{category.title}</MenuItem>
            ))}
            </Select>

            <TextField
              margin="normal"
              required
              fullWidth
              name="brand"
              label="Brand"
              id="brand"
              autoComplete="brand"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="imageURL"
              label="Image URL"
              id="imageURL"
              autoComplete="imageURL"
            />
            <div style={{display: "flex", alignItems: "right", justifyContent: "end"}}>
            <Button onClick={handleClose}  sx={{ mt: 3, mb: 2 }}>Cancel</Button>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, color: (theme) => theme.palette.white[500], }}
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
