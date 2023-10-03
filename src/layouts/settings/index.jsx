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
import { useNavigate } from "react-router-dom";

function Settings() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const navigate = useNavigate();

  const handleClickCategories = () => {
    navigate("/settings/categories");
  }

  const handleClickSubCategories = () => {
      navigate("/settings/subcategories");
  }

  const handleClickSmsTexts = () => {
    navigate("/settings/smstext");
  }

  const handleClickIncomeStream = () => {
    navigate("/settings/incomeStream");
  }

  const handleClickExpenseStream = () => {
    navigate("/settings/expenseStream");
  }


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
      <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="category"
                title="Categories"
                onClickCard={handleClickCategories}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="apps"
                title="Sub Categories"
                onClickCard={handleClickSubCategories}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="sms"
                color="warning"
                title="SMS Texts"
                onClickCard={handleClickSmsTexts}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="price_check"
                color="success"
                title="Income Streams"
                onClickCard={handleClickIncomeStream}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="money"
                color="primary"
                title="Expense Streams"
                onClickCard={handleClickExpenseStream}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Settings;