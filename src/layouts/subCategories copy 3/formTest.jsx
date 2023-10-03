import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import {SDK} from "../../api/index";

export default function FormDialog({open, setOpen, id}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [userData, setUserData] = useState([]);
  const [categoryId, setCategoryId] = React.useState('');
  const [errorVM, setErrorVM] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('name') == '' || data.get('name') == 'undefined' || data.get('name') == null){
      setErrorVM("Enter a Valid Income Name.");
      return;
    } 
    
    const obj = {
        name: data?.get('name'),
        description: data?.get('description'),
        isActive: true
      }
      console.log(obj);
      
      SDK.IncomeStreamType.add(obj)
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
        <DialogTitle>Add Income Stream</DialogTitle>
        <DialogContent >
          <Box  component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '25vw' }}>
            <TextField
              margin="normal"
              fullWidth
              name="name"
              label="name"
              id="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="description"
              id="description"
              autoComplete="description"
            />
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
