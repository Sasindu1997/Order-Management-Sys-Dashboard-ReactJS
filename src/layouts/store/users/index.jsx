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

// Data
import {SDK} from "../../../api/index";

import { useState, useEffect } from "react";
import FormDialog from "./formTest";
import FormDialogUpdate from "./updateModal";
import FormDialogView from "./viewModal"
import { useHistory, useParams } from "react-router-dom";

function ProductStock() {
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [userData, setUserData] = useState([]);
  const params = useParams();


  useEffect(() => {
    console.log("params: ", params);

    params.id && SDK.StockType.getByProductId(params.id)
    .then((res) => {
      console.log("RES: ", res);
      setUserData(res?.data)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }, [])

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
    id && SDK.UserType.deletebyId(id)
    .then((res) => {
      console.log("RES: ", res);
      window.location.reload();
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }

  

  const columns = [
    { Header: "id", accessor: "id", width: "5%", align: "left" },
      { Header: "product Id", accessor: "productId", align: "center" },
      { Header: "product Name", accessor: "productName", align: "center" },
      { Header: "category", accessor: "categoryId", align: "left" },
      { Header: "quantity", accessor: "quantity", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", width: "8%", align: "center" },
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
        categoryId: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {user.categoryId  || "-"}
        </MDTypography>),
        productId: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.productId  || "-"}
        </MDTypography>),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={`${user.isActive}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
          </MDBox>
        ),
        quantity: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {user.quantity  || "-"}
          </MDTypography>
        ),
        action: (
          <Box >
          <Stack direction="row" spacing={1}>
            <Button onClick={() => handleClickView(user.id)}> View </Button>           
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
                  Product Stock Table
                </MDTypography>
                <MDBox px={2} display="flex" justifyContent="space-between" alignItems="center" onClick={handleClickOpen}>
                  <MDTypography variant="h6" fontWeight="medium"></MDTypography>
                  <MDButton variant="gradient" color="dark" onClick={handleClickOpen}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Add New Stock
                  </MDButton>
              </MDBox>
               {open &&  <FormDialog setOpen={handleCloseOpen} open={open}/>}
               {openUpdate && userId &&  <FormDialogUpdate setOpen={handleCloseOpenUpdate} open={openUpdate} userId={userId}/>}
               {openView && userId &&  <FormDialogView setOpen={handleCloseOpenView} open={openView} userId={userId}/>}
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
      <Footer />
    </DashboardLayout>
  );
}

export default ProductStock;
