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

export default function FormDialog({open, setOpen, id}) {
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
  const [totalAmount, setTotalAmount] = useState();
  const [csvfileName, setCsvfileName] = useState('');
  const [inputList, setInputList] = useState([{ prid: "", prn: "", prw: "", prc: "" }]);
 
  const [openD, setOpenD] = React.useState(true);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // handle input change
  const handleInputChange = (e, index) => {
    let total = 0
    const { name, value } = e.target;
    console.log( e.target)
    console.log( value)
    console.log( index)

    const list = [...inputList];
    if(value) list[index][name] = value;
    name && value && setInputList(list);

    console.log("list", list)
    list.map(item => {
      let prd = productData.filter(pr => pr.id === item.prid);
      total += prd[0].price * item.prc;
      console.log("prd", prd[0].price)
    })

    console.log("total", total)
    setTotalAmount(total.toFixed(2))
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    let total = 0
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    console.log("list", list)
    list.map(item => {
      let prd = productData.filter(pr => pr.id === item.prid);
      total += prd[0].price * item.prc;
      console.log("prd", prd[0].price)
    })
    console.log("total", total)
    setTotalAmount(total.toFixed(2))
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
        status : status,
        shippingAddress : data.get('shippingAddress'),
        paymentMethod : payemntMethod,
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
  
  const handleTotalAmount = (event) => {
    setTotalAmount(event.target.value);
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Order</DialogTitle>
      <DialogContent  sx={{ width : '15cm' }}>
      <Box component="form" 
      onSubmit={handleSubmit} 
      noValidate sx={{ mt: 1 }}>

      {inputList.map((x, i) => {
        return (
          <div className="box">
          <InputLabel id="demo-multiple-name-label" 
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Products</InputLabel>
          <Select
            sx={{ minWidth: 120,  minHeight: 40 }}
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            // multiple
            name="prid"
            // value={personName}
            value={x.prid}
            fullWidth
            // onChange={handleChange}
            onChange={e => handleInputChange(e, i)}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {productData?.map((obj) => (
              <MenuItem
                key={obj.id}
                value={obj.id}
                extra={obj.productName}
                style={getStyles(obj.name, personName, theme)}
              >
                {obj.productName}
              </MenuItem>
            ))}
          </Select>
          {/*<TextField
            margin="normal"
            required
            fullWidth
            name="prw"
            label="Weight"
            hidden={true}
            id="prw"
            value={x.prw}
            onChange={e => handleInputChange(e, i)}
          />*/}
          <TextField
            margin="normal"
            required
            fullWidth
            name="prc"
            label="Count"
            id="prc"
            value={x.prc}
            onChange={e => handleInputChange(e, i)}
          />
            <div className="btn-box" style={{display: "flex", alignItems: "right", justifyContent: "end"}}>
              {inputList.length !== 1 && <Button
                className="mr10"
                onClick={() => handleRemoveClick(i)}
                variant=""
                sx={{ mt: 3, mb: 2, color: 'orange', }}
                >Remove</Button>}
              {inputList.length - 1 === i && 
                  <Button
                    variant=""
                    sx={{ mt: 3, mb: 2, color: 'blue', }}
                    onClick={handleAddClick}>Add
                  </Button>}
            </div>
          </div>
        );
      })}
      {/*<div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>*/}

        {/*<InputLabel id="demo-multiple-name-label" 
        sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Products</InputLabel>
        <Select
          sx={{ minWidth: 120,  minHeight: 40 }}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          name="products"
          value={personName}
          fullWidth
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {productData?.map((obj) => (
            <MenuItem
              key={obj.id}
              value={obj.id}
              style={getStyles(obj.name, personName, theme)}
            >
              {obj.productName}
            </MenuItem>
          ))}
          </Select>*/}

        <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Customer</InputLabel>
        <Select
          labelId="customerId"
          id="customerId"
          value={customerId}
          label="customerId"
          fullWidth
          name="customerId"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleChangeCustomerId}
        >
        {customerData?.map((obj) => (
            <MenuItem
              key={obj.id}
              value={obj.id}
              style={getStyles(obj.name, personName, theme)}
            >
              {obj.fullName}
            </MenuItem>
          ))}
        </Select>
        
        {/*<TextField
          margin="normal"
          required
          fullWidth
          id="weight (Kg)"
          type="number"
          label="Weight"
          name="weight"
        />*/}
        {/*<TextField
          margin="normal"
          required
          fullWidth
          name="itemCount"
          label="Item Count"
          type="number"
          id="itemCount"
        />*/}

        <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Paid</InputLabel>
          <Switch
          checked={checked}
          name="paid"
          onChange={handleChangeSwitch}
          inputProps={{ 'aria-label': 'controlled' }}
        />

        {checked && <><InputLabel id="demo-simple-select-label" 
        sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Payment Method</InputLabel>
        <Select
          labelId="payemntMethod"
          id="payemntMethod"
          value={payemntMethod}
          label="payemntMethod"
          fullWidth
          name="payemntMethod"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleChangePayment}
        >
          <MenuItem value={"cash"}>Cash</MenuItem>
          <MenuItem value={"card"}>Card</MenuItem>
          <MenuItem value={"cheque"}>Cheque</MenuItem>
          <MenuItem value={"gift"}>Gift</MenuItem>
        </Select></>}

        <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingLeft: 2 }}>Total</InputLabel>
        <TextField
          value={totalAmount}
          onChange={handleTotalAmount}
          margin="normal"
          required
          fullWidth
          name="total"
          type='number'
          id="total"
        />

        <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Order Status</InputLabel>
        <Select
          labelId="status"
          id="status" 
          value={status}
          label="status"
          fullWidth
          name="status"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleChangeStatus}
        >
          <MenuItem value={"Packing"}>Packing</MenuItem>
          <MenuItem value={"Shipping"}>Shipping</MenuItem>
          <MenuItem value={"Delivered"}>Delivered</MenuItem>
          <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
          <MenuItem value={"Returned"}>Returned</MenuItem>
        </Select>

        <InputLabel id="demo-simple-select-label" 
        sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Shipping Method</InputLabel>
        <Select
          labelId="shippingMethod"
          id="shippingMethod"
          value={shippingMethod}
          label="Shipping Method"
          fullWidth
          name="shippingMethod"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleShippingMethod}
        >
          <MenuItem value={"Rider"}>Rider</MenuItem>
          <MenuItem value={"Delivery Service"}>Delivery Service</MenuItem>
          <MenuItem value={"gift"}>Gift</MenuItem>
        </Select>

         {shippingMethod === "Delivery Service" && 
              <>
              <TextField
                margin="normal"
                required
                fullWidth
                name="orderId"
                label="Order ID"
                id="orderId"
              />
              <InputLabel id="demo-simple-select-label" 
         sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Select Delivery Account</InputLabel>
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
            </Select>
            </>}

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
