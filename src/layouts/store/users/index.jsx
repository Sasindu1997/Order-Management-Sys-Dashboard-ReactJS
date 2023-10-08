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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
  useLocation,
} from "react-router-dom";
// Data
import {SDK} from "../../../api/index";

import { useState, useEffect } from "react";
import FormDialog from "./formTest";
import FormDialogUpdate from "./updateModal";
import FormDialogView from "./viewModal";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TimelineItem from "examples/Timeline/TimelineItem";
import { withRouter } from "react-router-dom";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductStock() {
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackSeverity, setSnackSeverity] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [userId, setUserId] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [recordId, setRecordId] = React.useState(false);
  const [userData, setUserData] = useState([]);
  const [state, setState] = React.useState({
    opens: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, opens } = state;
  const [openConformDelete, setOpenConformDelete] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const [productData, setProductData] = useState();
  const location = useLocation();

  // const params = useParams();
  
  useEffect(() => {
    setOpenBackDrop(true)
    location?.pathname?.split("/")[4] && SDK.StockType.findByProductIdAndType(location?.pathname?.split("/")[4], location?.pathname?.split("/")[3])
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data)
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


    if(location?.pathname?.split("/")[3] == 'prod'){
      location?.pathname?.split("/")[4] && SDK.ProductType.getById(location?.pathname?.split("/")[4])
    .then((res) => {
      console.log("RES: ", res);
      setProductData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
    setTimeout(function(){
      setOpenBackDrop(false);
    }, 1000);
    }else if(location?.pathname?.split("/")[3] == 'chem'){
      location?.pathname?.split("/")[4] && SDK.ChemicalsType.getById(location?.pathname?.split("/")[4])
    .then((res) => {
      console.log("RES: ", res);
      setProductData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
    setTimeout(function(){
      setOpenBackDrop(false);
    }, 1000);
    }else if(location?.pathname?.split("/")[3] == 'raw'){
      location?.pathname?.split("/")[4] && SDK.RawMatsType.getById(location?.pathname?.split("/")[4])
    .then((res) => {
      console.log("RES: ", res);
      setProductData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
    setTimeout(function(){
      setOpenBackDrop(false);
    }, 1000);
    }
  }, [open, openConformDelete, openUpdate])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenConformDelete = () => {
    setOpenConformDelete(true);
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
    recordId && SDK.UserType.deletebyId(recordId)
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
    { Header: "id", accessor: "id", width: "5%", align: "left" },
      { Header: "product Id", accessor: "productId", align: "center" },
      { Header: "quantity", accessor: "quantity", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", width: "8%", align: "center" },
    ]

    const rows = userData?.map((user) =>  ({
        id: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
          {user.id || "-"}
        </MDTypography>),
        role: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
        {user?.role  || "-"}
        </MDTypography>),
        categoryId: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
            {user.categoryId  || "-"}
        </MDTypography>),
        productId: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
          {user.productId  || "-"}
        </MDTypography>),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.isActive}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
          </MDBox>
        ),
        quantity: (
          <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
            {user.quantity  || "-"}
          </MDTypography>
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
      <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Product Stock overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title={productData && productData.productName || productData?.name}
        />
        <MDBox ml={1.25} mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular" fontSize="0.85rem">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            Available stock upto today: &nbsp;
            <MDTypography variant="button" color={productData?.maxStockLevel > 0 ? "success" : "primary"} fontWeight="medium" fontSize="1.25rem">
            {productData && productData?.maxStockLevel}
            </MDTypography>{" "}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
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
                  ProductStock Table
                </MDTypography>
                <MDBox px={2} display="flex" justifyContent="space-between" alignItems="center" onClick={handleClickOpen}>
                  <MDTypography variant="h6" fontWeight="medium"></MDTypography>
                  <MDButton variant="gradient" color="dark" onClick={handleClickOpen}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Add New Stock
                  </MDButton>
              </MDBox>
              {open &&  <FormDialog setOpen={handleCloseOpen} open={open} type={location?.pathname?.split("/")[3]} id={location?.pathname?.split("/")[4]}/>}
              {openUpdate && userId &&  <FormDialogUpdate setOpen={handleCloseOpenUpdate} open={openUpdate} userId={userId}/>}
              {openView && userId &&  <FormDialogView setOpen={handleCloseOpenView} open={openView} userId={userId} type={location?.pathname?.split("/")[3]} id={location?.pathname?.split("/")[4]}/>}
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

export default ProductStock;
