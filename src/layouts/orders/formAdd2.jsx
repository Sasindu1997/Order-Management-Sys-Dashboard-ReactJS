import React , {Component} from 'react';
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
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {SDK} from "../../api/index";
import CSVReader from 'react-csv-reader';
import axios from 'axios';
import { UPLOADINIT_URL, UPLOAD_URL } from '../../config.env'
import useMediaQuery from '@mui/material/useMediaQuery';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];
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

const names = [
 { id : 1, name: 'Oliver Hansen'},
 { id : 2, name: 'test'},
 { id : 3, name: 'xxxx'},
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FormDialog2({open, setOpen, id}) {
  const [successSB, setSuccessSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [userData, setUserData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [deliveryAccData, setDeliveryAccData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [userId, setUserId] = useState('');
  const [deliveryId, setDeliveryId] = useState('');
  const [productId, setProductId] = useState('');
  const [payemntMethod, setPayemntMethod] = useState('');
  const [status, setStatus] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [initData, setInitData] = useState(false);
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState(0);
  const [csvfile, setCsvfile] = useState(0);
  const [csvfileName, setCsvfileName] = useState('');
  const [inputList, setInputList] = useState([{ prid: "", prn: "", prw: "", prc: "" }]);
 
  const [openD, setOpenD] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    console.log("gggggggggggggggggg")
    setOpenD(false);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    console.log( e.target)
    console.log( value)
    console.log( index)

    const list = [...inputList];
    if(value) list[index][name] = value;
    name && value && setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { prid: "", prn: "", prw: "", prc: "" }]);
  };

  useEffect(() => {
    SDK.ProductType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setProductData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })

    SDK.CustomerType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setCustomerData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })

    SDK.DeliveryType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setDeliveryAccData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

  let filesInput = '';
  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };
  const [checkedToDelivery, setCheckedToDelivery] = React.useState(true);

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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeSwitchDelivery = (event) => {
    setCheckedToDelivery(event.target.checked);
  };


  const handleSubmit = (event) => {
    console.log("inputList", inputList)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
        customerId : data.get('customerId'),
        userId : data.get('userId'),
        // productId :data.get('products').split(','),
        productDetails : inputList,
        barcode : data.get('barcode'),
        // weight : data.get('weight'),
        // itemCount :data.get('itemCount'),
        paid : data.get('paid') === "on" ? true : false,
        total : data.get('total'),
        status : data.get('status'),
        shippingAddress : data.get('shippingAddress'),
        paymentMethod : data.get('paymentMethod'),
        shippingMethod : data.get('shippingMethod'),
        trackingNumber : data.get('trackingNumber'),
        orderId : data.get('orderId'),
        isDeliveryAdded : shippingMethod === "Delivery Service" ? true : false,
        deliveryId : shippingMethod === "Delivery Service" ? deliveryId : false,
        isActive: true
      }
      console.log(obj);
      
      SDK.OrderType.add(obj)
      .then((res) => {
        console.log("RES: ", res);
        res?.status === 200 ? setSuccessSB(true) : setWarningSB(true);
        // window.history.pushState("", "", "/orders");
        setOpen(false, 'success');
      })
      .catch((error) => {
        console.log("Error: ", error)
        setErrorSB(true);
        setOpen(false, 'error');
      })
  };

  const handleChangeDeliveryId = (event) => {
    console.log(event.target.value)
    setDeliveryId(event.target.value);
  };

  const handleChangeCustomerId = (event) => {
    console.log(event.target.value)
    setCustomerId(event.target.value);
  };

  const handleChangeStatus = (event) => {
    console.log(event.target.value)
    setStatus(event.target.value);
  };

  const handleChangePayment = (event) => {
    console.log(event.target.value)
    setPayemntMethod(event.target.value);
  };

  const handleShippingMethod = (event) => {
    console.log(event.target.value)
    setShippingMethod(event.target.value);
    setCheckedToDelivery(true)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinue = () => {
    setOpenD(false);

  };

  const handleUpload = (e) => {
    console.log(e.target.value)
  };
  
  const handleChangeFile = event => {
    console.log(event.target.files[0])
    setCsvfile(event.target.files[0]);
    setCsvfileName(event.target.files[0].name)
  };

  const importCSVInit = (e) => {
    e.preventDefault();
    let user = localStorage.getItem('loggedInUser')
    console.log(csvfile, user);

    var fileName = csvfile.name;
    const formData = new FormData();
    formData.append(
        "file",
        csvfile,
    );
    formData.append("isDeliveryAdded", checkedToDelivery);
    formData.append("deliveryId", deliveryId);
    formData.append("userId", user.id);

    console.log(formData);

    axios.post( UPLOADINIT_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  }).then(res => { // then print response status
        console.log(res)
        setInitData(res)
        setOpenD(res?.data ? true : false)
        if (res === 'success') {
            alert("File data uploaded Successfully");
        } else {
            if (res === 'Error') {
                alert("Please ensure that your CSV file is formatted using the correct template, if you have any doubt contact the support team.");

            } else {
                console.log(res)
            }
        }
    })
 };

 const importCSV = (e) => {
  e.preventDefault();
  let user = localStorage.getItem('loggedInUser')
  console.log(csvfile, user);

  var fileName = csvfile.name;
  const formData = new FormData();
  formData.append(
      "file",
      csvfile,
  );
  formData.append("isDeliveryAdded", checkedToDelivery);
  formData.append("deliveryId", deliveryId);
  formData.append("userId", user.id);

  console.log(formData);

  axios.post( UPLOAD_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
}).then(res => { // then print response status
      console.log(res)
      setInitData(res)
      if (res === 'success') {
          alert("File data uploaded Successfully");
      } else {
          if (res === 'Error') {
              alert("Please ensure that your CSV file is formatted using the correct template, if you have any doubt contact the support team.");

          } else {
              console.log(res)
          }
      }
  })
};

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      </Box>
      <DialogTitle >Add Bulk Order</DialogTitle>
      <DialogContent sx={{width: '350px'}} >
        <Box component="form"  fullWidth noValidate sx={{ minWidth: 120,  minHeight: 40, mt: 1 }}>

          <div className="App">
          <h4>Upload CSV File Here.</h4>
          <input type="file" name='file' id='file' value={''} title=" "  onChange={handleChangeFile} />
          </div>

          <div style={{marginTop:'20px', display: "flex", flexDirection: 'row'}}>
          <h4 style={{paddingTop:'6px'}}>Add all records to delivery: </h4>
          <Switch
            checked={checkedToDelivery}
            name="addMat"
            onChange={handleChangeSwitchDelivery}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          </div>

         {checkedToDelivery && <h4 style={{paddingTop:'6px'}}>Select Delivery Account</h4>}
         {checkedToDelivery && 
        <Select
          labelId="deliveryId"
          id="deliveryId"
          value={deliveryId}
          label="deliveryId"
          fullWidth
          name="deliveryId"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleChangeDeliveryId}
        >
        {deliveryAccData?.map((obj) => (
            <MenuItem
              key={obj.id}
              value={obj.id}
              style={getStyles(obj.name, personName, theme)}
            >
              {obj.userName}
            </MenuItem>
          ))}
        </Select>}

          <div style={{display: "flex", alignItems: "right", justifyContent: "end"}}>
          <Button onClick={handleClose}  sx={{ mt: 3, mb: 2 }}>Cancel</Button>
          <Button
              onClick={importCSVInit}
              variant="contained"
              sx={{ mt: 3, mb: 2, color: (theme) => theme.palette.white[500], }}
              >
              Upload
              </Button>
          </div>
          </Box>
        </DialogContent>
        <Dialog
        fullScreen={fullScreen}
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Previously Orders of Customers"}
        </DialogTitle>
        <DialogContent>
         
          <Paper sx={{ width: '100%' }}>
            {initData?.data?.data?.length > 0 ? initData?.data?.data?.map(init => (
              <><TableContainer sx={{ maxHeight: 440 }}>
              <DialogTitle id="responsive-dialog-title">
                {init.phone}
              </DialogTitle>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      Country
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /></>
            )) : <><h4>No Previous Orders Found.</h4></>
          }
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseD}>
            Cancel
          </Button>
          <Button onClick={importCSV} autoFocus>
            Continue Upload
          </Button>
        </DialogActions>
      </Dialog>
      </Dialog>
    </div>
  );
}
