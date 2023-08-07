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

// Dashboard React example components
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";

// Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/orders/data/authorsTableData";
import projectsTableData from "layouts/orders/data/projectsTableData";
import { Button } from "@mui/material";
import {SDK} from "../../api/index";
import { useState, useEffect } from "react";
import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import FormDialog from "./formTest";
import FormDialogUpdate from "./updateModal";
import FormDialogView from "./viewModal"

function Store() {
    const { columns, rows } = authorsTableData();
    const { columns: pColumns, rows: pRows } = projectsTableData();
    const [productData, setProductsData] = useState([]);
    const [rawMatsData, setRawMatssData] = useState([]);
    const [chemicals, setChemicals] = useState([]);

    const [open, setOpen] = React.useState(false);

  const [userId, setUserId] = React.useState(false);
    const { sales, tasks } = reportsLineChartData;
    const navigate = useNavigate();

    useEffect(() => {
      SDK.ProductType.getAll()
      .then((res) => {
        console.log("RES: ", res);
        setProductsData(res?.data)
      })
      .catch((error) => {
        console.log("Error: ", error)
      }, [])

      SDK.RawMatsType.getAll()
      .then((res) => {
        console.log("RES: ", res);
        setRawMatssData(res?.data)
      })
      .catch((error) => {
        console.log("Error: ", error)
      })

      SDK.ChemicalsType.getAll()
      .then((res) => {
        console.log("RES: ", res);
        setChemicals(res?.data)
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


  const handleClick = (id) => {
    console.log("id", id);
    navigate(`/stocks/product-stock/${id}`);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h6" fontWeight="medium"></MDTypography>
              <MDButton variant="gradient" color="dark" onClick={handleClickOpen}>
                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                    &nbsp;Add New Stock
                  </MDButton>
            </MDBox>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item lg={12} >
            <MDBox height="100%" width="100%"  mt={0.5} mb={1}  lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Products
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                End-products
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      <MDBox py={3} >
        <Grid container spacing={3} >
          {productData.length > 0 && productData.map((product) => <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} on>
              <ComplexStatisticsCard
                onClickCard={() => handleClick(product.id)}
                color="dark"
                icon="weekend"
                count={product.productName}
                percentage={{
                  color: product.maxStockLevel > '100' ? "success" : "danger",
                  amount: `${product.maxStockLevel}`,
                  label: "are available.",
                }}
              />
            </MDBox>
          </Grid>)}
        </Grid>
      </MDBox>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item lg={12} >
            <MDBox height="100%" width="100%"  mt={0.5} mb={1}  lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Matterials
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                Raw-Matterials
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      <MDBox py={3}>
        <Grid container spacing={3}>
          {rawMatsData.length > 0 && rawMatsData.map((product) => <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} on>
              <ComplexStatisticsCard
                onClickCard={() => handleClick(product.id)}
                color="dark"
                icon="weekend"
                count={product.name}
                percentage={{
                  color: product.maxStockLevel > '100' ? "success" : "danger",
                  amount: `${product.maxStockLevel}`,
                  label: "are available.",
                }}
              />
            </MDBox>
          </Grid>)}
        </Grid>
      </MDBox>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item lg={12} >
            <MDBox height="100%" width="100%"  mt={0.5} mb={1}  lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Chemicals
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                Chemicals
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

      <MDBox py={3}>
        <Grid container spacing={3}>
          {chemicals.length > 0 && chemicals.map((product) => <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} on>
              <ComplexStatisticsCard
                onClickCard={() => handleClick(product.id)}
                color="dark"
                icon="weekend"
                count={product.name}
                percentage={{
                  color: product.maxStockLevel > '100' ? "success" : "danger",
                  amount: `${product.maxStockLevel}`,
                  label: "are available.",
                }}
              />
            </MDBox>
          </Grid>)}
        </Grid>
      </MDBox>
      {open &&  <FormDialog setOpen={handleCloseOpen} open={open}/>}
      <Footer />
    </DashboardLayout>
  );
}

export default Store;