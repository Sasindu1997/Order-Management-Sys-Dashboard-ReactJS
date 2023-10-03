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
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';
import Invoice from './index';
// Data
import {SDK} from "../../api/index";

import { useState, useEffect, useMemo } from "react";
import FormDialog from "./formAdd";
import FormDialogUpdate from "./updateModal";
import FormDialogView from "./viewModal"
import { MaterialReactTable } from 'material-react-table';
import { invalid } from 'moment';
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

const data = [
  {
    id: '3f', //we'll use this as a unique row id
    customerName: 'Dylan',
    customerPhone: 'Murray',
    itemCount: 22,
    trackingNumber: '261 Erdman Ford',
    total: 'East Daphne',
    status: 'Kentucky',
  },
  {
    id: '4f', //we'll use this as a unique row id
    customerName: 'xx',
    customerPhone: 'j',
    itemCount: 33,
    trackingNumber: 't ttt',
    total: 'yyy yyy',
    status: 'hh',
  }
];

function OrdersForInvoice() {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [searchSelect, setSearchSelect] = React.useState('name');
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
  const [rowCount, setRowCount] = React.useState(0);
  const [selected, setSelected] = React.useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [visibleDiv, setVisibleDiv] = useState(false);
  const [invoiceData, setInvoiceData] = useState(false);
  const [testact, setTestact] = useState(false);

  useEffect(() => {
    setOpenBackDrop(true)
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
  }, [open, openConformDelete, openUpdate])

  useEffect(() => {
    setTestact(!testact)
  }, [invoiceData])

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

  const handleClickOpenDownload = async () => {
    setVisibleDiv(false)
    setInvoiceData([])
    var arr = [];
    var arrSelectedID = [];
    var orderDataSelectedArr = [];

    for (var prop in rowSelection) {
      if (rowSelection.hasOwnProperty(prop)) {
          var innerObj = {};
          innerObj[prop] = rowSelection[prop];
          arr.push(innerObj)
      }
    }
    console.log(arr);

    await arr.map(object => {
      let value = Object.keys(object).find((key, value) => object[key] === true)
      return value && arrSelectedID.push(value)
    })    
    console.log(arrSelectedID)

    if(arrSelectedID.length > 0)
    {
      for(let i = 0; i < arrSelectedID.length; i++){
       await SDK.OrderType.getById(arrSelectedID[i])
        .then((res) => {
          console.log("RES: ", res);
          orderDataSelectedArr.push(res.data)
        })
        .catch((error) => {
          console.log("Error: ", error);
          setSnackSeverity('error');
          setMessage('Error!');
          setOpenSnack(true);
        })
      }
      console.log("xxxxxxxxxxxxxxxxxxx", orderDataSelectedArr)
      if(orderDataSelectedArr.length > 0){
        // const perChunk = 4 // items per chunk    

        // const result = orderDataSelectedArr.reduce((resultArray, item, index) => { 
        //   const chunkIndex = Math.floor(index/perChunk)
        //   if(!resultArray[chunkIndex]) {
        //     resultArray[chunkIndex] = [] // start a new chunk
        //   }
        //   resultArray[chunkIndex].push(item)

        //   return resultArray
        // }, [])

        function chunkArray(array, chunkSize) {
          const chunkedArray = [];
          for (let i = 0; i < array.length; i += chunkSize) {
            chunkedArray.push(array.slice(i, i + chunkSize));
          }
          return chunkedArray;
        }
        
        const bigArray = orderDataSelectedArr;
        const maxChunkSize = 4;
        
        const subArrays = chunkArray(bigArray, maxChunkSize);
        console.log(subArrays.length);
        console.log("ffffffffffffffffffff", subArrays)
        
        setInvoiceData(subArrays)
        setVisibleDiv(true)
      }else{
        setInvoiceData(false)
        setVisibleDiv(false)
      }
    }else{
      setInvoiceData(false)
      setVisibleDiv(false)
    }

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
    const res = handleClickBarcode(order)
    console.log("kkkkkkkkkkkk", res)
  }

  const handleClickBarcode = async (order) => {
    const serial = "0123456789";
    console.log(order.barcode);
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
        const browserPrint =  new ZebraBrowserPrintWrapper.default();
        console.log("browserPrint", browserPrint);

        // Select default printer
        const defaultPrinter =  await browserPrint.getDefaultPrinter();
        console.log("defaultPrinter", defaultPrinter);

        // Set the printer
        browserPrint.setPrinter(defaultPrinter);

        // Check printer status
        const printerStatus = await browserPrint.checkPrinterStatus();
        console.log("printerStatus.isReadyToPrint", printerStatus.isReadyToPrint);

        // Check if the printer is ready
        if(printerStatus.isReadyToPrint) {

            // ZPL script to print a simple barcode
            const zpl = `^XA
                        ^BY2,2,100
                        ^FO20,20^BC^FD${order.barcode}^FS
                        ^XZ`;

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

  const onSelectAllClick = () => {

  }

  const handleSelect = (event, id) => {
    console.log("clicked", event.target.checked, id)
    setSelected(...selected, { id: id, check: event.target.checked });
  };

  const columns = [
      { Header: "id", accessor: "id", width: "5%", align: "left" },
      { Header: "customer Name", width: "15%", accessor: "customerName",  align: "left" },
      { Header: "customer Phone", accessor: "customerPhone",  align: "left" },
      { Header: "itemCount", accessor: "itemCount", width: "3%", align: "left" },
      { Header: "trackingNumber ", accessor: "trackingNumber", align: "center" },
      { Header: "total", accessor: "total", align: "center" },
      { Header: "paid", accessor: "paid", align: "center" },
      { Header: "Order status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ]
    
    const columns1 = useMemo(
      () => [
        { header: "id", accessorKey: "id", width: "5%", align: "left"},
        { header: "customer Name", accessorKey: "cfullName"},
        { header: "customer Phone", accessorKey: "cphone"},
        { header: "trackingNumber ", accessorKey: "trackingNumber",},
        { header: "total", accessorKey: "total",},
        { header: "paid", accessorKey: "paid",},
        { header: "Order status", accessorKey: "status"},
        { header: "action", accessorKey: "action"},
      ],
      [], //end
    );
    const rows = orderData?.map((user, i) =>  ({
        id: user.id,
        cfullName: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
          {user.ccfullName  || "-"}
        </MDTypography>),
        cphone: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
        {user.cphone  || "-"}
      </MDTypography>),
        trackingNumber: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
            {user.trackingNumber  || "-"}
        </MDTypography>),
        total: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
          {(user.total).toFixed(2)  || "-"}
        </MDTypography>),
        paid: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.paid}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
          </MDBox>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.status}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
          </MDBox>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.status}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <Box >
          <Stack direction="row" spacing={1}>
            <Button onClick={() => handleClickView(user.id)}> View </Button>           
            <Button onClick={() => handleClickBarcodeInit(user)}> Print Barcode</Button>
          </Stack>
        </Box>
        )
    }))
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{display: "flex", alignItems: "right", justifyContent: "end", mr: '5'}} >
      <FormControl sx={{ m: 1 }} variant="standard">
        <BootstrapInput id="demo-customized-textbox" placeholder='Search Here' onChange={handleChangeSearch}
        handleChangeSearch/>
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
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
                  Orders For Invoices
                </MDTypography>
                <MDBox px={2} display="flex" justifyContent="space-between" alignItems="center" onClick={handleClickOpenDownload}>
                  <MDTypography variant="h6" fontWeight="medium"></MDTypography>
                  <MDButton variant="gradient" color="dark"  disabled={Object.keys(rowSelection).length === 0}>
                    <Icon sx={{ fontWeight: "bold", pr: 3, pb: 2 }}>save</Icon>
                    &nbsp;&nbsp;Download Invoices
                  </MDButton>
              </MDBox>
                <MDBox px={2} display="flex" justifyContent="space-between" alignItems="center" onClick={handleClickOpen}>
                <MDTypography variant="h6" fontWeight="medium"></MDTypography>
                </MDBox>
                {openView && userId &&  <FormDialogView setOpen={handleCloseOpenView} open={openView} userId={userId}/>}
                </MDBox>
              <MDBox pt={3}>
                {/*<DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                />*/}
                {/*<DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />*/}
                <MaterialReactTable
                  columns={columns1}
                  data={rows}
                  getRowId={(row) => row.id}
                  muiTableBodyRowProps={({ row }) => ({
                    //implement row selection click events manually
                    onClick: () =>
                      setRowSelection((prev) => ({
                        ...prev,
                        [row.id]: !prev[row.id],
                      })),
                    selected: rowSelection[row.id],
                    sx: {
                      cursor: 'pointer',
                    },
                  })}
                  state={{ rowSelection }}
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
      {console.log("ynna klin ", invoiceData)}
      {visibleDiv && <Invoice orderDataSelectedArr={invoiceData}/>}
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

export default OrdersForInvoice;
