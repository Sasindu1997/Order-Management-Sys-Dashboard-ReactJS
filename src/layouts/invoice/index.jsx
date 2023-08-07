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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './style.A4.css';
import './style.USLetter.css';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { jsPDF } from "jspdf";
// Data
import {SDK} from "../../api/index";

import { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Invoice() {
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackSeverity, setSnackSeverity] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [userId, setUserId] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [recordId, setRecordId] = React.useState(false);
  const [userData, setUserData] = useState([]);
  const [state, setState] = React.useState({
    opens: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, opens } = state;
  const [openConformDelete, setOpenConformDelete] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // useEffect(() => {
    // SDK.InvoiceType.getAll()
    // .then((res) => {
    //   console.log("RES: ", res);
    //   setUserData(res?.data)
    // })
    // .catch((error) => {
    //   console.log("Error: ", error);
    //   setSnackSeverity('error');
    //   setMessage('Error!');
    //   setOpenSnack(true);
    // })
  // }, [open, openConformDelete, openUpdate])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenConformDelete = () => {
    setOpenConformDelete(true);
  };

  const handleCloseConformDelete = () => {
    setOpenConformDelete(false);
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

  const handleCloseOpenUpdate = (state, msg) => {
    console.log("here 2")
    setOpenUpdate(state);
    setSnackSeverity(msg == 'success' ? 'success' : 'error');
    setMessage(msg == 'success' ? 'Record Updated Sucessfully!' : 'Error In Record Update!');
    setOpenSnack(true);
    // window.location.reload();
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
    setOpenConformDelete(true);
    setRecordId(id);
    // id && SDK.UserType.deletebyId(id)
    // .then((res) => {
    //   console.log("RES: ", res);
    //   window.location.reload();
    // })
    // .catch((error) => {
    //   console.log("Error: ", error)
    // })
  }

  // const handleConformDelete = () => {
  //   recordId && SDK.InvoiceType.deletebyId(recordId)
  //   .then((res) => {
  //     console.log("RES: ", res);
  //     setOpenConformDelete(false);
  //     setSnackSeverity('success');
  //     setMessage('Record Deleted Sucessfully!');
  //     setOpenSnack(true);
  //   })
  //   .catch((error) => {
  //     setOpenConformDelete(false);
  //     console.log("Error: ", error);
  //     setSnackSeverity('error');
  //     setMessage('Error In Record Deletion!');
  //     setOpenSnack(true);
  //   })
  // };

  const columns = [
    { Header: "id", accessor: "id", width: "5%", align: "left" },
      { Header: "name", accessor: "name",  align: "left" },
      { Header: "code", accessor: "code", align: "left" },
      { Header: "unitPrice", accessor: "unitPrice", align: "left" },
      { Header: "supplier", accessor: "supplier", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", width: "8%", align: "center" },
    ]

  
    const rows = userData?.map((user) =>  ({
      id: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {user.id || "-"}
      </MDTypography>),
      name: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {user.name  || "-"}
      </MDTypography>),
      code: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      {user.code  || "-"}
      </MDTypography>),
      unitPrice: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.unitPrice  || "-"}
      </MDTypography>),
      supplier: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {user.supplier  || "-"}
      </MDTypography>),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={`${user.isActive}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
        </MDBox>
      ),
  }));

  const printDocument = () => {
    htmlToImage.toPng(document.getElementById('divToPrint'), { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          const pdf = new jsPDF();
          const imgProps= pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth() / 2;
          const pdfHeight = ((imgProps.height * pdfWidth) / imgProps.width);
          pdf.addImage(dataUrl, 'PNG', 0, 0,pdfWidth, pdfHeight);
          pdf.save("download.pdf"); 
        });
    }

  return (
    <DashboardLayout>
    <DashboardNavbar />
    <div className="mb5">
        <button onClick={printDocument}>Print</button>
      </div>
    <div id="divToPrint">
      <header className="headerStart">
        <div class="headerSection">
          <div class="logoAndName">
              <img src='logo.jpg' alt="larocher" width="100" style={{width: '30%'}}
                height="100"/>
            <div class="logoAnd">
              <h1>La Rocher</h1>
            </div>
          </div>
          <div class="invoiceDetails">
            <h2>Invoice #100</h2>
            <p>
              07 March 2021
            </p>
          </div>
        </div>
        <hr />
        <div class="headerSection">
          <div>
            <h3>Invoice to</h3>
            <p>
              <b>Client Name</b>
              <br />
              123 Alphabet Road, Suite 01
              <br />
              Indianapolis, IN 46260
              <br />
              <a href="mailto:clientname@clientwebsite.com">
                clientname@clientwebsite.com
              </a>
              <br />
              317.123.8765
            </p>
          </div>
          <div>
            <h3>Due Date</h3>
            <p>
              <b>07 April 2021</b>
            </p>
            <h3>Amount</h3>
            <p>
              <b>$3,500</b>
            </p>
          </div>
        </div>
      </header>
      
      <footer>
          <a href="https://companywebsite.com">
            companywebsite.com
          </a>
          <a href="mailto:company@website.com">
            company@website.com
          </a>
          <span>
            317.123.8765
          </span>
          <span>
            123 Alphabet Road, Suite 01, Indianapolis, IN 46260
          </span>
      </footer>
      
      <main>
        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Item Names Goes Here</b>
                <br />
                Description goes here
              </td>
              <td>
                $100
              </td>
              <td>
                4
              </td>
              <td>
                $400.00
              </td>
            </tr>
            <tr>
              <td>
                <b>Lorem Ipsum</b>
                <br />
                Description goes here
              </td>
              <td>
                $250
              </td>
              <td>
                2
              </td>
              <td>
                $500.00
              </td>
            </tr>
            <tr>
              <td>
                <b>Dolor Set Amit Caslum</b>
                <br />
                Description goes here
              </td>
              <td>
                $300
              </td>
              <td>
                1
              </td>
              <td>
                $300.00
              </td>
            </tr>
          </tbody>
        </table>
        <table class="summary">
          <tr>
            <th>
              Subtotal
            </th>
            <td>
              $1200.00
            </td>
          </tr>
          <tr>
            <th>
              Tax 4.7%
            </th>
            <td>
              $000.00
            </td>
          </tr>
          <tr class="total">
            <th>
              Total
            </th>
            <td>
              $12,000.00
            </td>
          </tr>
        </table>
      </main>
      <aside>
        <hr />
        <div>
          <div>
            <b>Terms &amp; Conditions</b>
            <p>
              Please make payment within 30 days of issue of the invoice.
            </p>
          </div>
          <div>
            <b>Payment Options</b>
            <ul>
              <li>Paypal</li>
              <li>Credit Card</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Footer />
    </DashboardLayout>
  );
}

export default Invoice;
