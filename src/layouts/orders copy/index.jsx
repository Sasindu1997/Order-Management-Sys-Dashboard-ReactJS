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
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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

function ReturnedOrders() {
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };

  useEffect(() => {
    setOpenBackDrop(true)
    value === 0 ? SDK.OrderType.getAllReturned()
    .then((res) => {
      console.log("RES: ", res);
      setOrderData(res?.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    }) : value === 1 ? SDK.OrderType.getAllCancelled()
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
    : value === 2 ? SDK.OrderType.getAllExchanged()
    .then((res) => {
      console.log("RES: ", res);
      setOrderData(res?.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    }) : setOrderData([]);
    setTimeout(function(){
      setOpenBackDrop(false);
    }, 1000);
  }, [open, openConformDelete, openUpdate, value])

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

  const handleChangeSearchSelect = (event) => {
    setSearchSelect(event.target.value);
  };
  
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
    setMessage(msg == 'success' ? 'Record Updated Sucessfully!' : 'Error In Record Update!');
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

  const handleClickBarcode = async (order) => {
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

          // Check if the printer is ready
          if(printerStatus.isReadyToPrint) {

              // ZPL script to print a simple barcode
              const zpl = `^XA
                          ^BY2,2,100
                          ^FO20,20^BC^FD${serial}^FS
                          ^XZ`;

              browserPrint.print(zpl);

          } else {

              console.log("Error/s", printerStatus.errors);
          }
        } catch (error) {
        throw new Error(error);
        }
  }

  const columns = [
      { Header: "id", accessor: "id", width: "10%", align: "left" },
      { Header: "customer Name", accessor: "customerName",  align: "left" },
      { Header: "customer Phone", accessor: "customerPhone",  align: "left" },
      { Header: "trackingNumber ", accessor: "trackingNumber", align: "center" },
      { Header: "total", accessor: "total", align: "center" },
      { Header: "paid", accessor: "paid", align: "center" },
      { Header: "Order status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ]

    const rows = orderData  ?.map((user) =>  ({
        id: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
          {user.id || "-"}
        </MDTypography>),
        customerName: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
          {user.cfullName  || "-"}
        </MDTypography>),
        customerPhone: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
        {user.cphone  || "-"}
      </MDTypography>),
        trackingNumber: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
            {user.trackingNumber  || "-"}
        </MDTypography>),
        total: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
          {user.total  || "-"}
        </MDTypography>),
        paid: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.paid}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
          </MDBox>
        ),
        // isActive: (
        //   <MDBox ml={-1}>
        //     <MDBadge badgeContent={user.isActive ? "ACTIVE" : "INACTIVE"} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
        //   </MDBox>
        // ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.status}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <Box >
          <Stack direction="row" spacing={1}>
            <Button onClick={() => handleClickView(user.id)}> View </Button>           
          </Stack>
        </Box>
        )
    }))
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{display: "flex", alignItems: "right", justifyContent: "end", mr: '5'}} >
      {/*<FormControl sx={{ m: 1 }} variant="standard">
      <NativeSelect
          id="demo-customized-select-native"
          value={searchSelect}
          onChange={handleChangeSearchSelect}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          <option value={'fullName'}>Name</option>
          <option value={'phone'}>Phone</option>
        </NativeSelect>
  </FormControl>
    <FormControl sx={{ m: 1 }} variant="standard">
        <BootstrapInput disabled={!searchSelect} id="demo-customized-textbox" placeholder='Search Here' onChange={handleChangeSearch} />
      </FormControl>*/}
          </div>
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
                  Returned Or Cancelled Orders
                </MDTypography>
                
                <MDBox px={2} display="flex" justifyContent="end" alignItems="center">
                <MDTypography variant="h6" fontWeight="medium"></MDTypography>
                <MDButton sx={{ marginRight: '5px' }} variant="gradient" color="dark" onClick={handleClickOpen}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Update Order
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
              
              <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} 
        textColor="secondary"
        indicatorColor="primary"
        aria-label="basic tabs example">
          <Tab label="Returned" {...a11yProps(0)} />
          <Tab label="Cancelled" {...a11yProps(1)} />
          <Tab label="Exchanged" {...a11yProps(2)} />
              </Tabs>
              </Box>
                <CustomTabPanel value={value} index={0}>
                  <MDBox pt={3}>
                      <DataTable
                        table={{ columns, rows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </MDBox>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                      <MDBox pt={3}>
                      <DataTable
                        table={{ columns, rows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </MDBox>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                      <MDBox pt={3}>
                      <DataTable
                        table={{ columns, rows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </MDBox>
                </CustomTabPanel>
              </Box>
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

export default ReturnedOrders;
