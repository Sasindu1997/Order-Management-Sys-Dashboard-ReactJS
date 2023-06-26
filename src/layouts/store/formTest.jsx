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
import {SDK} from "../../api/index";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState, useEffect } from "react";

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


export default function FormDialog({open, setOpen, id}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [rawMattdata, setRawMattdata] = useState([]);
  const [value, setValue] = React.useState(0);
  const [personName, setPersonName] = React.useState([]);
  const [userId, setUserId] = React.useState('');
  const [productId, setProductId] = React.useState('');
  const [measureUnit, setMeasureUnit] = React.useState('');
  const theme = useTheme();
  const [checked, setChecked] = React.useState(true);

  useEffect(() => {
    SDK.RawMatsType.getAll()
    .then((res) => {
      console.log("RES mats: ", res);
      setRawMattdata(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let arrayNames = [];
    rawMattdata.map((raw, index) => {
        arrayNames.push({ initName: raw.name, initValue: data.get(`${raw.name}`), index: index})  
    })

    console.log("array2", arrayNames);

    const obj = {
        product: data.get('product'),
        userId: data.get('userId'),
        quantity: data.get('quantity'),
        measureUnit: data.get('measureUnit'),
        rawMattdata: arrayNames,
        isActive: true
      }

    console.log("objobj", obj);

      
    //   SDK.UserType.add(obj)
    // .then((res) => {
    //   console.log("RES: ", res);
    //   res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
    //   window.history.pushState("", "", "/users");
    //   setOpen(false);
    // })
    // .catch((error) => {
    //   console.log("Error: ", error)
    //   setErrorSB(true);
    //   setOpen(false);
    // })
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

  const handleClickOpen = () => {
    setOpen(true);
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
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <InputLabel id="demo-multiple-name-label" 
                sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Products</InputLabel>
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
                {names.map((obj) => (
                  <MenuItem
                    key={obj.id}
                    value={obj.id}
                    style={getStyles(obj.name, personName, theme)}
                  >
                    {obj.name}
                  </MenuItem>
                ))}
              </Select>

              <InputLabel id="demo-simple-select-label" 
                sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>User</InputLabel>
              <Select
                labelId="userId"
                id="userId"
                value={userId}
                label="userId"
                fullWidth
                name="userId"
                sx={{ minWidth: 120,  minHeight: 40 }}
                onChange={handleChangeUserId}
              >
                <MenuItem value={1}>user 1</MenuItem>
                <MenuItem value={2}>user 2</MenuItem>
                <MenuItem value={3}>user 3</MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label" 
                sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Add Materials</InputLabel>
                <Switch
                checked={checked}
                name="addMat"
                onChange={handleChangeSwitch}
                inputProps={{ 'aria-label': 'controlled' }}
              />

              {checked && rawMattdata.length > 0 ? 
                rawMattdata.map((data) => ( 

                <div>
                  <Grid container spacing={1}>
                    <Grid item xs={6} xl={4}>
                      <InputLabel id="demo-simple-select-label" 
                        sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>{data.name}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={6} xl={4}>
                      <InputLabel id="demo-simple-select-label" 
                        sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>{data.unitOfMeasure}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={6} xl={4}>
                      <TextField
                        margin="normal"
                        required
                        name={data.name}
                        type="number"
                        id={data.name}
                        autoFocus
                      />
                    </Grid>
                  </Grid>
                </div>

                )) : ''}
        
              <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Quantity</InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                name="quantity"
                label="Quantity"
                type="number"
                id="quantity"
                autoComplete="quantity"
                autoFocus
              />

              <InputLabel id="demo-simple-select-label" 
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Measured Unit</InputLabel>
              <Select
                labelId="measureUnit"
                id="measureUnit"
                value={measureUnit}
                label="Measured Unit"
                fullWidth
                name="measureUnit"
                sx={{ minWidth: 120,  minHeight: 40 }}
                onChange={handleChangeMeasureUnit}
              >
                <MenuItem value={"unit"}>Unit</MenuItem>
                <MenuItem value={"kg"}>Kilo Gram</MenuItem>
                <MenuItem value={"g"}>Gram</MenuItem>
                <MenuItem value={"mg"}>Mili Gram</MenuItem>
                <MenuItem value={"l"}>Litre</MenuItem>
                <MenuItem value={"ml"}>Mili Litre</MenuItem>
                <MenuItem value={"m"}>Metre</MenuItem>
                <MenuItem value={"mm"}>Mili Metre</MenuItem>
              </Select>

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
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
          
          
         
        </DialogContent>
      </Dialog>
    </div>
  );
}
