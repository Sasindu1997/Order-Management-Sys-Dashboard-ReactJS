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

import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import Barcode from 'react-barcode';

// Data
import {SDK} from "../../../api/index";

import { useState, useEffect } from "react";
import FormDialog from "./formAdd";
import FormDialogUpdate from "./updateModal";
import FormDialogView from "./viewModal"
// import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';

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

function Orders() {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [searchSelect, setSearchSelect] = React.useState('name');
  const  ZebraBrowserPrintWrapper = require('zebra-browser-print-wrapper');
  
  useEffect(() => {
    SDK.OrderType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setOrderData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

  const handleChangeSearch = (event) => {
    console.log(event.target.value);
    
    setTimeout(function(){
      SDK.OrderType.searchBy(event.target.value, searchSelect)
    .then((res) => {
      console.log("RES: ", res);
      setOrderData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
   }, 2000); 
  };

  const handleChangeSearchSelect = (event) => {
    setSearchSelect(event.target.value);
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseOpen = (state) => {
    console.log("here")
    setOpen(state);
    window.location.reload();
  };

  const handleCloseOpenUpdate = (state) => {
    console.log("here 2")
    setOpenUpdate(state);
    window.location.reload();
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
    console.log(id);
    id && setUserId(id)
    id && setOpenUpdate(true);
  }

  const handleClickDelete = (id) => {
    id && SDK.OrderType.deletebyId(id)
    .then((res) => {
      console.log("RES: ", res);
      window.location.reload();
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
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
      { Header: "itemCount", accessor: "itemCount", align: "left" },
      { Header: "trackingNumber ", accessor: "trackingNumber", align: "center" },
      { Header: "total", accessor: "total", align: "center" },
      { Header: "paid", accessor: "paid", align: "center" },
      { Header: "status", accessor: "isActive", align: "center" },
      { Header: "Order status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ]

    const rows = orderData  ?.map((user) =>  ({
        id: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.id || "-"}
        </MDTypography>),
        customerName: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.cfullName  || "-"}
        </MDTypography>),
        customerPhone: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {user.cphone  || "-"}
      </MDTypography>),
        itemCount: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {user.itemCount  || "-"}
        </MDTypography>),
        trackingNumber: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {user.trackingNumber  || "-"}
        </MDTypography>),
        total: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.total  || "-"}
        </MDTypography>),
        paid: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.paid}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
          </MDBox>
        ),
        isActive: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={user.isActive ? "ACTIVE" : "INACTIVE"} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
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
            <Button onClick={() => handleClickUpdate(user.id)}> Update </Button>
            <Button onClick={() => handleClickDelete(user.id)}> Delete</Button>
            <Button onClick={() => handleClickBarcode(user)}> Print Barcode</Button>
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
                  Orders
                </MDTypography>
                
                <MDBox px={2} display="flex" justifyContent="space-between" alignItems="center" onClick={handleClickOpen}>
                <MDTypography variant="h6" fontWeight="medium"></MDTypography>
                <MDButton variant="gradient" color="dark" onClick={handleClickOpen}>
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;Add New Order
                </MDButton>
                </MDBox>
                {open &&  <FormDialog setOpen={handleCloseOpen} open={open}/>}
                {openUpdate && userId &&  <FormDialogUpdate setOpen={handleCloseOpenUpdate} open={openUpdate} userId={userId}/>}
                {openView && userId &&  <FormDialogView setOpen={handleCloseOpenView} open={openView} userId={userId}/>}
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
      <Footer />
    </DashboardLayout>
  );
}

export default Orders;
