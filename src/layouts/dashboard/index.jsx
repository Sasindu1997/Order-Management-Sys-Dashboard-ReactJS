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
import * as React from 'react';
// Dashboard React components
import MDBox from "components/MDBox";

// Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useState, useEffect } from "react";
import {SDK} from "../../api/index";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [productData, setProductsData] = useState([]);
  const [rawMatsData, setRawMatssData] = useState([]);
  const [chemicals, setChemicals] = useState([]);
  const [getAllProductOrders, setgetAllProductOrders] = useState([]);
  const [monthlyOrderCount, setmonthlyOrderCount] = useState([]);
  const [thisMonthOrderCount, setthisMonthOrderCount] = useState([]);
  const [todayOrderCount, settodayOrderCount] = useState([]);
  const [weeklyOrderCount, setweeklyOrderCount] = useState([]);
  const [yearlyOrderCount, setyearlyOrderCount] = useState([]);
  const [newCustomersCount, setnewCustomersCount] = useState([]);
  const [openBackDrop, setOpenBackDrop] = React.useState(true);

  useEffect(() => {
    setOpenBackDrop(true);
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

    //////////////////////////////
    SDK.OrderType.getAllProductOrders()
      .then((res) => {
        console.log("RES 1: ", res.data);
        setgetAllProductOrders(res?.data)
      })
      .catch((error) => {
        console.log("Error: ", error)
      })

      SDK.OrderType.monthlyOrderCount()
      .then((res) => {
        console.log("RES 2: ", res.data);
        setmonthlyOrderCount(res.data.map(sale => {
          return sale.order_count
        }))
      })
      .catch((error) => {
        console.log("Error: ", error)
      })

      SDK.OrderType.thisMonthOrderCount()
      .then((res) => {
        console.log("RES 3: ", res.data);
        setthisMonthOrderCount(res?.data[0]?.NumberOfOrders)
      })
      .catch((error) => {
        console.log("Error: ", error)
      })

      SDK.OrderType.todayOrderCount()
      .then((res) => {
        console.log("RES 4: ", res.data[0]);
        settodayOrderCount(res?.data[0]?.NumberOfOrders)
      })
      .catch((error) => {
        console.log("Error: ", error)
      })

      SDK.OrderType.weeklyOrderCount()
      .then((res) => {
        console.log("RES 5: ", res.data.map(sale => {
          return sale.order_count
        }));
        setweeklyOrderCount(res.data.map(sale => {
          return sale.order_count
        }))
      })
      .catch((error) => {
        console.log("Error: ", error)
      })

      SDK.OrderType.yearlyOrderCount()
      .then((res) => {
        console.log("RES 6: ", res.data);
        setyearlyOrderCount(res?.data[0]?.NumberOfOrders)
      })
      .catch((error) => {
        console.log("Error: ", error)
      })

      SDK.OrderType.newCustomersCount()
      .then((res) => {
        console.log("RES 7: ", res.data);
        setnewCustomersCount(res?.data[0]?.NumberOfCustomers)
      })
      .catch((error) => {
        console.log("Error: ", error)
      })
      setTimeout(function(){
        setOpenBackDrop(false);
      }, 1000); 
}, [])


  return (
    <DashboardLayout>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
        // onClick={handleCloseBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Today's Count"
                count={todayOrderCount}
                percentage={{
                  color: "success",
                  amount: `${todayOrderCount}+`,
                  label: " Orders Completed Today.",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="This Month's Count"
                count={thisMonthOrderCount}
                percentage={{
                  color: "success",
                  amount: `${thisMonthOrderCount}+`,
                  label: " Orders Completed This Month.",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count={yearlyOrderCount}
                percentage={{
                  color: "success",
                  amount: `${thisMonthOrderCount}+`,
                  label: " Orders Completed This Year",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Customers"
                count={newCustomersCount}
                percentage={{
                  color: "success",
                  amount: `${newCustomersCount}+`,
                  label: " Customers Joined Today",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Daily sales"
                  description="Last Campaign Performance"
                  date="Campain is Upto Date."
                  chart={{
                    labels: ["M", "T", "W", "T", "F", "S", "S"],
                    datasets: { label: "Sales", data: weeklyOrderCount },
                }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Monthly sales"
                  description="Last Campaign Performance"
                  date="Campain is Upto Date."
                  chart={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: { label: "Mobile apps", data: monthlyOrderCount },
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={[]}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
