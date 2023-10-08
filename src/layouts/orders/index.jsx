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

function Orders() {
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
  const [strackingNo, setStrackingNo] = React.useState('');
  const [sorderStatus, setSorderStatus] = React.useState('');
  const [managers, setManagers] = useState([]);
  const [startDate, setStartDate] = useState('');

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
  
  useEffect(() => {
    setOpenBackDrop(true)
    console.log(newuser?.id)
    newuser?.role == 'Marketing Manager' ? SDK.OrderType.findAllBySupplier(newuser?.id)
    .then((res) => {
      console.log("RES cccccccccccc: ", res);
      setOrderData(res?.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    }) : 
    SDK.OrderType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setOrderData(res?.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    })
    setTimeout(function(){
      setOpenBackDrop(false);
    }, 1000);

    SDK.UserType.findAllManagers()
    .then((res) => {
      console.log("RES: ", res);
      setManagers(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [open, openConformDelete, openUpdate])

  const handleChangeSearch = (event) => {
    console.log(event.target.value);
    
    setTimeout(function(){
      SDK.OrderType.searchBy(event.target.value, searchSelect)
    .then((res) => {
      console.log("RES: ", res);
      setOrderData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    })
   }, 2000); 
  };

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
  
  const handleClickSearchBtn = () => {

    var day = 60 * 60 * 24 * 1000;
    var sDate = startDate && new Date(startDate?.getTime());
    var eDate = startDate && new Date(startDate?.getTime() + day);


    SDK.OrderType.multipleSearch({
      "id" : soderId, 
      "customerName" : scusName,
      "customerPhone" : scusPhn,
      "supplier" : ssupplier,
      "status" : sorderStatus,
      "trackingNo" : strackingNo,
      "createdAt" : sDate ? moment(new Date(sDate)).format('YYYY-MM-DD') : moment(new Date('2000-01-01')).format('YYYY-MM-DD'),
      "endDate" : eDate ? moment(new Date(eDate)).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'),

    })
    .then((res) => {
      console.log("RES: ", res);
      setOrderData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error in Search Orders!');
      setOpenSnack(true);
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenBulk = () => {
    setOpenBulk(true);
  };

  const handleCloseConformDelete = () => {
    setOpenConformDelete(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const handleCloseOpen = (state, msg) => {
    console.log("here")
    setOpen(state);
    setSnackSeverity(msg == 'success' ? 'success' : 'error');
    setMessage(msg == 'success' ? 'Record Created Sucessfully!' : 'Error In Record Creation!');
    setOpenSnack(true);
    // window.location.reload();
  };

  const handleCloseOpenBulk = (state, msg) => {
    console.log("here")
    setOpenBulk(state);
    setSnackSeverity(msg == 'success' ? 'success' : 'error');
    setMessage(msg == 'success' ? 'Record Created Sucessfully!' : 'Error In Record Creation!');
    setOpenSnack(true);
    // window.location.reload();
  };

  const handleCloseOpenUpdate = (state, msg) => {
    console.log("here 2")
    setOpenUpdate(state);
    setSnackSeverity(msg == 'success' ? 'success' : 'error');
    setMessage(msg == 'success' ? 'Record Updated Sucessfully!' : 'Error In Record Update!');
    setOpenSnack(true);
    // window.location.reload();
  };

  const handleCloseOpenView = (state) => {
    console.log("here 3")
    setOpenView(state);
  };

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
    // id && SDK.UserType.deletebyId(id)
    // .then((res) => {
    //   console.log("RES: ", res);
    //   window.location.reload();
    // })
    // .catch((error) => {
    //   console.log("Error: ", error)
    // })
  }

  const handleConformDelete = () => {
    recordId && SDK.OrderType.deletebyId(recordId)
    .then((res) => {
      console.log("RES: ", res);
      setOpenConformDelete(false);
      setSnackSeverity('success');
      setMessage('Record Deleted Sucessfully!');
      setOpenSnack(true);
    })
    .catch((error) => {
      setOpenConformDelete(false);
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error In Record Deletion!');
      setOpenSnack(true);
    })
  };

    const handleClickBarcodeInit = async (order) => {
    const res = handleClickBarcode(order).then(ress => {
      if(ress == 'success'){
        setSnackSeverity('success');
        setMessage('Barcode Printed Sucessfully!');
        setOpenSnack(true);
      } else {
        setSnackSeverity('error');
        setMessage('Error In Barcode Printing!');
        setOpenSnack(true);
      }
    })
  }

  const handleClickBarcode = async (order) => {
    console.log(order)

    const serial = "0123456789";
        // const receipt = (
        //     <Printer type="" width={2} characterSet="korea">
        //       <Text size={{ width: 1, height: 0.2 }}>9,500원</Text>
        //       <Text bold={true}>결제 완료</Text>
        //       <Cut />
        //     </Printer>
        //   );
        // const data = await render(receipt);
        // console.log("data", data)
        try {

          // Create a new instance of the object
          const browserPrint = new ZebraBrowserPrintWrapper.default(); 

          // Select default printer
          const defaultPrinter =  await browserPrint.getDefaultPrinter();
      
          // Set the printer
          browserPrint.setPrinter(defaultPrinter);

          // Check printer status
          const printerStatus = await browserPrint.checkPrinterStatus();
          console.log(order)
          // Check if the printer is ready
          if(printerStatus.isReadyToPrint) {

              // ZPL script to print a simple barcode
              // const zpl = order.barcode && `^XA
              //             ^BY2,2,100
              //             ^FO20,20^BC^FD${order.barcode}^FS
              //             ^XZ`;

              const zpl = `^XA
              ^MMC
              ^PW650
              ^LL0223
              ^LS0
              ^BY2,2,100
              ^FO20,20^BC^FD${order.barcode}^FS

              ^BY2,2,100
              ^FO20,20^BC^FD${order.barcode}^FS
              ^PQ1,1,1,Y^XZ`

              order.barcode && browserPrint.print(zpl);
              return order.barcode ? 'success': 'error'; 

          } else {
              console.log("Error/s", printerStatus.errors);
              return 'error'; 
          }
        } catch (error) {
            throw new Error(error);
        }
  }

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
          {user.ccfullName  || "-"}
        </MDTypography>),
        customerPhone: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
        {user.cphone  || "-"}
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

      setStartDate('')
      setSoderId('')
      setScusName('')
      setScusPhn('')
      setSsupplier('')
      setSorderStatus('')
      setStrackingNo('')

      SDK.OrderType.getAll()
    .then(async (res) => {
      setOrderData(res?.data);
      setOpenBackDrop(false);
    })
    .catch((error) => {
      setOpenBackDrop(false);
      console.log("Error: ", error)
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    })
    }
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {newuser?.role != 'Marketing Manager' && <Box>
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
          {/*<TextField
            value={ssupplier}
            onChange={handleSupplier}
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
          sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Order Date</InputLabel>
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
          <MenuItem value={""}></MenuItem>
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
      </Grid>
      <div style={{display: "flex", alignItems: "right", justifyContent: "end", mr: '5'}} >
          <FormControl sx={{ m: 1 }} variant="standard">
           <div style={{  marginLeft: '3px', fontStyle : 'italic', fontWeight : 'bold' }}>
              <MDButton sx={{ px: 6, py: 2.5, mr: 1 }} variant="" color="" onClick={handleClickClear}>
                Clear
              </MDButton>
            <MDButton sx={{ px: 6, py: 2.5, mr: 1 }} variant="gradient" color="warning" onClick={handleClickSearchBtn}>
              &nbsp;Search
            </MDButton>
            </div>
        </FormControl>
      </div>
      </Item>
    </Box>}
      
      <MDBox pt={6} pb={3}>
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
                {open &&  <FormDialog setOpen={handleCloseOpen} open={open}/>}
                {openBulk &&  <FormDialog2 setOpen={handleCloseOpenBulk} open={openBulk}/>}
                {openUpdate && userId &&  <FormDialogUpdate setOpen={handleCloseOpenUpdate} open={openUpdate} orderId={userId}/>}
                {openView && userId &&  <FormDialogView setOpen={handleCloseOpenView} open={openView} userId={userId}/>}
                {<Dialog
                fullScreen={fullScreen}
                open={openConformDelete}
                onClose={handleCloseConformDelete}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    This action will delete this record permanantly from the list.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleCloseConformDelete}>
                    Cancel
                  </Button>
                  <Button onClick={handleConformDelete} autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>}  
                </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
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
      </Snackbar>
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

export default Orders;
