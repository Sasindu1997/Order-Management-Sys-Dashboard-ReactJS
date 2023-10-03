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
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MDBox from "components/MDBox";
import { Theme, useTheme } from '@mui/material/styles';
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {SDK} from "../../../api/index";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState, useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const names = [
  { id : 1, name: 'Oliver Hansen'},
  { id : 2, name: 'test'},
  { id : 3, name: 'xxxx'},
 ];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function FormDialog({open, setOpen, type , id}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [rawMattdata, setRawMattdata] = useState([]);
  const [productData, setProductData] = useState([]);
  const [chemicalData, setChemicalData] = useState([]);
  const [value, setValue] = React.useState(0);
  const [personName, setPersonName] = React.useState([]);
  const [userId, setUserId] = React.useState('');
  const [productId, setProductId] = React.useState('');
  const [measureUnit, setMeasureUnit] = React.useState('');
  const theme = useTheme();
  const [checked, setChecked] = React.useState(true);
  const [checked1, setChecked1] = React.useState(true);
  const [openBackDrop, setOpenBackDrop] = React.useState(false);

  useEffect(() => {
    setOpenBackDrop(true)
    setProductId(id)
    console.log("wwwwwwwwwwwwwwwww", type, id)
    if(type == 'prod'){
      setValue(0);
    }else if(type == 'chem'){
      setValue(2);
    }else if(type == 'raw'){
      setValue(1);
    }
    SDK.RawMatsType.getAll()
    .then((res) => {
      console.log("RES mats: ", res);
      setRawMattdata(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })

    SDK.ProductType.getAll()
    .then((res) => {
      console.log("RES pro: ", res);
      setProductData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })

    SDK.ChemicalsType.getAll()
    .then((res) => {
      console.log("RES che: ", res);
      setChemicalData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
    setTimeout(function(){
      setOpenBackDrop(false);
    }, 1000);
  }, []);

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeSwitch1 = (event) => {
    setChecked1(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let arrayNames = [];
    let arrayNameschem = [];

    rawMattdata.map((raw, index) => {
        arrayNames.push({ initName: raw.name, initValue: data.get(`${raw.name}`), id: raw.id})  
    })

    chemicalData.map((raw, index) => {
      console.log(raw)
      arrayNameschem.push({ initName: raw.name, initValue: data.get(`${raw.name}`), id: raw.id})  
    })

    console.log("array2", arrayNames, arrayNameschem);

    const obj = {
        productId: data.get('product'),
        userId: data.get('userId'),
        quantity: data.get('quantity'),
        measureUnit: data.get('measureUnit'),
        rawMattdata: arrayNames,
        chemicaldata: arrayNameschem,
        stockType: "prod",
        isActive: true
      }

    console.log("objobj", obj);
    SDK.StockType.add(obj)
    .then((res) => {
      console.log("RES: ", res);
      res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
      // window.history.pushState("", "", "/users");
      setOpen(false, 'success');
    })
    .catch((error) => {
      console.log("Error: ", error)
      setErrorSB(true);
      setOpen(false, 'error');
    })
  };

  const handleSubmitMat = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const obj = {
        productId: data.get('product'),
        userId: data.get('userId'),
        quantity: data.get('quantity'),
        measureUnit: data.get('measureUnit'),
        stockType: "raw",
        isActive: true
      }

    console.log("objobj", obj);

    SDK.StockType.add(obj)
    .then((res) => {
      console.log("RES: ", res);
      res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
      // window.history.pushState("", "", "/users");
      setOpen(false, 'success');
    })
    .catch((error) => {
      console.log("Error: ", error)
      // setErrorSB(true);
      setOpen(false, 'error');
    })
  };

  const handleSubmitChem = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const obj = {
        productId: data.get('product'),
        userId: data.get('userId'),
        quantity: data.get('quantity'),
        measureUnit: data.get('measureUnit'),
        stockType: "chem",
        isActive: true
    }
    console.log("objobj", obj);

    SDK.StockType.add(obj)
    .then((res) => {
      console.log("RES: ", res);
      res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
      // window.history.pushState("", "", "/users");
      setOpen(false, 'success');
    })
    .catch((error) => {
      console.log("Error: ", error)
      // setErrorSB(true);
      setOpen(false, 'error');
    })
  };

  const handleChangeUserId = (event) => {
    console.log(event.target.value)
    setUserId(event.target.value);
  };

  const handleChangeMeasureUnit = (event) => {
    console.log(event.target.value)
    setMeasureUnit(event.target.value);
  };

  const handleChangepProductId = (event) => {
    console.log(event.target.value)
    setProductId(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add Stock</DialogTitle>
        <DialogContent fullWidth sx={{ width: '100%' }}>
          <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChangeTabs} aria-label="basic tabs example">
              <Tab label="Add Product" {...a11yProps(0)} />
              <Tab label="Add Material" {...a11yProps(1)} />
              <Tab label="Add Chemical" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <InputLabel id="demo-multiple-name-label" 
                sx={{ paddingTop: 2, paddingBottom: 2 }}>Product</InputLabel>
              <Select
                sx={{ minWidth: 120,  minHeight: 40 }}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="product"
                value={productId}
                fullWidth
                onChange={handleChangepProductId}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {productData.map((obj) => (
                  <MenuItem
                    key={obj.id}
                    value={obj.id}
                    style={getStyles(obj.name, personName, theme)}
                  >
                    {obj.productName}
                  </MenuItem>
                ))}
              </Select>

              <InputLabel id="demo-simple-select-label" 
                sx={{ paddingTop: 2, fontWeight: 'bold', fontSize: '18' }}>Add Materials</InputLabel>
                <Switch
                checked={checked}
                name="addMat"
                onChange={handleChangeSwitch}
                inputProps={{ 'aria-label': 'controlled' }}
              />

              {checked && rawMattdata.length > 0 ? 
                rawMattdata.map((data) => ( 
                <div sx={{ paddingTop: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6} xl={4}>
                      <InputLabel id="demo-simple-select-label" 
                        sx={{ paddingTop: 4 }}>{data.name}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={6} xl={4}>
                      <InputLabel id="demo-simple-select-label" 
                        sx={{ paddingTop: 4 }}>{data.unitOfMeasure}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={6} xl={4}>
                      <TextField
                        margin="normal"
                        required
                        name={data.name}
                        type="number"
                        id={data.name}
                      />
                    </Grid>
                  </Grid>
                </div>
                )) : ''}

                <InputLabel id="demo-simple-select-label" 
                sx={{ paddingTop: 2, fontWeight: 'bold', fontSize: '18' }}>Add Chemicals</InputLabel>
                <Switch
                checked={checked1}
                name="addMat"
                onChange={handleChangeSwitch1}
                inputProps={{ 'aria-label': 'controlled' }}
              />

                {checked1 && chemicalData.length > 0 ? 
                  chemicalData.map((data) => ( 
                  <div sx={{ paddingTop: 1 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={6} xl={4}>
                        <InputLabel id="demo-simple-select-label" 
                          sx={{ paddingTop: 4 }}>{data.name}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={6} xl={4}>
                        <InputLabel id="demo-simple-select-label" 
                          sx={{ paddingTop: 4 }}>{data.unitOfMeasure}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={6} xl={4}>
                        <TextField
                          margin="normal"
                          name={data.name}
                          type="number"
                          id={data.name}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  )) : ''}
        
              <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2 }}>Quantity</InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                name="quantity"
                label="Quantity"
                type="number"
                id="quantity"
                autoComplete="quantity"
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
                  sx={{ mt: 3, mb: 2, color: (theme) => '#FFFFFF', }}
                  >
                  Add
                  </Button>
              </div>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
              <Box component="form" onSubmit={handleSubmitMat} noValidate sx={{ mt: 1 }}>
              <InputLabel id="demo-multiple-name-label" 
                sx={{ paddingTop: 2, paddingBottom: 2 }}>Material</InputLabel>
              <Select
                sx={{ minWidth: 120,  minHeight: 40 }}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="product"
                value={productId}
                fullWidth
                onChange={handleChangepProductId}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {rawMattdata.map((obj) => (
                  <MenuItem
                    key={obj.id}
                    value={obj.id}
                    style={getStyles(obj.name, personName, theme)}
                  >
                    {obj.name}
                  </MenuItem>
                ))}
              </Select>

               {
               // <InputLabel id="demo-simple-select-label" 
              // sx={{ paddingTop: 2, paddingBottom: 2 }}>Measured Unit</InputLabel>
              // <Select
              //   labelId="measureUnit"
              //   id="measureUnit"
              //   value={measureUnit}
              //   label="Measured Unit"
              //   fullWidth
              //   name="measureUnit"
              //   sx={{ minWidth: 120,  minHeight: 40 }}
              //   onChange={handleChangeMeasureUnit}
              // >
              //   <MenuItem value={"unit"}>Unit</MenuItem>
              //   <MenuItem value={"kg"}>Kilo Gram</MenuItem>
              //   <MenuItem value={"g"}>Gram</MenuItem>
              //   <MenuItem value={"mg"}>Mili Gram</MenuItem>
              //   <MenuItem value={"l"}>Litre</MenuItem>
              //   <MenuItem value={"ml"}>Mili Litre</MenuItem>
              //   <MenuItem value={"m"}>Metre</MenuItem>
              //   <MenuItem value={"mm"}>Mili Metre</MenuItem>
              // </Select>
            }

              <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2 }}>Quantity</InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                name="quantity"
                label="Quantity"
                type="number"
                id="quantity"
                autoComplete="quantity"
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
                  sx={{ mt: 3, mb: 2, color: (theme) => '#FFFFFF', }}
                  >
                  Add
                  </Button>
              </div>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box component="form" onSubmit={handleSubmitChem} noValidate sx={{ mt: 1 }}>
              <InputLabel id="demo-multiple-name-label" 
                sx={{ paddingTop: 2, paddingBottom: 2 }}>Chemical</InputLabel>
              <Select
                sx={{ minWidth: 120,  minHeight: 40 }}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="product"
                value={productId}
                fullWidth
                onChange={handleChangepProductId}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {chemicalData.map((obj) => (
                  <MenuItem
                    key={obj.id}
                    value={obj.id}
                    style={getStyles(obj.name, personName, theme)}
                  >
                    {obj.name}
                  </MenuItem>
                ))}
              </Select>

              {
              // <InputLabel id="demo-simple-select-label" 
              // sx={{ paddingTop: 2, paddingBottom: 2 }}>Measured Unit</InputLabel>
              // <Select
              //   labelId="measureUnit"
              //   id="measureUnit"
              //   value={measureUnit}
              //   label="Measured Unit"
              //   fullWidth
              //   name="measureUnit"
              //   sx={{ minWidth: 120,  minHeight: 40 }}
              //   onChange={handleChangeMeasureUnit}
              // >
              //   <MenuItem value={"unit"}>Unit</MenuItem>
              //   <MenuItem value={"kg"}>Kilo Gram</MenuItem>
              //   <MenuItem value={"g"}>Gram</MenuItem>
              //   <MenuItem value={"mg"}>Mili Gram</MenuItem>
              //   <MenuItem value={"l"}>Litre</MenuItem>
              //   <MenuItem value={"ml"}>Mili Litre</MenuItem>
              //   <MenuItem value={"m"}>Metre</MenuItem>
              //   <MenuItem value={"mm"}>Mili Metre</MenuItem>
              // </Select>
            }

              <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2 }}>Quantity</InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                name="quantity"
                label="Quantity"
                type="number"
                id="quantity"
                autoComplete="quantity"
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
                  sx={{ mt: 3, mb: 2, color: (theme) => '#FFFFFF', }}
                  >
                  Add
                  </Button>
              </div>
            </Box>
          </TabPanel>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackDrop}
            // onClick={handleCloseBackDrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// <InputLabel id="demo-simple-select-label" 
//               sx={{ paddingTop: 2, paddingBottom: 2 }}>Measured Unit</InputLabel>
//               <Select
//                 labelId="measureUnit"
//                 id="measureUnit"
//                 value={measureUnit}
//                 label="Measured Unit"
//                 fullWidth
//                 name="measureUnit"
//                 sx={{ minWidth: 120,  minHeight: 40 }}
//                 onChange={handleChangeMeasureUnit}
//               >
//                 <MenuItem value={"unit"}>Unit</MenuItem>
//                 <MenuItem value={"kg"}>Kilo Gram</MenuItem>
//                 <MenuItem value={"g"}>Gram</MenuItem>
//                 <MenuItem value={"mg"}>Mili Gram</MenuItem>
//                 <MenuItem value={"l"}>Litre</MenuItem>
//                 <MenuItem value={"ml"}>Mili Litre</MenuItem>
//                 <MenuItem value={"m"}>Metre</MenuItem>
//                 <MenuItem value={"mm"}>Mili Metre</MenuItem>
//               </Select>