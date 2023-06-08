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


// Data
import {SDK} from "../../api/index";

import { useState, useEffect } from "react";

function Users() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    SDK.UserType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

  const columns = [
    { Header: "id", accessor: "id", width: "10%", align: "left" },
      { Header: "fullName", accessor: "fullName",  align: "left" },
      { Header: "role", accessor: "role", align: "left" },
      { Header: "email", accessor: "email", align: "left" },
      { Header: "phoneNumber", accessor: "phoneNumber", align: "center" },
      { Header: "address", accessor: "address", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ]

    const rows = userData?.map((user) =>  ({
        id: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.id || "-"}
        </MDTypography>),
        fullName: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.fullName  || "-"}
        </MDTypography>),
        role: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {user.role  || "-"}
        </MDTypography>),
        email: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {user.email  || "-"}
        </MDTypography>),
        phoneNumber: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.phoneNumber  || "-"}
        </MDTypography>),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.isActive}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
          </MDBox>
        ),
        address: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {user.address  || "-"}
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            View
          </MDTypography>
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
                <MDTypography variant="h6" color="white">
                  Users Table
                </MDTypography>
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

export default Users;
