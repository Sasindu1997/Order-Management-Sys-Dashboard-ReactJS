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
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useNavigate } from "react-router-dom";
import {SDK} from "../../api/index";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function ScanPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [UserData, setUserData] = useState(false);
  const [userName, setUserName] = useState(false);
  const [password, setPassword] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState(false);
  const [message, setMessage] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();
  const [state, setState] = useState({
    opens: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, opens } = state;
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const [progress, setProgress] = React.useState(0)

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const onClickOkay = () => {
    setUserName(false)
  }

  const handleScanNow = () => {
    userName ? setOpenBackDrop(true) : setOpenBackDrop(false)
    console.log("value : ", userName);
    setTimeout(function(){
      userName && SDK.OrderType.getByBarcode(userName)
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data);
      setOpenBackDrop(false);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setUserData(false);
      setSnackSeverity('error');
      setMessage(`Error In getting Order with barcode ${userName}!`);
      setOpenSnack(true);
      setOpenBackDrop(false);
    })
    }, 1000);
  }

  const onchangeInput = (value) => {
    value.target.value ? setOpenBackDrop(true) : setOpenBackDrop(false)
    console.log("value : ", value.target.value);
    value.target.value ? setUserName(value.target.value) : setUserName(false);
    setTimeout(function(){
      value.target.value && SDK.OrderType.getByBarcode(value.target.value)
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data);
      setOpenBackDrop(false);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setUserData(false);
      setSnackSeverity('error');
      setMessage(`Error In getting Order with barcode ${value.target.value}!`);
      setOpenSnack(true);
      setOpenBackDrop(false);
    })
    }, 1000);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6} >
            <Grid item xs={4}>
              <Card>
                <MDBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    Scan Barcode
                  </MDTypography>
                  <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  </Grid>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox  role="form">
                    <MDBox mb={2}>
                    <TextField
                        margin="normal"
                        autoFocus
                        required
                        name="Input"
                        type="Input"
                        id="Input"
                        autoComplete="Input"
                        label="Input" fullWidth onChange={(e) => onchangeInput(e)}
                      />
                    </MDBox>
                    <MDBox mt={4} mb={1} >
                      <MDButton variant="gradient" color="info" fullWidth onClick={handleScanNow}>
                        Scan Now
                      </MDButton>
                    </MDBox>
                    {/*<MDBox mt={3} mb={1} textAlign="center">
                      <MDTypography variant="button" color="text">
                        Don&apos;t have an account?{" "}
                        <MDTypography
                          component={Link}
                          to="/authentication/sign-up"
                          variant="button"
                          color="info"
                          fontWeight="medium"
                          textGradient
                        >
                          Sign up
                        </MDTypography>
                      </MDTypography>
                    </MDBox>*/}
                  </MDBox>
                </MDBox>
              </Card>
              <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>
                  {message}
                </Alert>
              </Snackbar>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <MDBox
                  variant="gradient"
                  bgColor="warning"
                  borderRadius="lg"
                  coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    Barcode Data
                  </MDTypography>
                  <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  </Grid>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}  sx={{ width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <MDBox component="form" role="form" sx={{ width: '100%', justifyContent: 'center',  alignItems: 'center' }}>
                  <div>{openBackDrop &&  <Box sx={{ width: '50%', justifyContent: 'center',  alignItems: 'center', ml: 50, mt: 10 }}>
                    <CircularProgress color="inherit" />
                  </Box>}</div>
                    {!openBackDrop && userName && UserData ?
                    
                      <Box component="form" noValidate sx={{ mt: 1 }}>
         
                      <Typography  variant="h6" >
                       Products
                      </Typography>
                      {Array.isArray(UserData?.productDetails) ? UserData?.productDetails.length > 0 ? UserData?.productDetails?.map((product) => (
                        <Typography  variant="body2" sx={{ mb: 3 }}>
                          {product.pName || "-"}
                        </Typography>)) : <Typography  variant="body2" sx={{ mb: 3 }}>
                        No Product Data Available!
                      </Typography> : <Typography  variant="body2" sx={{ mb: 3 }}>
                        {UserData?.productId  || "-"}
                      </Typography>}
            
                      <Typography  variant="h6" >
                       User
                      </Typography>
                      <Typography  variant="body2" sx={{ mb: 3 }}>
                        {UserData?.ufullName || "-"}
                      </Typography>
            
                      <Typography  variant="h6" >
                       Customer Name
                      </Typography>
                      <Typography  variant="body2" sx={{ mb: 3 }}>
                        {UserData?.cfullName || "-"}
                      </Typography>
            
                      <Typography  variant="h6" >
                      Customer Phone Number
                     </Typography>
                     <Typography  variant="body2" sx={{ mb: 3 }}>
                       {UserData?.cphone || "-"}
                     </Typography>
            
                      <Typography  variant="h6" >
                      Weight
                      </Typography>
                      <Typography  variant="body2" sx={{ mb: 3 }}>
                        {`${UserData?.weight} Kg` || "-"}
                      </Typography>
            
                      <Typography  variant="h6" >
                       Type
                      </Typography>
                      <Typography  variant="body2" sx={{ mb: 3 }}>
                        {UserData?.type || "-"}
                      </Typography>
            
                      <Typography  variant="h6" >
                        Paid Status
                      </Typography>
                      <Typography  variant="body2" sx={{ mb: 3 }}>
                        {UserData?.paid ? "Paid" : "Not Paid" || "-"}
                      </Typography>
            
                      <Typography  variant="h6" >
                        Item Count
                      </Typography>
                      <Typography  variant="body2" sx={{ mb: 3 }}>
                        {UserData?.itemCount || "-"}
                      </Typography>
            
                      <Typography  variant="h6" >
                        Total
                      </Typography>
                      <Typography  variant="body2" sx={{ mb: 3 }}>
                        {UserData?.total || "-"}
                      </Typography>
            
                      <Typography  variant="h6" >
                       Order status
                      </Typography>
                      <Typography  variant="body2" sx={{ mb: 3 }}>
                        {UserData?.status || "-"}
                      </Typography>
            
                      <Typography  variant="h6" >
                      Shipping Address
                      </Typography>
                      <Typography  variant="body2" sx={{ mb: 3 }}>
                        {UserData?.shippingAddress || "-"}
                      </Typography>
            
                      <Typography  variant="h6" >
                      Payment Method
                      </Typography>
                      <Typography  variant="body2" sx={{ mb: 3 }}>
                        {UserData?.paymentMethod || "-"}
                      </Typography>
            
                      <Typography  variant="h6" >
                        Shipping Method
                      </Typography>
                      <Typography  variant="body2" sx={{ mb: 3 }}>
                        {UserData?.shippingMethod || "-"}
                      </Typography>
            
                      <Typography  variant="h6" >
                        Tracking Number
                      </Typography>
                      <Typography  variant="body2" sx={{ mb: 3 }}>
                        {UserData?.trackingNumber || "-"}
                      </Typography>
                      </Box> : 
                       <MDBox
                      mx={2}
                      mt={-3}
                      p={2}
                      mb={1}
                      textAlign="center"
                    >
                      {!openBackDrop && <MDTypography variant="h4" fontWeight="medium" color="Black" mt={1}>
                        No Data Available.
                      </MDTypography>}
                      <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                      </Grid>
                    </MDBox>
                    }
                    <MDBox mt={4} mb={1} style={{display: "flex", alignItems: "right", justifyContent: "end"}}>
                      <MDButton variant="outlined" color="info" onClick={onClickOkay}>
                        Okay
                      </MDButton>
                    </MDBox>
                    {/*<MDBox mt={3} mb={1} textAlign="center">
                      <MDTypography variant="button" color="text">
                        Don&apos;t have an account?{" "}
                        <MDTypography
                          component={Link}
                          to="/authentication/sign-up"
                          variant="button"
                          color="info"
                          fontWeight="medium"
                          textGradient
                        >
                          Sign up
                        </MDTypography>
                      </MDTypography>
                    </MDBox>*/}
                  </MDBox>
                </MDBox>
              </Card>
              <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>
                  {message}
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ScanPage;
