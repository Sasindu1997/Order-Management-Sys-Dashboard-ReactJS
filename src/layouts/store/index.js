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
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/orders/data/authorsTableData";
import projectsTableData from "layouts/orders/data/projectsTableData";
import { Button } from "@mui/material";

function Store() {
    const { columns, rows } = authorsTableData();
    const { columns: pColumns, rows: pRows } = projectsTableData();

    const handleClick = () => {

    }

    return ( <
        DashboardLayout >
        <
        DashboardNavbar / >
        <
        MDBox pt = { 6 }
        pb = { 3 } >
        <
        Grid container spacing = { 3 } >
        <
        Grid item xs = { 12 }
        md = { 6 }
        lg = { 3 } >
        <
        MDBox mb = { 1.5 } >
        <
        ComplexStatisticsCard color = "dark"
        icon = "weekend"
        title = "Bookings"
        count = { 281 }
        percentage = {
            {
                color: "success",
                amount: "+55%",
                label: "than lask week",
            }
        }
        onClickCard = {
            () => handleClick }
        /> <
        /MDBox> <
        /Grid> <
        Grid item xs = { 12 }
        md = { 6 }
        lg = { 3 } >
        <
        MDBox mb = { 1.5 } >
        <
        ComplexStatisticsCard icon = "leaderboard"
        title = "Today's Users"
        count = "2,300"
        percentage = {
            {
                color: "success",
                amount: "+3%",
                label: "than last month",
            }
        }
        /> <
        /MDBox> <
        /Grid> <
        Grid item xs = { 12 }
        md = { 6 }
        lg = { 3 } >
        <
        MDBox mb = { 1.5 } >
        <
        ComplexStatisticsCard color = "success"
        icon = "store"
        title = "Revenue"
        count = "34k"
        percentage = {
            {
                color: "success",
                amount: "+1%",
                label: "than yesterday",
            }
        }
        /> <
        /MDBox> <
        /Grid> <
        Grid item xs = { 12 }
        md = { 6 }
        lg = { 3 } >
        <
        MDBox mb = { 1.5 } >
        <
        ComplexStatisticsCard color = "primary"
        icon = "person_add"
        title = "Followers"
        count = "+91"
        percentage = {
            {
                color: "success",
                amount: "",
                label: "Just updated",
            }
        }
        /> <
        /MDBox> <
        /Grid> <
        /Grid> <
        /MDBox> <
        Footer / >
        <
        /DashboardLayout>
    );
}

export default Store;