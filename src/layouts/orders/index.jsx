/**
=========================================================
* Material Dashboard 2 React - v2.1.0
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDBadge from "components/MDBadge";

// Data
import authorsTableData from "layouts/orders/data/authorsTableData";
import projectsTableData from "layouts/orders/data/projectsTableData";

import {SDK} from "../../api/index"
import { useState, useEffect } from "react";

function Orders() {
  const [orderData, setOrderData] = useState([]);

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

  const columns = [
    { Header: "id", accessor: "id", width: "10%", align: "left" },
      { Header: "customerId", accessor: "customerId",  align: "left" },
      { Header: "role", accessor: "role", align: "left" },
      { Header: "email", accessor: "email", align: "left" },
      { Header: "phoneNumber", accessor: "phoneNumber", align: "center" },
      { Header: "address", accessor: "address", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ]

    const rows = orderData  ?.map((user) =>  ({
        id: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.id || "-"}
        </MDTypography>),
        fullName: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.fullName  || "-"}
        </MDTypography>),
        role: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {user.role  || "-"}
        </MDTypography>),
        shippingMethod: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {user.shippingMethod  || "-"}
        </MDTypography>),
         trackingNumber: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user. trackingNumber  || "-"}
        </MDTypography>),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.status}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
          </MDBox>
        ),
        paid: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.paid}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
          </MDBox>
        ),
        total: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {user.total  || "-"}
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
                  Orders
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

export default Orders;
