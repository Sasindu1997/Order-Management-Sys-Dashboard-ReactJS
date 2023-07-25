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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import TextField from '@mui/material/TextField';

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
import MuiAlert from '@mui/material/Alert';
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useNavigate } from "react-router-dom";
import {SDK} from "../../api/index";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ScanPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [UserData, setUserData] = useState([]);
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

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const onchangeInput = (value) => {
    console.log("value : ", value.target.value);
    setUserName(value.target.value)
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
                      <MDButton variant="gradient" color="info" fullWidth>
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
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox component="form" role="form">
                    {userName}
                    <MDBox mt={4} mb={1} style={{display: "flex", alignItems: "right", justifyContent: "end"}}>
                      <MDButton variant="outlined" color="info" >
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
