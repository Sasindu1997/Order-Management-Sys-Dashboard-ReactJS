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
import FormControl from '@mui/material/FormControl';
import DatePicker from "react-datepicker";
import SearchableDropdown from "./SearchableDropdown";
import "react-datepicker/dist/react-datepicker.css";
import "./customdatepickerwidth2.css";
import "./style.css";

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
  const [smsData, setSmsData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [deliveryAccData, setDeliveryAccData] = useState([]);
  const [managers, setManagers] = useState([]);
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [userId, setUserId] = useState('');
  const [deliveryId, setDeliveryId] = useState('');
  const [smsBody, setSmsBody] = useState('Your Order Has Been Placed. Thank You!');
  const [productId, setProductId] = useState('');
  const [payemntMethod, setPayemntMethod] = useState('');
  const [district, setDistrict] = useState('');
  const [status, setStatus] = useState('Pending');
  const [shippingMethod, setShippingMethod] = useState('');
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [initData, setInitData] = useState(false);
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState(0);
  const [csvfile, setCsvfile] = useState(0);
  const [totalAmount, setTotalAmount] = useState();
  const [csvfileName, setCsvfileName] = useState('');
  const [inputList, setInputList] = useState([{ prid: "", prn: "", prw: "", prc: "", prcat: "" }]);
  const [values, setValues] = useState("");
  const [parcelType, setParcelType] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState("0");
  const [supplierName, setSupplierName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [customDelCharge, setCustomDelCharge] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  
  const [openD, setOpenD] = React.useState(true);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // handle input change
  const handleInputChange = (e, index) => {
    let total = 0
    const { name, value } = e.target;
    if(name === 'prcat'){
      console.log("fffffffffffffffffff", name, value )
      setSelectedCategoryId(value)
    }
    console.log( e.target)
    console.log( value)
    console.log( index)

    const list = [...inputList];
    if(value) list[index][name] = value;
    name && value && setInputList(list);

    console.log("list", list)
    list.map(item => {
      let prd = productData.filter(pr => pr?.id === item?.prid);
      total += prd[0]?.price * item?.prc;
      console.log("prd", prd[0]?.price)
    })

    console.log("total", total, deliveryCharge, customDelCharge)
    console.log("totaldeliveryCharge", deliveryCharge > 0 && deliveryCharge != 'Custom' ? total + parseInt(deliveryCharge) : total + parseInt(customDelCharge))


    // setTotalAmount(total.toFixed(2))
    // setSubTotal(total.toFixed(2))
    
    setTotalAmount(deliveryCharge > 0 && deliveryCharge != 'Custom' ? (total + parseInt(deliveryCharge)).toFixed(2) : (total + parseInt(customDelCharge)).toFixed(2))
    setSubTotal(total.toFixed(2))
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
      total += prd[0]?.price * item.prc;
      console.log("prd", prd[0]?.price)
    })
    console.log("total", total)
    setTotalAmount(total.toFixed(2))
    setSubTotal(total.toFixed(2))
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { prid: "", prn: "", prw: "", prc: "", prcat: "" }]);
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

    SDK.SmsTextType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setSmsData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })

    SDK.CategoryType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setCategoryData(res?.data)
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

    SDK.UserType.findAllManagers()
    .then((res) => {
      console.log("RES: ", res);
      setManagers(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

  // useEffect(() => {
  //   selectedCategoryId && SDK.ProductType.getAllByCategoryId(selectedCategoryId)
  //   .then((res) => {
  //     console.log("RES: ", res);
  //     setProductData(res?.data)
  //   })
  //   .catch((error) => {
  //     console.log("Error: ", error)
  //   })
  // }, [selectedCategoryId])

  useEffect(() => {
    setTimeout(function(){
      customDelCharge > 0 && setTotalAmount(parseInt(subTotal) + parseInt(customDelCharge))
   }, 1000); 
  }, [customDelCharge])

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

  const handleCustomDelCharge = (event) => {
    console.log(totalAmount, event.target.value, parseInt(totalAmount) + parseInt(event.target.value))
    setCustomDelCharge(event.target.value);
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
    let user = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log("inputList", inputList, user)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
        customerId : customerId,
        email: data.get('email'),
        fullName: data.get('fullName'),
        district: district,
        phone: data.get('phone'),
        phone2: data.get('phone2'),
        address: data.get('address'),
        userId : user?.id,
        productDetails : inputList,
        barcode : data.get('barcode'),
        weight : data.get('weight'),
        subTotal: subTotal, 
        total : data.get('total'),
        status : status,
        shippingAddress : data.get('shippingAddress'),
        paymentMethod : payemntMethod === 'Custom' ? data.get('custompayemntMethod') : payemntMethod,
        // custompayemntMethod : data.get('custompayemntMethod'),
        hub : data.get('hub'),
        parcelType: parcelType === 'Custom' ? data.get('customparceltype') : parcelType,
        // customparceltype :  data.get('customparceltype'),
        shippingMethod : data.get('shippingMethod'),
        trackingNumber : data.get('orderId'),
        supplierName : supplierName,
        deliveryCharge: deliveryCharge === 'Custom' ? data.get('customdeliveryCharge') : deliveryCharge,
        // customdeliveryCharge: data.get('customdeliveryCharge'),
        remark: data.get('remark'),
        smsbody: smsBody,
        supplierId : supplierName,
        isDeliveryAdded : shippingMethod === "Delivery Service" ? true : false,
        deliveryId : deliveryId ? deliveryId : false,
        createdAt: startDate,
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

  const handleChangeSmsBody = (event) => {
    console.log(event.target.value)
    setSmsBody(event.target.value);
  };

  const handleChangeSupplier = (event) => {
    console.log(event.target.value)
    setSupplierName(event.target.value);
  };
  
  const handleTotalAmount = (event) => {
    setTotalAmount(event.target.value);
  };

  const handleChangeCustomerId = (event) => {
    console.log(event?.id)
    setCustomerId(event?.id);
    setValues(event?.fullName);
  };

  const handleChangeStatus = (event) => {
    console.log(event.target.value)
    setStatus(event.target.value);
  };

  const handleChangeParcelType = (event) => {
    console.log(event.target.value)
    setParcelType(event.target.value);
  };

  const handleChangeDeliveryCharge = (event) => {
    console.log(event.target.value)
    console.log(subTotal, event.target.value, parseInt(subTotal) + parseInt(event.target.value))
    setTotalAmount(event.target.value != 'Custom' ? (parseInt(subTotal) + parseInt(event.target.value)).toFixed(2) : subTotal)
    setDeliveryCharge(event.target.value);
  };

  const handleChangePayment = (event) => {
    console.log(event.target.value)
    setPayemntMethod(event.target.value);
  };

  const handleChangeDistrict = (event) => {
    console.log(event.target.value)
    setDistrict(event.target.value);
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
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Category</InputLabel>
          <Select
            sx={{ minWidth: 120,  minHeight: 40 }}
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            // multiple
            name="prcat"
            // value={personName}
            value={x.prcat}
            fullWidth
            // onChange={handleChange}
            onChange={e => handleInputChange(e, i)}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {categoryData?.map((obj) => (
              <MenuItem
                key={obj.id}
                value={obj.id}
                extra={obj.title}
                style={getStyles(obj.name, personName, theme)}
              >
                {obj.title}
              </MenuItem>
            ))}
          </Select>
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
                    variant="outlined"
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
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2,  fontWeight: 'bold' }}>Customer Details</InputLabel>
        {/*<Select
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
        </Select>*/}
        
        {/*<div className="App">
        <SearchableDropdown
          options={customerData}
          label="fullName"
          value="id"
          id="id"
          selectedVal={values}
          handleChange={(val) => handleChangeCustomerId(val)}
        />
      </div>*/}

      <TextField
              margin="normal"
              required
              fullWidth
              name="fullName"
              label="Full Name"
              type="fullName"
              id="fullName"
              autoComplete="fullName"
              autoFocus
            />
            {/*<TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />*/}
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone Number 1"
              type="number"
              id="phone"
              autoComplete="phone"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone2"
              label="Phone Number 2"
              type="number"
              id="phone2"
              autoComplete="phone2"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              type="address"
              id="address"
              autoComplete="address"
            />
            {/*<TextField
              margin="normal"
              required
              fullWidth
              name="district"
              label="District"
              type="district"
              id="district"
              autoComplete="district"
          />*/}
          

        <InputLabel id="demo-simple-select-label" 
        sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>District</InputLabel>
        <Select
          labelId="district"
          id="district"
          value={district}
          label="district"
          fullWidth
          MenuProps={MenuProps}
          name="district"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleChangeDistrict}
        >
          <MenuItem value={"Jaffna"}>Jaffna</MenuItem>
          <MenuItem value={"Kilinochchi"}>Kilinochchi</MenuItem>
          <MenuItem value={"Mullativu"}>Mullativu</MenuItem>
          <MenuItem value={"Mannar"}>Mannar</MenuItem>
          <MenuItem value={"Vavuniya"}>Vavuniya</MenuItem>
          <MenuItem value={"Anuradhapura"}>Anuradhapura</MenuItem>
          <MenuItem value={"Trincomalee"}>Trincomalee</MenuItem>
          <MenuItem value={"Puttalam"}>Puttalam</MenuItem>
          <MenuItem value={"Kurunegala"}>Kurunegala</MenuItem>
          <MenuItem value={"Matale"}>Matale</MenuItem> 
          <MenuItem value={"Polonnaruwa"}>Polonnaruwa</MenuItem>
          <MenuItem value={"Batticaloa"}>Batticaloa</MenuItem>
          <MenuItem value={"Gampaha"}>Gampaha</MenuItem>
          <MenuItem value={"Kegalle"}>Kegalle</MenuItem>
          <MenuItem value={"Kandy"}>Kandy</MenuItem>
          <MenuItem value={"Badulla"}>Badulla</MenuItem>
          <MenuItem value={"Ampara"}>Ampara</MenuItem>
          <MenuItem value={"Colombo"}>Colombo</MenuItem>
          <MenuItem value={"Nuwaraeliya"}>Nuwaraeliya</MenuItem>
          <MenuItem value={"Kalutara"}>Kalutara</MenuItem>
          <MenuItem value={"Ratnapura"}>Ratnapura</MenuItem>
          <MenuItem value={"Moneragala"}>Moneragala</MenuItem>
          <MenuItem value={"Galle"}>Galle</MenuItem>
          <MenuItem value={"Matara"}>Matara</MenuItem>
          <MenuItem value={"Hambantota"}>Hambantota</MenuItem>
        </Select>
        
        {/*<TextField
          margin="normal"
          required
          fullWidth
          name="itemCount"
          label="Item Count"
          type="number"
          id="itemCount"
        />*/}

      { /*<InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Paid</InputLabel>
          <Switch
          checked={checked}
          name="paid"
          onChange={handleChangeSwitch}
          inputProps={{ 'aria-label': 'controlled' }}
      />*/}

      <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2, fontWeight: 'bold' }}>Order Details</InputLabel>

        <InputLabel id="demo-simple-select-label" 
        sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Payment Method</InputLabel>
        <Select
          labelId="payemntMethod"
          id="payemntMethod"
          value={payemntMethod}
          label="payemntMethod"
          fullWidth
          MenuProps={MenuProps}
          name="payemntMethod"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleChangePayment}
        >
          <MenuItem value={"Already Paid"}>Already Paid</MenuItem>
          <MenuItem value={"COD"}>COD</MenuItem>
          <MenuItem value={"Custom"}>Custom</MenuItem>
          <MenuItem value={"Promotion"}>Promotion</MenuItem>
        </Select>

        { payemntMethod === 'Custom' && <>
          <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingLeft: 2 }}>Custom Payment Method</InputLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          name="custompayemntMethod"
          id="custompayemntMethod"
        /></>}

        <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingLeft: 2 }}>Hub</InputLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          name="hub"
          id="hub"
        />

        <TextField
          margin="normal"
          required
          defaultValue={1}
          fullWidth
          id="weight (Kg)"
          type="number"
          label="Weight (Kg)"
          name="weight"
        />

        <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Parcel Type</InputLabel>
        <Select
          labelId="parceltype"
          id="parceltype" 
          value={parcelType}
          label="Parcel type"
          fullWidth
          MenuProps={MenuProps}
          name="parceltype"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleChangeParcelType}
        >
          <MenuItem value={"Regular"}>Regular</MenuItem>
          <MenuItem value={"Promotion"}>Promotion</MenuItem>
          <MenuItem value={"Exchange"}>Exchange</MenuItem>
          <MenuItem value={"Custom"}>Custom</MenuItem>
        </Select>

        { parcelType === 'Custom' && <>
        <InputLabel id="demo-simple-select-label" 
        sx={{ paddingTop: 2, paddingLeft: 2 }}>Custom Parcel Type</InputLabel>
      <TextField
        margin="normal"
        required
        fullWidth
        name="customparceltype"
        id="customparceltype"
      /></>}

      <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Delivery Charge</InputLabel>
        <Select
          labelId="deliveryCharge"
          id="deliveryCharge" 
          value={deliveryCharge}
          label="Parcel type"
          fullWidth
          MenuProps={MenuProps}
          name="deliveryCharge"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleChangeDeliveryCharge}
        >
          <MenuItem value={"300"}>300</MenuItem>
          <MenuItem value={"400"}>400</MenuItem>
          <MenuItem value={"Custom"}>Custom</MenuItem>
        </Select>

        { deliveryCharge === 'Custom' && <>
        <InputLabel id="demo-simple-select-label" 
        sx={{ paddingTop: 2, paddingLeft: 2 }}>Custom Delivery Charge</InputLabel>
      <TextField
        margin="normal"
        required
        fullWidth
        type='number'
        value={customDelCharge}
        onChange={(e) => handleCustomDelCharge(e)}
        name="customdeliveryCharge"
        id="customdeliveryCharge"
      /></>}


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
          MenuProps={MenuProps}
          name="status"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleChangeStatus}
        >
          <MenuItem value={"Pending"}>Pending</MenuItem>
          <MenuItem value={"Waiting"}>Waiting</MenuItem>
          <MenuItem value={"Delivered"}>Delivered</MenuItem>
          <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
          <MenuItem value={"Returned"}>Returned</MenuItem>
        </Select>

        <InputLabel id="demo-simple-select-label" 
        sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Supplier</InputLabel>
        <Select
          labelId="supplier"
          id="supplier"
          value={supplierName}
          label="Supplier"
          fullWidth
          MenuProps={MenuProps}
          name="supplier"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleChangeSupplier}                                                                    
        >
        {managers?.map((obj) => (
          <MenuItem
            key={obj.id}
            value={obj.id}
            extra={obj.userName}
            style={getStyles(obj.name, personName, theme)}
          >
            {obj.userName}
          </MenuItem>
        ))}
        </Select>

        <InputLabel id="demo-simple-select-label" 
        sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Shipping Method</InputLabel>
        <Select
          labelId="shippingMethod"
          id="shippingMethod"
          value={shippingMethod}
          label="Shipping Method"
          fullWidth
          MenuProps={MenuProps}
          name="shippingMethod"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleShippingMethod}
        >
          <MenuItem value={"Rider"}>Rider</MenuItem>
          <MenuItem value={"Delivery Service"}>Delivery Service</MenuItem>
        </Select>

        {shippingMethod === 'Delivery Service' && <><TextField
          margin="normal"
          required
          fullWidth
          name="orderId"
          label="WayBill No"
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
          MenuProps={MenuProps}
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
          </Select></>}


          {shippingMethod === 'Rider' && <>
          <InputLabel id="demo-simple-select-label" 
            sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>Select SMS Account</InputLabel>
          <Select
          labelId="deliveryId"
          id="deliveryId"
          value={deliveryId}
          label="deliveryId"
          fullWidth
          name="deliveryId"
          MenuProps={MenuProps}
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleChangeDeliveryId}
        >
            {deliveryAccData?.map((obj) => (
                <MenuItem
                  key={obj.id}
                  value={obj.id}
                  style={getStyles(obj.name, personName, theme)}
                >
                  {obj.description}
                </MenuItem>
              ))}
          </Select></>}

        <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingLeft: 2 }}>Remark</InputLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          name="remark"
          id="remark"
        />

        <InputLabel id="demo-simple-select-label" 
          sx={{ paddingTop: 2, paddingLeft: 2, paddingBottom: 2  }}>SMS Body</InputLabel>
        {/*<TextField
          margin="normal"
          required
          defaultValue={'Your Order has been placed. Thank you.'}
          fullWidth
          name="smsbody"
          id="smsbody"
        />*/}
        <Select
          labelId="smsbody"
          id="smsbody" 
          value={smsBody}
          label="smsbody"
          fullWidth
          MenuProps={MenuProps}
          name="smsbody"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleChangeSmsBody}
        >
        {smsData?.map((obj) => (
          <MenuItem
            key={obj.id}
            value={obj.text}
          >
            {obj.text}
          </MenuItem>
        ))}
        </Select>
        <Grid item xs={4} classname="customdatepickerwidth" >
        <InputLabel id="demo-simple-select-label" 
        style={{justifyContent: "start"}}
        sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2}}>Order Date</InputLabel>
        
        <div className="datepicker-container">
        <div className="dates-container">
          <div className="date-item"></div>
        </div>
        <div className="react-datepicker-wrapper">
          <DatePicker className='react-datepicker1' onChange={(date) => setStartDate(date)} selected={startDate}  dateformat="dd/mm/yyyy" />
        </div>
      </div>
      </Grid>

        <div style={{display: "flex", alignItems: "right", justifyContent: "end"}}>
        <Button onClick={handleClose}  sx={{ mt: 3, mb: 2 }}>Cancel</Button>
        <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, color: '#FFFFFF', }}
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
