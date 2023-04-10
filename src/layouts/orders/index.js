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

// Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/orders/data/authorsTableData";
import projectsTableData from "layouts/orders/data/projectsTableData";

import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Label } from "@mui/icons-material";

function Orders() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => { }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center" onClick={handleClickOpen}>
              <MDTypography variant="h6" fontWeight="medium"></MDTypography>
              <MDButton variant="gradient" color="dark" >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;Add New Order
              </MDButton>
            </MDBox>
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
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Order</DialogTitle>
      

        <DialogContent>
          
        <MDTypography variant="h8" color="black">
           Select Product *
          </MDTypography>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{width: 530}}
          // value={age}
          label="Product"
          onChange={handleChange}
        >
          <MenuItem value={10}>Product 1</MenuItem>
          <MenuItem value={20}>Product 2</MenuItem>
          <MenuItem value={30}>Product 3</MenuItem>
        </Select>

        </DialogContent>

        <DialogContent>
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            label="Customer Name"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Payment Method"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Billing Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Notes"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Orders;
