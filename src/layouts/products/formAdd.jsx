import * as React from 'react';
import { useState } from "react";
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
      window.history.pushState("", "", "/products");
      setOpen(false);
    })
    .catch((error) => {
      console.log("Error: ", error)
      setErrorSB(true);
      setOpen(false);
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
              <MenuItem value={1}>Category 1</MenuItem>
              <MenuItem value={2}>Category 2</MenuItem>
              <MenuItem value={3}>Category 3</MenuItem>
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
              <MenuItem value={1}>Sub Category 1</MenuItem>
              <MenuItem value={2}>Sub Category 2</MenuItem>
              <MenuItem value={3}>Sub Category 3</MenuItem>
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
            <div style={{justifySelf: 'center', alignItems: 'flex-end'}} sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}>
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
