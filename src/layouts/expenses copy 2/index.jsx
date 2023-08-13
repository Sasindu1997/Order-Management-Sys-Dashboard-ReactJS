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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
import moment from 'moment';

// Data
import {SDK} from "../../api/index";

import { useState, useEffect } from "react";
import FormDialog from "./formTest";
import FormDialogUpdate from "./updateModal";
import FormDialogView from "./viewModal"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CSVLink, CSVDownload } from "react-csv";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let csvData = [
  ["id", "name", "description", "amount", "date"],
];

function UtilityExpenses() {
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [userData, setUserData] = useState([]);
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

  useEffect(() => {
    SDK.UtilityExpensesType.getAll()
    .then(async (res) => {
      setUserData(res?.data);
      if(res.data.length >  csvData.length - 1){
        await res?.data.map((ex) => {
          return csvData.push([`${ex.id}`, `${ex.name}`, `${ex.description}`, `${ex.amount}.00`, `${moment(ex.createdAt).format('DD-MM-YYYY')  || "-"}`])
        })
      }
      console.log("csvData: ", csvData);
    })
    .catch((error) => {
      console.log("Error: ", error)
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    })
  }, [open, openConformDelete, openUpdate])

  const handleClickOpen = () => {
    setOpen(true);
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
    console.log(id);
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
    recordId && SDK.UtilityExpensesType.deletebyId(recordId)
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


  const columns = [
    { Header: "id", accessor: "id", width: "15%", align: "left" },
      { Header: "name", accessor: "name",  align: "left" },
      { Header: "description", accessor: "description", align: "left" },
      { Header: "amount", accessor: "amount", align: "left" },
      { Header: "date", accessor: "date", align: "left" },
      { Header: "action", accessor: "action", width: "8%", align: "center" },
    ]

    const rows = userData?.map((user) =>  ({
        id: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.id || "-"}
        </MDTypography>),
        name: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.name  || "-"}
        </MDTypography>),
        description: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {user.description  || "-"}
        </MDTypography>),
        amount: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {user.amount  || "-"}
        </MDTypography>),
        date: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {moment(user.createdAt).format('DD-MM-YYYY')  || "-"}
        </MDTypography>),
        action: (
          <Box >
          <Stack direction="row" spacing={1}>
                    
            <Button onClick={() => handleClickUpdate(user.id)}> Update </Button>
            <Button onClick={() => handleClickDelete(user.id)}> Delete</Button>
          </Stack>
        </Box>
        )
    }))
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                <row>
                <MDTypography variant="h6" color="white">
                  Utility Expenses Table
                </MDTypography>
                <MDBox px={2} display="flex" justifyContent="end" alignItems="center" >
                  <MDTypography variant="h6" fontWeight="medium"></MDTypography>
                  <MDButton variant="gradient" color="dark" onClick={handleClickOpen}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Add NewUtility Expense
                  </MDButton>
                  <MDButton sx={{ marginLeft: "5px" }} px={2} variant="gradient" color="dark">
                    <Icon sx={{ fontWeight: "bold" }}>download</Icon>
                    <CSVLink data={csvData}>&nbsp;Download Report</CSVLink>
                  </MDButton>
              </MDBox>
               {open &&  <FormDialog setOpen={handleCloseOpen} open={open}/>}
               {openUpdate && userId &&  <FormDialogUpdate setOpen={handleCloseOpenUpdate} open={openUpdate} userId={userId}/>}
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
              </row>
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
    </DashboardLayout>
  );
}

export default UtilityExpenses;
