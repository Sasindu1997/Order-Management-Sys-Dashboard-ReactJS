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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Store() {
    const { columns, rows } = authorsTableData();
    const { columns: pColumns, rows: pRows } = projectsTableData();
    const [productData, setProductsData] = useState([]);
    const [categoryData, setCategoriesData] = useState([]);
    const [rawMatsData, setRawMatssData] = useState([]);
    const [chemicals, setChemicals] = useState([]);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [userId, setUserId] = React.useState(false);
    const [categoryId, setCategoryId] = React.useState(false);
    const { sales, tasks } = reportsLineChartData;
    const navigate = useNavigate();  
    const [openSnack, setOpenSnack] = React.useState(false);
    const [showProductList, setShowProductList] = React.useState(false);
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

    useEffect(() => {
      setOpenBackDrop(true)
      SDK.ProductType.getAll()
      .then((res) => {
        console.log("RES: ", res);
        setProductsData(res?.data)
      })
      .catch((error) => {
        console.log("Error: ", error)
      }, [])

      setOpenBackDrop(true)
      SDK.CategoryType.getAll()
      .then((res) => {
        console.log("RES: ", res);
        setCategoriesData(res?.data)
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
      setTimeout(function(){
        setOpenBackDrop(false);
      }, 1000);
  }, [open, openConformDelete])

  useEffect(() => {
    setOpenBackDrop(true)
    categoryId && SDK.ProductType.getAllByCategoryId(categoryId)
    .then((res) => {
      console.log("RES: ", res);
      setProductsData(res?.data);
      setShowProductList(true);
      setOpenBackDrop(false)
    })
    .catch((error) => {
      console.log("Error: ", error)
      setShowProductList(false);
      setOpenBackDrop(false)
    }, [])
}, [categoryId])

  const handleClickOpen = () => {
    setOpen(true);
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

  const handleClickPro = (id) => {
    console.log("id", id);
    navigate(`/stocks/product-stock/prod/${id}`);
  }

  const handleClickRaw = (id) => {
    console.log("id", id);
    navigate(`/stocks/product-stock/raw/${id}`);
  }

  const handleClickChem = (id) => {
    console.log("id", id);
    navigate(`/stocks/product-stock/chem/${id}`);
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
                End-products stocks
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox py={3} >
      <Grid container spacing={3} >

      {categoryData.length > 0 && categoryData.map((category) => 
            <Box sx={{ minWidth: 275, margin : 2 }}>
            <Card variant="outlined" sx={{ minWidth: 275, margin : 2, backgroundColor : 'wheat' }}>
            <React.Fragment>
              <CardContent>
                <Typography sx={{ mb: 1.5, fontWeight : 'bold' }} color="text.secondary">
                {category?.title || '-'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => setCategoryId(category.id)}>View Products</Button>
              </CardActions>
                </React.Fragment>
            </Card>
            </Box>)}
        </Grid>
        <Grid container spacing={3} >
          {showProductList && productData.length > 0 && productData.map((product) => <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} on>
              <ComplexStatisticsCard
                onClickCard={() => handleClickPro(product.id)}
                color="dark"
                icon="weekend"
                count={product.productName}
                percentage={{
                  color: product.maxStockLevel > 100 ? "success" : product.maxStockLevel > 1 ? "secondary" : "primary",
                  amount: `${product.maxStockLevel} `,
                  label: " are available.",
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
                Raw-Matterials stocks
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
                onClickCard={() => handleClickRaw(product.id)}
                color="dark"
                icon="weekend"
                count={product.name}
                percentage={{
                  color: product.maxStockLevel > 100 ? "success" : product.maxStockLevel > 1 ? "secondary" : "primary",
                  amount: `${product.maxStockLevel} `,
                  label: " are available.",
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
                Chemicals stocks
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
                onClickCard={() => handleClickChem(product.id)}
                color="dark"
                icon="weekend"
                count={product.name}
                percentage={{
                  color: product.maxStockLevel > 100 ? "success" : product.maxStockLevel > 1 ? "secondary" : "primary",
                  amount: `${product.maxStockLevel} `,
                  label: " are available.",
                }}
              />
            </MDBox>
          </Grid>)}
        </Grid>
      </MDBox>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
      <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
      {open &&  <FormDialog setOpen={handleCloseOpen} open={open}/>}
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

export default Store;