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
// import { BarChart } from '@mui/x-charts';
import { Bar } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from "react-datepicker";
import MDButton from "components/MDButton";
import FormControl from '@mui/material/FormControl';
import moment from 'moment';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

let user = localStorage.getItem('loggedInUser')
let newuser = JSON.parse(user)

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
  const [managers, setManagers] = useState([]);
  const [managersData, setManagersData] = useState([]);
  const [openBackDrop, setOpenBackDrop] = React.useState(true);
  const [openBackDrop2, setOpenBackDrop2] = React.useState(true);

  const [soderId, setSoderId] = React.useState('');
  const [scusName, setScusName] = React.useState('');
  const [scusPhn, setScusPhn] = React.useState('');
  const [ssupplier, setSsupplier] = React.useState('');
  const [strackingNo, setStrackingNo] = React.useState('');
  const [sorderStatus, setSorderStatus] = React.useState('');
  const [sproduct, setSproduct] = React.useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackSeverity, setSnackSeverity] = React.useState(false);
  const [countsLoading, setCountsLoading] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [orderData, setOrderData] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [allProductData, setAllProductData] = useState([]);
  const [sumOrders, setSumOrders] = useState(0);
  const [sumProducts, setSumProducts] = useState(0);


  useEffect(() => {
    setOpenBackDrop(true);
    setCountsLoading(true);
    console.log("loggedInUserDash", newuser?.role);
    var day = 60 * 60 * 24 * 1000;
    var sDate = startDate && new Date(startDate?.getTime());
    var eDate = endDate && new Date(endDate?.getTime() + day);
    var tDate = new Date(new Date()?.getTime() + day);

    newuser?.role == 'Marketing Manager' ? SDK.OrderType.findAllBySupplier(newuser?.id)
    .then((res) => {
      console.log("RES cccccccccccc: ", res);
      setOrderData(res?.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    }) : 
    // SDK.OrderType.getAll()
    // .then((res) => {
    //   console.log("RES: ", res);
    //   setOrderData(res?.data);
    //   setTimeout(function(){
    //     setCountsLoading(false);
    //   }, 500);
    // })
    // .catch((error) => {
    //   console.log("Error: ", error);
    //   setSnackSeverity('error');
    //   setMessage('Error!');
    //   setOpenSnack(true);
    // })
    SDK.OrderType.multipleSearchOrderCount({
      "id" : soderId, 
      "customerName" : scusName,
      "customerPhone" : scusPhn,
      "supplier" : ssupplier,
      "status" : sorderStatus,
      "trackingNo" : strackingNo,
      "createdAt" : sDate ? moment(new Date(sDate)).format('YYYY-MM-DD') : moment(new Date('2000-01-01')).format('YYYY-MM-DD'),
      "endDate" : eDate ? moment(new Date(eDate)).format('YYYY-MM-DD') : moment(tDate).format('YYYY-MM-DD'),
    })
    .then((res) => {
      console.log("RES Count: ", res);
      setOrderCount(res.data.Count);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    })
    SDK.ProductType.getAll()
    .then((res) => {
      console.log("RES: ", res);
      setAllProductData(res?.data);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    })
    SDK.OrderType.multipleSearchDash({
      "id" : soderId, 
      "customerName" : scusName,
      "customerPhone" : scusPhn,
      "supplier" : ssupplier,
      "status" : sorderStatus,
      "trackingNo" : strackingNo,
      "createdAt" : sDate ? moment(new Date(sDate)).format('YYYY-MM-DD') : moment(new Date('2000-01-01')).format('YYYY-MM-DD'),
      "endDate" : eDate ? moment(new Date(eDate)).format('YYYY-MM-DD') : moment(tDate).format('YYYY-MM-DD'),
    })
    .then((res) => {
      console.log("RESTot: ", res);
      setSumOrders(res.data.total_prc)
      setTimeout(function(){
        setCountsLoading(false);
      }, 500);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error in Search Orders!');
      setOpenSnack(true);
    })
    SDK.OrderType.multipleSearchDashPr({
      "id" : soderId, 
      "customerName" : scusName,
      "customerPhone" : scusPhn,
      "supplier" : ssupplier,
      "status" : sorderStatus,
      "trackingNo" : strackingNo,
      "createdAt" : sDate ? moment(new Date(sDate)).format('YYYY-MM-DD') : moment(new Date('2000-01-01')).format('YYYY-MM-DD'),
      "endDate" : eDate ? moment(new Date(eDate)).format('YYYY-MM-DD') : moment(new Date() + day).format('YYYY-MM-DD'),
    })
    .then((res) => {
      console.log("RESTotPr: ", res);
      setSumProducts(res.data)
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error in Search Orders!');
      setOpenSnack(true);
    })
    setTimeout(function(){
      setOpenBackDrop(false);
      setCountsLoading(false);
    }, 1000);


    SDK.UserType.findAllManagers()
    .then((res) => {
      let arr = []
      let arr2 = []
      console.log("RES: ", res);
      setManagers(res?.data)

      res?.data?.map(managers => {
        console.log("managers==================", managers)
        SDK.OrderType.getBySupplierId(managers.id)
          .then((res) => {
            res?.data?.map(dat => { 
              arr.push(dat?.order_count)
            })
            arr2.push(arr)
            console.log("getBySupplierId: ", arr);
            arr=[]
          })
          .catch((error) => {
            console.log("Error: ", error)
          })
      })
      setManagersData(arr2)
    })
    .catch((error) => {
      console.log("Error: ", error)
    })

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
      }, 1500); 
}, [])

useEffect(() => {
  setOpenBackDrop(true);
    setTimeout(function(){
      setOpenBackDrop(false);
      setOpenBackDrop2(false)
    }, 3000); 
}, [managersData])

const handleClickClear = () => {

  setStartDate('')
  setEndDate('')
  setSoderId('')
  setScusName('')
  setScusPhn('')
  setSsupplier('')
  setSorderStatus('')
  setSproduct('')
  setStrackingNo('')

//   SDK.OrderType.getAll()
// .then(async (res) => {
//   setOrderData(res?.data);
//   setOpenBackDrop(false);
//   setTimeout(function(){
//     setCountsLoading(false);
//   }, 500);
// })
// .catch((error) => {
//   setOpenBackDrop(false);
//   console.log("Error: ", error)
//   setSnackSeverity('error');
//   setMessage('Error!');
//   setOpenSnack(true);
// })
var day = 60 * 60 * 24 * 1000;
var sDate = startDate && new Date(startDate?.getTime());
var eDate = endDate && new Date(endDate?.getTime() + day);
var tDate = new Date(new Date()?.getTime() + day);

    SDK.OrderType.multipleSearchOrderCount({
      "id" : soderId, 
      "customerName" : scusName,
      "customerPhone" : scusPhn,
      "supplier" : ssupplier,
      "status" : sorderStatus,
      "trackingNo" : strackingNo,
      "createdAt" : sDate ? moment(new Date(sDate)).format('YYYY-MM-DD') : moment(new Date('2000-01-01')).format('YYYY-MM-DD'),
      "endDate" : eDate ? moment(new Date(eDate)).format('YYYY-MM-DD') : moment(tDate).format('YYYY-MM-DD'),
    })
    .then((res) => {
      console.log("RES Count: ", res);
      setOrderCount(res.data.Count);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    })

    SDK.OrderType.multipleSearchDash({
      "id" : soderId, 
      "customerName" : scusName,
      "customerPhone" : scusPhn,
      "supplier" : ssupplier,
      "status" : sorderStatus,
      "trackingNo" : strackingNo,
      "createdAt" : sDate ? moment(new Date(sDate)).format('YYYY-MM-DD') : moment(new Date('2000-01-01')).format('YYYY-MM-DD'),
      "endDate" : eDate ? moment(new Date(eDate)).format('YYYY-MM-DD') : moment(tDate).format('YYYY-MM-DD'),
    })
    .then((res) => {
      console.log("RESTot: ", res);
      setSumOrders(res.data.total_prc)
      setTimeout(function(){
        setCountsLoading(false);
      }, 500);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error in Search Orders!');
      setOpenSnack(true);
    })
    SDK.OrderType.multipleSearchDashPr({
      "id" : soderId, 
      "customerName" : scusName,
      "customerPhone" : scusPhn,
      "supplier" : ssupplier,
      "status" : sorderStatus,
      "trackingNo" : strackingNo,
      "createdAt" : sDate ? moment(new Date(sDate)).format('YYYY-MM-DD') : moment(new Date('2000-01-01')).format('YYYY-MM-DD'),
      "endDate" : eDate ? moment(new Date(eDate)).format('YYYY-MM-DD') : moment(new Date() + day).format('YYYY-MM-DD'),
    })
    .then((res) => {
      console.log("RESTotPr: ", res);
      setSumProducts(res.data)
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error in Search Orders!');
      setOpenSnack(true);
    })
    setTimeout(function(){
      setOpenBackDrop(false);
    }, 1000);
}

const handleScusName = (event) => {
    console.log(event.target.value)
    setScusName(event.target.value);
  };
  const handleScusPhn = (event) => {
    console.log(event.target.value)
    setScusPhn(event.target.value);
  };
  const handleSupplier = (event) => {
    console.log(event.target.value)
    setSsupplier(event.target.value);
  };
  const handleSorderStatus = (event) => {
    console.log(event.target.value)
    setSorderStatus(event.target.value);
  };
  const handleSproduct = (event) => {
    console.log(event.target.value)
    setSproduct(event.target.value);
  };
  const handleStrackingNo = (event) => {
    console.log(event.target.value)
    setStrackingNo(event.target.value);
  };
  const handleSoderId = (event) => {
    console.log(event.target.value) 
    setSoderId(event.target.value);
  };
  
  const handleClickSearchBtn = () => {
    setCountsLoading(true);
    var day = 60 * 60 * 24 * 1000;
    var sDate = startDate && new Date(startDate?.getTime());
    var eDate = endDate && new Date(endDate?.getTime() + day);
    var tDate = new Date(new Date()?.getTime() + day);

    let obj = {
      "id" : soderId, 
      "customerName" : scusName,
      "customerPhone" : scusPhn,
      "supplier" : ssupplier,
      "status" : sorderStatus,
      "prid": sproduct,
      "trackingNo" : strackingNo,
      "createdAt" : sDate ? moment(new Date(sDate)).format('YYYY-MM-DD') : moment(new Date('2000-01-01')).format('YYYY-MM-DD'),
      "endDate" : eDate ? moment(new Date(eDate)).format('YYYY-MM-DD') : moment(tDate).format('YYYY-MM-DD'),
    }
    SDK.OrderType.multipleSearchC(obj)
    .then((res) => {
      console.log("RES: ", res);
      setOrderData(res?.data)
      setTimeout(function(){
        setCountsLoading(false);
      }, 500);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error in Search Orders!');
      setOpenSnack(true);
    })
    SDK.OrderType.multipleSearchOrderCount(obj)
    .then((res) => {
      console.log("RES Count: ", res);
      setOrderCount(res.data.Count);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error!');
      setOpenSnack(true);
    })
    SDK.OrderType.multipleSearchDash(obj)
    .then((res) => {
      console.log("RESTot: ", res.data.total_prc);
      setSumOrders(res.data.total_prc)
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error in Search Orders!');
      setOpenSnack(true);
    })
    SDK.OrderType.multipleSearchDashPr({
      "id" : soderId, 
      "customerName" : scusName,
      "customerPhone" : scusPhn,
      "supplier" : ssupplier,
      "status" : sorderStatus,
      "prid": sproduct,
      "trackingNo" : strackingNo,
      "createdAt" : sDate ? moment(new Date(sDate)).format('YYYY-MM-DD') : moment(new Date('2000-01-01')).format('YYYY-MM-DD'),
      "endDate" : eDate ? moment(new Date(eDate)).format('YYYY-MM-DD') : moment(new Date() + day).format('YYYY-MM-DD'),
    })
    .then((res) => {
      console.log("RESTotPr: ", res);
      setSumProducts(res.data)
      setTimeout(function(){
        setCountsLoading(false);
      }, 500);
    })
    .catch((error) => {
      console.log("Error: ", error);
      setSnackSeverity('error');
      setMessage('Error in Search Orders!');
      setOpenSnack(true);
    })
  }

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['Jan', 'Febr', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

 const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [100, 200, 300],
      backgroundColor: 'rgba(255, 99, 132, 0.9)',
    },
    // {
    //   label: 'Dataset 2',
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //   backgroundColor: 'rgba(53, 162, 235, 0.9)',
    // },
  ],
};




// const getChartData = (id) => {
//  let data =  SDK.OrderType.getBySupplierId(id)
//           .then((res) => {
//             console.log("getBySupplierId: ", res.data);
//             return res.data;
//           })
//           .catch((error) => {
//             console.log("Error: ", error)
//           })
//           return data
// }

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
        <h2 style={{marginBottom : '15px'}}>Sales Data</h2>
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
        <h2 style={{marginBottom : '15px'}}>Sales Charts </h2>
        {newuser?.role != 'Marketing Manager' && <MDBox mt={4.5}>
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
        </MDBox>}

          {newuser?.role != 'Marketing Manager' && <Box>
          <h2 style={{marginBottom : '15px'}}>Order Details Search</h2>
          <Item sx={{paddingBottom : 5}}>
           <Grid container spacing={2} sx={{paddingBottom : 5}}>
            <Grid item xs={3}>
              <InputLabel id="demo-simple-select-label" 
              style={{display: "flex", alignItems: "right", justifyContent: "start"}}
              sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Customer Name</InputLabel>
              <TextField
                value={scusName}
                onChange={handleScusName}
                margin="normal"
                required
                sx={{ paddingLeft: 2, paddingRight: 2}}
                fullWidth
                name="total"
                id="total"
              />
            </Grid>
            <Grid item xs={3}>
               <InputLabel id="demo-simple-select-label" 
              style={{display: "flex", alignItems: "right", justifyContent: "start"}}
              sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Customer Phone</InputLabel>
              <TextField
                value={scusPhn}
                onChange={handleScusPhn}
                margin="normal"
                required
                sx={{ paddingLeft: 2, paddingRight: 2}}
                fullWidth
                name="total"
                type='number'
                id="total"
              />
            </Grid>
    
           <Grid item xs={3}>
            <InputLabel id="demo-simple-select-label" 
              style={{display: "flex", alignItems: "right", justifyContent: "start"}}
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Supplier</InputLabel>
              {/*<TextField
                value={ssupplier}
                onChange={handleSupplier}
                margin="normal"
                required
                sx={{ paddingLeft: 2, paddingRight: 2}}
                fullWidth
                name="total"
                id="total"
      />*/}
            <Select
              labelId="status"
              id="status" 
              value={ssupplier}
              label="status"
              fullWidth
              disabled={newuser?.role == 'Marketing Manager'}
              name="status"
              sx={{ minWidth: 120,  minHeight: 40 }}
              onChange={handleSupplier}
            >
            {managers?.map((obj) => (
              <MenuItem
                key={obj.id}
                value={obj.userName}
                extra={obj.userName}
              >
                
                {obj.userName}
              </MenuItem>
            ))}
            </Select>
            </Grid>
    
            <Grid item xs={3}>
              <InputLabel id="demo-simple-select-label" 
              style={{display: "flex", alignItems: "right", justifyContent: "start"}}
              sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Order Start Date</InputLabel>
              <Grid item xs={4} classname="customdatepickerwidth" >
                  <div className="datepicker-container">
                  <div className="dates-container">
                    <div className="date-item"></div>
                  </div>
                  <div className="react-datepicker-wrapper">
                    <DatePicker className='react-datepicker3' onChange={(date) => setStartDate(date)} selected={startDate}  dateformat="dd/mm/yyyy" />
                  </div>
                </div>
                </Grid>
            </Grid>
    
            <Grid item xs={3}>
               <InputLabel id="demo-simple-select-label" 
              style={{display: "flex", alignItems: "right", justifyContent: "start"}}
              sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Order Status</InputLabel>
              {/*<TextField
                value={sorderStatus}
                onChange={handleSorderStatus}
                margin="normal"
                required
                sx={{ paddingLeft: 2, paddingRight: 2}}
                fullWidth
                name="total"
                id="total"
              />*/}
              <Select
              labelId="status"
              id="status" 
              value={sorderStatus}
              label="status"
              fullWidth
              name="status"
              sx={{ minWidth: 120,  minHeight: 40 }}
              onChange={handleSorderStatus}
            >
              <MenuItem value={""}></MenuItem>
              <MenuItem value={"Dispatched"}>Dispatched</MenuItem>
              <MenuItem value={"Pending"}>Pending</MenuItem>
              <MenuItem value={"Delivered"}>Delivered</MenuItem>
              <MenuItem value={"ExChanged"}>ExChanged</MenuItem>
              <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
              <MenuItem value={"Returned"}>Returned</MenuItem>
            </Select>
            </Grid>
            <Grid item xs={3}>
               <InputLabel id="demo-simple-select-label" 
              style={{display: "flex", alignItems: "right", justifyContent: "start"}}
              sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Tracking Number</InputLabel>
              <TextField
                value={strackingNo}
                onChange={handleStrackingNo}
                margin="normal"
                required
                sx={{ paddingLeft: 2, paddingRight: 2}}
                fullWidth
                name="total"
                id="total"
              />
            </Grid>
            <Grid item xs={3}>
               <InputLabel id="demo-simple-select-label" 
              style={{display: "flex", alignItems: "right", justifyContent: "start"}}
              sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Order Id</InputLabel>
              <TextField
                value={soderId}
                onChange={handleSoderId}
                margin="normal"
                required
                sx={{ paddingLeft: 2, paddingRight: 2}}
                fullWidth
                name="id"
                id="id"
              />
            </Grid>
            <Grid item xs={3}>
            <InputLabel id="demo-simple-select-label" 
            style={{display: "flex", alignItems: "right", justifyContent: "start"}}
            sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Order End Date</InputLabel>
            <Grid item xs={4} classname="customdatepickerwidth" >
                <div className="datepicker-container">
                <div className="dates-container">
                  <div className="date-item"></div>
                </div>
                <div className="react-datepicker-wrapper">
                  <DatePicker className='react-datepicker3' onChange={(date) => setEndDate(date)} selected={endDate}  dateformat="dd/mm/yyyy" />
                </div>
              </div>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <InputLabel id="demo-simple-select-label" 
                style={{display: "flex", alignItems: "right", justifyContent: "start"}}
                sx={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px', }}>Product</InputLabel>
                <Select
                labelId="sproduct"
                id="sproduct" 
                value={sproduct}
                label="Product"
                fullWidth
                name="sproduct"
                sx={{ minWidth: 120,  minHeight: 40 }}
                onChange={handleSproduct}
              >
                {allProductData.length > 0 && allProductData.map(pr => (
                  <MenuItem value={pr.id}>{pr.productName}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
              <div style={{display: "flex", alignItems: "right", justifyContent: "end", mr: '5'}} >
                <FormControl sx={{ m: 1 }} variant="standard">
                <div style={{  marginLeft: '3px', fontStyle : 'italic', fontWeight : 'bold' }}>
                  <MDButton sx={{ px: 6, py: 2.5, mr: 1 }} variant="" color="" onClick={handleClickClear}>
                    Clear
                  </MDButton>
                  <MDButton sx={{ px: 6, py: 2.5, mr: 1 }} variant="gradient" color="warning" onClick={handleClickSearchBtn}>
                  &nbsp;Search
                  </MDButton>
                  </div>
                </FormControl>
               </div>

               <Grid container spacing={2}>
            <Grid item xs={3}>
              <InputLabel id="demo-simple-select-label" 
              style={{display: "flex", alignItems: "right", justifyContent: "start"}}
              sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold', fontSize: '15px'}}>Order Count</InputLabel>
              {!countsLoading ? (<h1>{orderCount || 0}</h1>) : (
                <CircularProgress color="inherit" />
              )}
            </Grid>
            <Grid item xs={3}>
               <InputLabel id="demo-simple-select-label" 
              style={{display: "flex", alignItems: "left", justifyContent: "start"}}
              sx={{ paddingTop: 2, fontWeight: 'bold', fontSize: '15px' }}>Order Total</InputLabel>
              <div style={{display: "flex" , alignItems: "left", justifyContent: "center"}}> {!countsLoading ? (<><h1>{sumOrders?.toFixed(2) || 0}</h1><h6>LKR </h6></>) : (
                <CircularProgress color="inherit" />
              )}</div>
            </Grid>
            <Grid item xs={3}>
               <InputLabel id="demo-simple-select-label" 
              style={{display: "flex", alignItems: "left", justifyContent: "start"}}
              sx={{ paddingTop: 2, fontWeight: 'bold', fontSize: '15px' }}>Products Sold</InputLabel>

              <div style={{display: "flex" , alignItems: "left", justifyContent: "center"}}>
              {!countsLoading ? (<><h1>{Number(sumProducts)  && Number(sumProducts) || 0}
              </h1></>) : (
                <CircularProgress color="inherit" />
              )}</div>
            </Grid>
    
           <Grid item xs={3}>
           
            </Grid>
    
            <Grid item xs={3}>
              
            </Grid>
          </Grid>
          
          </Item>
        </Box>}

      <h2 style={{marginBottom : '15px', marginTop : '15px'}}>Monthly Charts of Marketing Managers</h2>
      {newuser?.role != 'Marketing Manager' && <><MDBox mt={4.5}>
       <Grid container spacing={3}>
       {managers.length > 0 && managers.map((manager, i) => (
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
              <Bar options={ {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: `Orders of ${manager?.fullName}`,
                  },
                },
              }} data={{
                labels,
                datasets: [
                  // {
                  //   label: 'Dataset[i]',
                  //   data: managersData[i],
                  //   backgroundColor: 'rgba(255, 99, 132, 0.9)',
                  // },
                  {
                    label: `Dataset ${i+1}`,
                    data: managersData[i],
                    backgroundColor: 'rgba(53, 162, 235, 0.9)',
                  },
                ],
              }} />
          </MDBox>
        </Grid>
        ))}
        </Grid>
        </MDBox>
            <MDBox>
              {/*<Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
                  <Projects />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <OrdersOverview />
                </Grid>
            </Grid>*/}
            </MDBox></>}
          </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
