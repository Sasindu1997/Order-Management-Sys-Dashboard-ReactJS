/**
=========================================================
* Dashboard React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import * as React from 'react';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import MDInput from "components/MDInput";
// Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Icon from "@mui/material/Icon";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import team2 from "assets/images/team-2.jpg";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import Barcode from 'react-barcode';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import DatePicker from "react-datepicker";
import { CSVLink, CSVDownload } from "react-csv";
import "react-datepicker/dist/react-datepicker.css";
import "./customdatepickerwidth3.css";
import "./style.css";

// Data
import {SDK} from "../../api/index";

import { useState, useEffect } from "react";
import FormDialog from "./formAdd";
import FormDialog2 from "./formAdd2";
import FormDialogUpdate from "./updateModal";
import FormDialogView from "./viewModal"
// import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


let user = localStorage.getItem('loggedInUser')
let newuser = JSON.parse(user)

function Reports() {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openBulk, setOpenBulk] = React.useState(false);
  const [userId, setUserId] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [searchSelect, setSearchSelect] = React.useState('');
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackSeverity, setSnackSeverity] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [soderId, setSoderId] = React.useState('');
  const [scusName, setScusName] = React.useState('');
  const [scusPhn, setScusPhn] = React.useState('');
  const [ssupplier, setSsupplier] = React.useState('');
  const [prName, setPrName] = React.useState('');
  const [catName, setCatName] = React.useState('');
  const [strackingNo, setStrackingNo] = React.useState('');
  const [sorderStatus, setSorderStatus] = React.useState('');
  const [managers, setManagers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCat, setProductsByCat] = useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalPassengers: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [state, setState] = React.useState({
    opens: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, opens } = state;
  const [openConformDelete, setOpenConformDelete] = React.useState(false);
  const theme = useTheme();
  const [recordId, setRecordId] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const  ZebraBrowserPrintWrapper = require('zebra-browser-print-wrapper');
  const [openBackDrop, setOpenBackDrop] = React.useState(false);

  const [expenseName, setExpenseName] = React.useState('');
  const [incomeName, setIncomeName] = React.useState('');
  const [selectDataEx, setSelectDataEx] = useState([]);
  const [selectDataInc, setSelectDataInc] = useState([]);

  const [downloadingCSVOrders, setDownloadingCSVOrders] = React.useState([
    ["id", "cusName", "cusPhone", "productDetails",
     "parcelType", "paymentMethod", "shippingMethod", "shippingAddress", "district",
     "status", "finalStatus", "hub", "supplierName", "subTotal", "deliveryCharge", 
     "total", "trackingNumber", "createdAt"],
  ]);
  const [downloadingCSVEx, setDownloadingCSVEx] = React.useState([
    ["id", "name", "description", "amount", "date"],
  ]);
  const [downloadingCSVInc, setDownloadingCSVInc] = React.useState([
    ["id", "name", "description", "amount", "date"],
  ]);

  useEffect(() => {
    setOpenBackDrop(true)
    let day = 60 * 60 * 24 * 1000;
    var sDate = startDate && new Date(startDate?.getTime());
    var eDate = endDate && new Date(endDate?.getTime() + day);
    SDK.OrderType.multipleSearchReport({
      "id" : soderId, 
      "customerName" : scusName,
      "customerPhone" : scusPhn,
      "supplier" : ssupplier,
      "status" : sorderStatus,
      "trackingNo" : strackingNo,
      "productId" : prName,
      "categoryId" : catName,
      "createdAt" : sDate ? moment(new Date(sDate)).format('YYYY-MM-DD') : moment(new Date('2000-01-01')).format('YYYY-MM-DD'),
      "endDate" : eDate ? moment(new Date(eDate)).format('YYYY-MM-DD') : moment(new Date() + day).format('YYYY-MM-DD') ,
    })
    .then(async (res) => {
      console.log("RES: ", res);
      let csvData = [
        ["id", "cusName", "cusPhone", "productDetails",
        "parcelType", "paymentMethod", "shippingMethod", "shippingAddress", "district",
        "status", "finalStatus", "hub", "supplierName", "subTotal", "deliveryCharge", 
        "total", "trackingNumber", "createdAt"],
      ]
      if(res.data.length >=  csvData.length){
        await res?.data?.map((ex) => {
          console.log(ex)
          return csvData.push([`${ex.id}`, `${ex.cusName}`, `${ex.cusPhone}`, `${ex.productDetails}`,
           `${ex.parcelType}`, `${ex.paymentMethod}`, `${ex.shippingMethod}`, `${ex.shippingAddress}`, 
           `${ex.district}`, `${ex.status}`, `${ex.finalStatus}`, `${ex.hub}`, `${ex.supplierName}`,
            `${ex.subTotal}`, `${ex.deliveryCharge}`, `${ex.total}`, `${ex.trackingNumber}`, `${ex.createdAt}`],)
           
         })
        setDownloadingCSVOrders(csvData)
      }
      SDK.ExpenseType.getAll()
    .then(async (res) => {
      setOpenBackDrop(false);
      let csvData = [
        ["id", "name", "description", "amount", "date"],
      ]
      if(res.data.length >=  csvData.length){
        await res?.data.map((ex) => {
          console.log(ex)
          return csvData.push([`${ex.id}`, `${ex.name}`, `${ex.description}`, `${ex.amount}.00`, `${moment(ex.createdAt).format('YYYY-DD-MM')  || "-"}`])
         })
        setDownloadingCSVEx(csvData)
      }
    })
      setOpenBackDrop(false)
    })
    .catch((error) => {
      console.log("Error: ", error);
      setOpenBackDrop(false)
      setSnackSeverity('error');
      setMessage('Error in Search Orders!');
      setOpenSnack(true);
    })

    SDK.IncomesType.getAll()
    .then(async (res) => {
      console.log("RES: ", res);
      let csvData = [
        ["id", "name", "description", "amount", "date"],
      ]
      if(res.data.length >=  csvData.length){
        await res?.data.map((ex) => {
          console.log(ex)
          return csvData.push([`${ex.id}`, `${ex.name}`, `${ex.description}`, `${ex.amount}.00`, `${moment(ex.createdAt).format('YYYY-DD-MM')  || "-"}`])
         })
        setDownloadingCSVInc(csvData)
      }
    })
    .catch((error) => {
      console.log("Error: ", error)
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    })
   
    SDK.UserType.findAllManagers()
    .then((res) => {
      console.log("RES: ", res);
      setManagers(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })

    SDK.CategoryType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setCategories(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })

    SDK.IncomeStreamType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setSelectDataInc(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
    setTimeout(function(){
      setOpenBackDrop(false);
    }, 1000);

    SDK.ExpenseStreamType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setSelectDataEx(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

  useEffect(() => {
    console.log(catName)
    catName && SDK.ProductType.getAllByCategoryId(catName)
    .then((res) => {
      console.log("RES: ", res);
      setProductsByCat(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [catName])

  const handleScusName = (event) => {
    console.log(event.target.value)
    setScusName(event.target.value);
  };
  const handleScusPhn = (event) => {
    console.log(event.target.value)
    setScusPhn(event.target.value);
  };
  const handleSupplier = (event) => {
    console.log(event.target.value)
    setSsupplier(event.target.value);
  };
  const handleCategory = (event) => {
    console.log(event.target.value)
    setCatName(event.target.value);
  };
  const handlePr = (event) => {
    console.log(event.target.value)
    setPrName(event.target.value);
  };
  const handleSorderStatus = (event) => {
    console.log(event.target.value)
    setSorderStatus(event.target.value);
  };
  const handleStrackingNo = (event) => {
    console.log(event.target.value)
    setStrackingNo(event.target.value);
  };
  const handleSoderId = (event) => {
    console.log(event.target.value) 
    setSoderId(event.target.value);
  };
    
  
  const handleClickSearchBtnOrders = () => {

    var day = 60 * 60 * 24 * 1000;
    var sDate = startDate && new Date(startDate?.getTime());
    var eDate = endDate && new Date(endDate?.getTime() + day);

    SDK.OrderType.multipleSearchReport({
      "id" : soderId, 
      "customerName" : scusName,
      "customerPhone" : scusPhn,
      "supplier" : ssupplier,
      "status" : sorderStatus,
      "trackingNo" : strackingNo,
      "productId" : prName,
      "categoryId" : catName,
      "createdAt" : sDate ? moment(new Date(sDate)).format('YYYY-MM-DD') : moment(new Date('2000-01-01')).format('YYYY-MM-DD'),
      "endDate" : eDate ? moment(new Date(eDate)).format('YYYY-MM-DD') : moment(new Date() + day).format('YYYY-MM-DD') ,
    })
    .then(async (res) => {
      console.log("RES: ", res);
      setOrderData(res?.data);
      let csvData = [
        ["id", "cusName", "cusPhone", "productDetails",
        "parcelType", "paymentMethod", "shippingMethod", "shippingAddress", "district",
        "status", "finalStatus", "hub", "supplierName", "subTotal", "deliveryCharge", 
        "total", "trackingNumber", "createdAt"],
      ]
      console.log(res?.data?.length ,  csvData.length)
      if(res.data.length >=  csvData.length){
        await res?.data?.map((ex) => {
          let prString = '';
          ex.productData.map(prd => {
            prString = prString + `${prd.pName}-${prd.ocount}, `
          })
          console.log(prString)
          return csvData.push([`${ex.id}`, `${ex.cusName}`, `${ex.cusPhone}`, `${prString}`,
           `${ex.parcelType}`, `${ex.paymentMethod}`, `${ex.shippingMethod}`, `${ex.shippingAddress}`, 
           `${ex.district}`, `${ex.status}`, `${ex.finalStatus}`, `${ex.hub}`, `${ex.supplierName}`,
            `${ex.subTotal}`, `${ex.deliveryCharge}`, `${ex.total}`, `${ex.trackingNumber}`,
             `${moment(ex.createdAt).format('YYYY-DD-MM')  || "-"}`],)
           
         })
        setDownloadingCSVOrders(csvData)
      }
      setOpenBackDrop(false)
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error in Search Orders!');
      setOpenSnack(true);
      setOpenBackDrop(false)
    })
  }

  const handleClickSearchBtnEx = () => {
    SDK.ExpenseType.multipleSearch({
      "name" : expenseName, 
      "startDate" : startDate ? moment(startDate).format('YYYY-MM-DD'): startDate,
      "endDate" :  endDate ? moment(endDate).format('YYYY-MM-DD') : endDate
    })
    .then(async (res) => {
      setOpenBackDrop(false)
      console.log("RES: ", res);
      let csvData = [
        ["id", "name", "description", "amount", "date"],
      ]
      if(res.data.length >=  csvData.length){
        await res?.data.map((ex) => {
          console.log(ex)
          return csvData.push([`${ex.id}`, `${ex.name}`, `${ex.description}`, `${ex.amount}.00`, `${moment(ex.createdAt).format('YYYY-DD-MM')  || "-"}`])
         })
        setDownloadingCSVEx(csvData)
        }
    })
    .catch((error) => {
      setOpenBackDrop(false)
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error in Search Orders!');
      setOpenSnack(true);
    })
  }

  const handleClickSearchBtnInc = () => {
    SDK.IncomesType.multipleSearch({
      "name" : incomeName, 
      "startDate" : startDate ? moment(startDate).format('YYYY-MM-DD'): startDate,
      "endDate" :  endDate ? moment(endDate).format('YYYY-MM-DD') : endDate
    })
    .then(async (res) => {
      setOpenBackDrop(false)
      console.log("RES: ", res);
      let csvData = [
        ["id", "name", "description", "amount", "date"],
      ]
      if(res.data.length >=  csvData.length){
        await res?.data.map((ex) => {
          console.log(ex)
          return csvData.push([`${ex.id}`, `${ex.incomeStream}`, `${ex.description}`, `${ex.amount}.00`, `${moment(ex.createdAt).format('YYYY-DD-MM')  || "-"}`])
         })
        setDownloadingCSVInc(csvData)
        }
    })
    .catch((error) => {
      setOpenBackDrop(false)
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error in Search Orders!');
      setOpenSnack(true);
    })
  }

  const handleClickView = (id) => {
    console.log(id);
    id && setUserId(id)
    id && setOpenView(true);
  }

  const handleClickUpdate = (id) => {
    console.log("setUserId", id);
    id && setUserId(id)
    id && setOpenUpdate(true);
  }

  const handleClickDelete = (id) => {
    setOpenConformDelete(true);
    setRecordId(id);
  }

  const handleExpenseNamed = (event) => {
    console.log(event.target.value) 
    setExpenseName(event.target.value);
  };

  const handleIncomeNamed = (event) => {
    console.log(event.target.value) 
    setIncomeName(event.target.value);
  };

  const columns = [
      { Header: "id", accessor: "id", width: "5%", align: "left" },
      { Header: "order Date", accessor: "CreatedAt", width: "10%", align: "left" },
      { Header: "customer Name", accessor: "customerName",  align: "left" },
      { Header: "customer Phone", accessor: "customerPhone",  align: "left" },
      { Header: "trackingNumber ", accessor: "trackingNumber", align: "center" },
      { Header: "total", accessor: "total", align: "center" },
      // { Header: "paid", accessor: "paid", align: "center" },
      { Header: "Supplier", accessor: "supplierName", align: "center" },
      { Header: "Order status", accessor: "status", align: "center" },
      { Header: "Final Status", accessor: "finalStatus", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ]

    const rows = orderData  ?.map((user) =>  ({
        id: ( <MDTypography  component="span" variant="caption" color="text" fontWeight="medium" cursor='null'>
          {user.id || "-"}
        </MDTypography>),
        CreatedAt: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
          {moment(user.createdAt).format('DD-MM-YYYY')  || "-"}
        </MDTypography>),
        customerName: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
          {user.ccfullName  || user.cusName  || "-"}
        </MDTypography>),
        customerPhone: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
        {user.cphone  || user.cusPhone  || "-"}
      </MDTypography>),
        trackingNumber: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
            {user.trackingNumber  || "-"}
        </MDTypography>),
        total: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
          {user?.total?.toFixed(2)  || "-"}
        </MDTypography>),
        // paid: (
        //   <MDBox ml={-1}>
        //     <MDBadge badgeContent={`${user.paid}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
        //   </MDBox>
        // ),
        supplierName: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
        {user.supplierName  || "-"}
      </MDTypography>),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.status}` || false} color={user.status == 'Pending' ? "warning" : user.status == 'Delivered' ? "success" : 'danger'} variant="gradient" size="sm" />
          </MDBox>
        ),
        finalStatus: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.finalStatus != null ? user.finalStatus : 'None'}` || false} color={user.finalStatus !== null ? "success" : "warning"} variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <Box >
          <Stack direction="row" spacing={1}>
            <Button onClick={() => handleClickView(user.id)}> View </Button>   
            {newuser?.role != 'Marketing Manager' && <Button onClick={() => handleClickUpdate(user.id)}> Update </Button>}        
            {newuser?.role != 'Marketing Manager' && <Button onClick={() => handleClickDelete(user.id)}> Delete</Button>}
        {/*<Button disabled={!user?.barcode} onClick={() => handleClickBarcodeInit(user)}> Print Barcode</Button>*/}
          </Stack>
        </Box>
        )
    }))

    const handleClickClear = () => {
      setOpenBackDrop(true);
      setStartDate('')
      setEndDate('')
      setSoderId('')
      setPrName('')
      setCatName('')
      setScusName('')
      setScusPhn('')
      setSsupplier('')
      setSorderStatus('')
      setStrackingNo('')

      let day = 60 * 60 * 24 * 1000;
      var sDate = startDate && new Date(startDate?.getTime());
      var eDate = endDate && new Date(endDate?.getTime() + day);

      SDK.OrderType.multipleSearchReport({
        "id" : soderId, 
        "customerName" : scusName,
        "customerPhone" : scusPhn,
        "supplier" : ssupplier,
        "status" : sorderStatus,
        "trackingNo" : strackingNo,
        "productId" : prName,
        "categoryId" : catName,
        "createdAt" : sDate ? moment(new Date(sDate)).format('YYYY-MM-DD') : moment(new Date('2000-01-01')).format('YYYY-MM-DD'),
        "endDate" : eDate ? moment(new Date(eDate)).format('YYYY-MM-DD') : moment(new Date() + day).format('YYYY-MM-DD') ,
      })
      .then((res) => {
        console.log("RES: ", res);
        setOrderData(res?.data?.rows);
        setTotalCount(res?.data?.count);
        setOpenBackDrop(false)
      })
      .catch((error) => {
        console.log("Error: ", error);
        setSnackSeverity('error');
        setMessage('Error in Search Orders!');
        setOpenSnack(true);
        setOpenBackDrop(false)
      })
    }
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {newuser?.role != 'Marketing Manager' && <Box>
      <h2 style={{margin : '15px'}}>Order Details Report</h2>
      <Item>
       <Grid container spacing={2}>
        <Grid item xs={3}>
          <InputLabel id="demo-simple-select-label" 
          style={{display: "flex", alignItems: "right", justifyContent: "start"}}
          sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Customer Name</InputLabel>
          <TextField
            value={scusName}
            onChange={handleScusName}
            margin="normal"
            required
            sx={{ paddingLeft: 2, paddingRight: 2}}
            fullWidth
            name="total"
            id="total"
          />
        </Grid>
        <Grid item xs={3}>
           <InputLabel id="demo-simple-select-label" 
          style={{display: "flex", alignItems: "right", justifyContent: "start"}}
          sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Customer Phone</InputLabel>
          <TextField
            value={scusPhn}
            onChange={handleScusPhn}
            margin="normal"
            required
            sx={{ paddingLeft: 2, paddingRight: 2}}
            fullWidth
            name="total"
            type='number'
            id="total"
          />
        </Grid>
       <Grid item xs={3}>
        <InputLabel id="demo-simple-select-label" 
          style={{display: "flex", alignItems: "right", justifyContent: "start"}}
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Supplier</InputLabel>
        <Select
          labelId="status"
          id="status" 
          value={ssupplier}
          label="status"
          fullWidth
          disabled={newuser?.role == 'Marketing Manager'}
          name="status"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleSupplier}
        >
        {managers?.map((obj) => (
          <MenuItem
            key={obj.id}
            value={obj.userName}
            extra={obj.userName}
          >
            
            {obj.userName}
          </MenuItem>
        ))}
        </Select>
        </Grid>
        <Grid item xs={3}>
          <InputLabel id="demo-simple-select-label" 
          style={{display: "flex", alignItems: "right", justifyContent: "start"}}
          sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Order Start Date</InputLabel>
          <Grid item xs={4} classname="customdatepickerwidth" >
              <div className="datepicker-container">
              <div className="dates-container">
                <div className="date-item"></div>
              </div>
              <div className="react-datepicker-wrapper">
                <DatePicker className='react-datepicker3' onChange={(date) => setStartDate(date)} selected={startDate}  dateformat="dd/mm/yyyy" />
              </div>
            </div>
            </Grid>
        </Grid>

        <Grid item xs={3}>
           <InputLabel id="demo-simple-select-label" 
          style={{display: "flex", alignItems: "right", justifyContent: "start"}}
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Order Status</InputLabel>
          {/*<TextField
            value={sorderStatus}
            onChange={handleSorderStatus}
            margin="normal"
            required
            sx={{ paddingLeft: 2, paddingRight: 2}}
            fullWidth
            name="total"
            id="total"
        />*/}
          <Select
          labelId="status"
          id="status" 
          value={sorderStatus}
          label="status"
          fullWidth
          name="status"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleSorderStatus}
        >
          <MenuItem value={""}></MenuItem>
          <MenuItem value={"Dispatched"}>Dispatched</MenuItem>
          <MenuItem value={"Pending"}>Pending</MenuItem>
          <MenuItem value={"Delivered"}>Delivered</MenuItem>
          <MenuItem value={"ExChanged"}>ExChanged</MenuItem>
          <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
          <MenuItem value={"Returned"}>Returned</MenuItem>
        </Select>
        </Grid>
        <Grid item xs={3}>
           <InputLabel id="demo-simple-select-label" 
          style={{display: "flex", alignItems: "right", justifyContent: "start"}}
          sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Tracking Number</InputLabel>
          <TextField
            value={strackingNo}
            onChange={handleStrackingNo}
            margin="normal"
            required
            sx={{ paddingLeft: 2, paddingRight: 2}}
            fullWidth
            name="total"
            id="total"
          />
        </Grid>
        <Grid item xs={3}>
           <InputLabel id="demo-simple-select-label" 
          style={{display: "flex", alignItems: "right", justifyContent: "start"}}
          sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Order Id</InputLabel>
          <TextField
            value={soderId}
            onChange={handleSoderId}
            margin="normal"
            required
            sx={{ paddingLeft: 2, paddingRight: 2}}
            fullWidth
            name="id"
            id="id"
          />
        </Grid>
        <Grid item xs={3}>
        <InputLabel id="demo-simple-select-label" 
        style={{display: "flex", alignItems: "right", justifyContent: "start"}}
        sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Order End Date</InputLabel>
        <Grid item xs={4} classname="customdatepickerwidth" >
            <div className="datepicker-container">
            <div className="dates-container">
              <div className="date-item"></div>
            </div>
            <div className="react-datepicker-wrapper">
              <DatePicker className='react-datepicker3' onChange={(date) => setEndDate(date)} selected={endDate}  dateformat="dd/mm/yyyy" />
            </div>
          </div>
          </Grid>
        </Grid>

        <Grid item xs={3}>
        <InputLabel id="demo-simple-select-label" 
          style={{display: "flex", alignItems: "right", justifyContent: "start"}}
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Category</InputLabel>
        <Select
          labelId="status"
          id="status" 
          value={catName}
          label="status"
          fullWidth
          disabled={newuser?.role == 'Marketing Manager'}
          name="status"
          sx={{ minWidth: 120,  minHeight: 40 }}
          onChange={handleCategory}
        >
        {categories?.map((obj) => (
          <MenuItem
            key={obj.id}
            value={obj.id}
          >
            
            {obj.title}
          </MenuItem>
        ))}
        </Select>
        </Grid>
        <Grid item xs={3}>
        <InputLabel id="demo-simple-select-label" 
          style={{display: "flex", alignItems: "right", justifyContent: "start"}}
          sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Product</InputLabel>
        <Select
          labelId="status"
          id="status" 
          value={prName}
          label="status"
          fullWidth
          name="status"
          disabled={productsByCat.length < 1}
          sx={{ minWidth: 120,  minHeight: 40, marginLeft: 2, }}
          onChange={handlePr}
        >
        {productsByCat?.map((obj) => (
          <MenuItem
            key={obj.id}
            value={obj.id}
          >
            
            {obj.productName}
          </MenuItem>
        ))}
        </Select>
        </Grid>
      </Grid>

      <div style={{display: "flex", alignItems: "right", justifyContent: "end", mr: '5'}} >
          <FormControl sx={{ m: 1 }} variant="standard">
           <div style={{  marginLeft: '3px', fontStyle : 'italic', fontWeight : 'bold' }}>
              <MDButton sx={{ px: 6, py: 2.5, mr: 1 }} variant="" color="" onClick={handleClickClear}>
                Clear
              </MDButton>
            <MDButton sx={{ px: 5, py: 2, mr: 1 }} variant="gradient" color="warning" onClick={handleClickSearchBtnOrders}>
              &nbsp;Search Orders
            </MDButton>
            {console.log(downloadingCSVOrders.length)}
            <MDButton sx={{ px: 5, py: 2, mr: 1 }} disabled={downloadingCSVOrders.length < 2}  px={2} py={2} variant="gradient" color="dark">
              <Icon sx={{ fontWeight: "bold" }}>download</Icon>
              <CSVLink filename={`Orders-report-${moment(new Date()).format('YYYY-DD-MM')}.csv`}  
              data={downloadingCSVOrders} >&nbsp;Download Report</CSVLink>
            </MDButton>
            </div>
        </FormControl>
      </div>
      </Item>
    </Box>}
      
      {/*<MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Orders
                </MDTypography>
                
                <MDBox px={2} display="flex" justifyContent="end" alignItems="center">
                <MDTypography variant="h6" fontWeight="medium"></MDTypography>
                <MDButton disabled={newuser?.role == 'Marketing Manager'} sx={{ marginRight: '5px' }} variant="gradient" color="dark" onClick={handleClickOpen}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Add Single Order
                </MDButton>
                <MDButton disabled variant="gradient" color="dark" onClick={handleClickOpenBulk}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;Add Bulk Order
              </MDButton>
                </MDBox>
                </MDBox>
              <MDBox pt={3}>
               { <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={false}
                  showTotalEntries={true}
                  noEndBorder
               />}
               
                <Pagination
                  totalRows={totalCount}
                  pageChangeHandler={setCurrentPage}
                  rowsPerPage={pageSize}
                />
                
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>
          {message}
        </Alert>
               </Snackbar>*/}


      <Box>
      <h2 style={{margin : '15px'}}>Expenses Report</h2>
        <Item>
        <Grid container spacing={2}>
        <Grid item xs={4}>
          <InputLabel id="demo-simple-select-label" 
          style={{display: "flex", alignItems: "right", justifyContent: "start"}}
          sx={{ paddingTop: 2, paddingLeft: 8, paddingBottom: 2, fontWeight: 'bold', fontSize: '15px', }}>Name</InputLabel>
          <Select
              labelId="incomeName"
              id="incomeName"
              value={expenseName}
              label="incomeName"
              name="incomeName"
              sx={{ minWidth: 400,  minHeight: 40 }}
              onChange={handleExpenseNamed}
            >
            {selectDataEx.map((income) => (
              <MenuItem value={income.id}>{income.name}</MenuItem>
            ))}
            </Select>
        </Grid>
          <Grid item xs={4} classname="customdatepickerwidth" >
            <InputLabel id="demo-simple-select-label" 
            style={{justifyContent: "start"}}
            sx={{ paddingTop: 2, paddingBottom: 2, fontWeight: 'bold', fontSize: '15px', }}>Start Date</InputLabel>
            <div  sx={{ width : '100'}}>
            <DatePicker  className='react-datepicker' onChange={(date) => setStartDate(date)} selected={startDate}  dateformat="dd/mm/yyyy" />
            </div>
          </Grid>
          <Grid item xs={4}>
            <InputLabel id="demo-simple-select-label" 
            style={{alignItems: "right", justifyContent: "start"}}
            sx={{ paddingTop: 2, paddingBottom: 2, fontWeight: 'bold', fontSize: '15px', }}>End Date</InputLabel>
            <DatePicker className='react-datepicker' selected={endDate} onChange={(date) => setEndDate(date)} />
          </Grid>
        </Grid>
        <div style={{display: "flex", alignItems: "right", justifyContent: "end", mr: '5',  mt: '5'}} >
            <FormControl sx={{ m: 1, mt: 5 }} variant="standard">
            <div style={{  marginLeft: '3px', fontStyle : 'italic', fontWeight : 'bold' }}>
              <MDButton sx={{ px: 6, py: 2.5, mr: 1 }} variant="" color="" onClick={handleClickClear}>
                Clear
              </MDButton>
              <MDButton sx={{ px: 5, py: 2, mr: 1 }} variant="gradient" color="warning" onClick={handleClickSearchBtnEx}>
              &nbsp;Search Expenses
            </MDButton>
            <MDButton disabled={downloadingCSVEx.length < 2}  sx={{ px: 5, py: 2, mr: 1 }} px={2} variant="gradient" color="dark">
              <Icon sx={{ fontWeight: "bold" }}>download</Icon>
              <CSVLink filename={`Expenses-report-${moment(new Date()).format('YYYY-DD-MM')}.csv`} disabled={downloadingCSVEx.length < 2}  data={downloadingCSVEx}>&nbsp;Download Report</CSVLink>
            </MDButton>
            </div>
          </FormControl>
        </div>
        </Item>
      </Box>

      <Box>
      <h2 style={{margin : '15px'}}>Income Report</h2>
      <Item>
      <Grid container spacing={2}>
      <Grid item xs={4}>
        <InputLabel id="demo-simple-select-label" 
        style={{display: "flex", alignItems: "right", justifyContent: "start"}}
        sx={{ paddingTop: 2, paddingLeft: 8, paddingBottom: 2, fontWeight: 'bold', fontSize: '15px', }}>Name</InputLabel>
        <Select
            labelId="incomeName"
            id="incomeName"
            value={incomeName}
            label="incomeName"
            name="incomeName"
            sx={{ minWidth: 400,  minHeight: 40 }}
            onChange={handleIncomeNamed}
          >
          {selectDataInc.map((income) => (
            <MenuItem value={income.id}>{income.name}</MenuItem>
          ))}
          </Select>
      </Grid>
        <Grid item xs={4} classname="customdatepickerwidth">
          <InputLabel id="demo-simple-select-label" 
          style={{justifyContent: "start"}}
          sx={{ paddingTop: 2, paddingBottom: 2, fontWeight: 'bold', fontSize: '15px', }}>Start Date</InputLabel>
          <div  sx={{ width : '100'}}>
          <DatePicker  className='react-datepicker' onChange={(date) => setStartDate(date)} selected={startDate}  dateformat="dd/mm/yyyy" />
          </div>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="demo-simple-select-label" 
          style={{alignItems: "right", justifyContent: "start"}}
          sx={{ paddingTop: 2, paddingBottom: 2, fontWeight: 'bold', fontSize: '15px', }}>End Date</InputLabel>
          <DatePicker className='react-datepicker' selected={endDate} onChange={(date) => setEndDate(date)} />
        </Grid>
      </Grid>
      <div style={{display: "flex", alignItems: "right", justifyContent: "end", mr: '5'}} >
          <FormControl sx={{ m: 1, mt: 5  }} variant="standard">
          <div style={{  marginLeft: '3px', fontStyle : 'italic', fontWeight : 'bold' }}>
            <MDButton sx={{ px: 6, py: 2.5, mr: 1 }} variant="" color="" onClick={handleClickClear}>
              Clear
            </MDButton>
            <MDButton sx={{ px: 5, py: 2, mr: 1 }} variant="gradient" color="warning" onClick={handleClickSearchBtnInc}>
              &nbsp;Search Incomes
            </MDButton>
            <MDButton disabled={downloadingCSVInc.length < 2}  sx={{ px: 5, py: 2, mr: 1 }} px={2} variant="gradient" color="dark">
              <Icon sx={{ fontWeight: "bold" }}>download</Icon>
              <CSVLink filename={`Income-report-${moment(new Date()).format('YYYY-DD-MM')}.csv`}  data={downloadingCSVInc}>&nbsp;Download Report</CSVLink>
            </MDButton>
          </div>
        </FormControl>
      </div>
      </Item>
    </Box>


     <Footer />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
        // onClick={handleCloseBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </DashboardLayout>
  );
}

export default Reports;
