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
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import './style.A4.css';
import './style.css';
import './style.USLetter.css';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import moment from 'moment';

// Data
import {SDK} from "../../api/index";

import { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Invoice({orderDataSelectedArr}) {
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackSeverity, setSnackSeverity] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [userId, setUserId] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [recordId, setRecordId] = React.useState(false);
  const [userData, setUserData] = useState([]);
  const [oneInvoiceData, setOneInvoiceData] = useState(false);
  const [invoiceData, setInvoiceData] = useState(orderDataSelectedArr || []);

  const [state, setState] = React.useState({
    opens: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, opens } = state;
  const [openConformDelete, setOpenConformDelete] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  useEffect(() => {
    console.log("hereeeeeeeeeeee", orderDataSelectedArr)
    setInvoiceData(orderDataSelectedArr)
  }, [])

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
      id: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
        {user.id || "-"}
      </MDTypography>),
      name: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
        {user.name  || "-"}
      </MDTypography>),
      code: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
      {user.code  || "-"}
      </MDTypography>),
      unitPrice: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
          {user.unitPrice  || "-"}
      </MDTypography>),
      supplier: ( <MDTypography component="span" href="#" variant="caption" color="text" fontWeight="medium">
        {user.supplier  || "-"}
      </MDTypography>),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={`${user.isActive}` || false} color={user.isActive ? "success" : "warning"} variant="gradient" size="sm" />
        </MDBox>
      ),
  }));

  const printDocument = async () => {
    htmlToImage.toPng(document.getElementById('divToPrint'), { quality: 0.95 })
      .then(function (dataUrl) {
        const pdf = new jsPDF('p', 'mm');
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        var imgWidth = pdfWidth;
        var imgHeight = pdfHeight;

        var pageHeight = pdf.internal.pageSize.getHeight();

        var position = 0;
        var remainingHeight = imgHeight;

        while (remainingHeight > 0) {
          pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
          remainingHeight -= pageHeight;
          if (remainingHeight > 0) {
            pdf.addPage();
            position -= pageHeight; // Adjust position for the next page
          }
        }
        pdf.save('file.pdf');
      });
    }

  return (
    <DashboardLayout>
      <div className="mb5">
        <MDBox px={2} display="flex" justifyContent="space-between" alignItems="center" onClick={printDocument}>
                  <MDTypography variant="h6" fontWeight="medium"></MDTypography>
                  <MDButton variant="gradient" color="dark" >
                    <Icon sx={{ fontWeight: "bold", pr: 3, pb: 2 }}>save</Icon>
                    &nbsp;&nbsp;Print Invoices
                  </MDButton>
              </MDBox>
      </div>
      <div id="divToPrint" >
          {invoiceData.map(data => (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {console.log(data)}
              {data[0] !== null && data[0] !== undefined && data[0] !== {} &&<Grid item xs={6}>
                <Item class="border">
                  <div>
                    <div class="parent parent-invoice-logo-type">
                        <span class="invoice-type child">
                            {`INVOICE: ${data[0]?.invoiceNumber}`}
                        </span>
                        
                        <img class="invoice-logo child" src="logo.jpg" alt="" width="100" height="100"/>
                    </div>
                        <div class="invoice-tracking">
                        <span>
                            {` Tracking No: ${data[0]?.trackingNumber}`}
                        </span>
                        </div>
                    <div class="parent parent-invoice-table-address">
                        <table class="child invoice-table-address" >
                            <tr class="table-addresses">
                                <th>FROM</th>
                                <th>SHIP TO</th>
                            </tr>
                            <tr class="temp" >
                                <td>La Rocher Ceylon pvt ltd</td>
                                <td>{data[0]?.cfullName}</td>
                            </tr>
                            <tr>
                                <td>Hot line : 071-1752090</td>
                                <td class="table-phone">{data[0]?.cphone.split(/,/g)[0]}</td>
                            </tr>
                            <tr>
                            <td>www.larocherceylon.com</td>
                            <td>{data[0]?.caddress.replace(/,/g , ', ')}</td>
                            </tr>
                            <tr>
                                <td>larocherbeauty@gmail.com</td>
                                <td>{data[0]?.cdistrict}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>{data[0]?.cemail}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>{data[0]?.cemail}</td>
                            </tr>
                        </table>
                    </div>

                    <div class="parent parent-invoice-table">
                        <table class="invoice-table" >
                            <tr class="table-row-border">
                                <th class="table-row-border-product">Product</th>
                                <th>QTY</th>
                                <th>PRICE</th>
                            </tr>
                            {data[0]?.productData?.map(pr => (<tr>
                                <td class="table-row-border-product">{pr.pName}</td>
                                <td>{pr.ocount}</td>
                                <td>{parseFloat(pr.pprice)}</td>
                            </tr>))}
                        </table>
                    </div>

                    <div class="parent  parent-invoice-total">
                        <span class="invoice-total-text child">
                            TOTAL
                        </span>

                        <span class="invoice-total child">
                            LKR : {data[0]?.total.toFixed(2)}
                        </span>
                       
                    </div>
                  </div>
                </Item>
              </Grid>}
              {data[1] !== null && data[1] !== undefined && data[1] !== {} && <Grid item xs={6}>
              <Item class="border">
                <div>
                  <div class="parent parent-invoice-logo-type">
                      <span class="invoice-type child">
                          {`INVOICE: ${data[1]?.invoiceNumber}`}
                      </span>
                      
                      <img class="invoice-logo child" src="logo.jpg" alt="" width="100" height="100"/>
                  </div>
                      <div class="invoice-tracking">
                      <span>
                          {` Tracking No: ${data[1]?.trackingNumber}`}
                      </span>
                      </div>
                  <div class="parent parent-invoice-table-address">
                      <table class="child invoice-table-address" >
                          <tr class="table-addresses">
                              <th>FROM</th>
                              <th>SHIP TO</th>
                          </tr>
                          <tr class="temp" >
                              <td>La Rocher Ceylon pvt ltd</td>
                              <td>{data[1]?.cfullName}</td>
                          </tr>
                          <tr>
                              <td>Hot line : 071-1752090</td>
                              <td class="table-phone">{data[1]?.cphone.split(/,/g)[0]}</td>
                          </tr>
                          <tr>
                          <td>www.larocherceylon.com</td>
                          <td>{data[1]?.caddress.replace(/,/g , ', ')}</td>
                          </tr>
                          <tr>
                              <td>larocherbeauty@gmail.com</td>
                              <td>{data[1]?.cdistrict}</td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>{data[1]?.cemail}</td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>{data[1]?.cemail}</td>
                          </tr>
                      </table>
                  </div>

                  <div class="parent parent-invoice-table">
                      <table class="invoice-table" >
                          <tr class="table-row-border">
                              <th class="table-row-border-product">Product</th>
                              <th>QTY</th>
                              <th>PRICE</th>
                          </tr>
                          {data[1]?.productData?.map(pr => (<tr>
                              <td class="table-row-border-product">{pr.pName}</td>
                              <td>{pr.ocount}</td>
                              <td>{parseFloat(pr.pprice)}</td>
                          </tr>))}
                      </table>
                  </div>

                  <div class="parent  parent-invoice-total">
                      <span class="invoice-total-text child">
                          TOTAL
                      </span>

                      <span class="invoice-total child">
                          LKR : {data[1]?.total.toFixed(2)}
                      </span>
                     
                  </div>
                </div>
              </Item>
            </Grid>}
              {data[2] !== null && data[2] !== undefined && data[2] !== {} && <Grid item xs={6}>
              <Item class="border">
                <div>
                  <div class="parent parent-invoice-logo-type">
                      <span class="invoice-type child">
                          {`INVOICE: ${data[2]?.invoiceNumber}`}
                      </span>
                      
                      <img class="invoice-logo child" src="logo.jpg" alt="" width="100" height="100"/>
                  </div>
                      <div class="invoice-tracking">
                      <span>
                          {` Tracking No: ${data[2]?.trackingNumber}`}
                      </span>
                      </div>
                  <div class="parent parent-invoice-table-address">
                      <table class="child invoice-table-address" >
                          <tr class="table-addresses">
                              <th>FROM</th>
                              <th>SHIP TO</th>
                          </tr>
                          <tr class="temp" >
                              <td>La Rocher Ceylon pvt ltd</td>
                              <td>{data[2]?.cfullName}</td>
                          </tr>
                          <tr>
                              <td>Hot line : 071-1752090</td>
                              <td class="table-phone">{data[2]?.cphone.split(/,/g)[0]}</td>
                          </tr>
                          <tr>
                          <td>www.larocherceylon.com</td>
                          <td>{data[2]?.caddress.replace(/,/g , ', ')}</td>
                          </tr>
                          <tr>
                              <td>larocherbeauty@gmail.com</td>
                              <td>{data[2]?.cdistrict}</td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>{data[2]?.cemail}</td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>{data[2]?.cemail}</td>
                          </tr>
                      </table>
                  </div>

                  <div class="parent parent-invoice-table">
                      <table class="invoice-table" >
                          <tr class="table-row-border">
                              <th class="table-row-border-product">Product</th>
                              <th>QTY</th>
                              <th>PRICE</th>
                          </tr>
                          {data[2]?.productData?.map(pr => (<tr>
                              <td class="table-row-border-product">{pr.pName}</td>
                              <td>{pr.ocount}</td>
                              <td>{parseFloat(pr.pprice)}</td>
                          </tr>))}
                      </table>
                  </div>

                  <div class="parent  parent-invoice-total">
                      <span class="invoice-total-text child">
                          TOTAL
                      </span>

                      <span class="invoice-total child">
                          LKR : {data[2]?.total.toFixed(2)}
                      </span>
                     
                  </div>
                </div>
              </Item>
            </Grid>}
              {data[3] !== null && data[3] !== undefined && data[3] !== {} && <Grid item xs={6}>
              <Item class="border">
                <div>
                  <div class="parent parent-invoice-logo-type">
                      <span class="invoice-type child">
                          {`INVOICE: ${data[3]?.invoiceNumber || '000000'}`}
                      </span>
                      
                      <img class="invoice-logo child" src="logo.jpg" alt="" width="100" height="100"/>
                  </div>
                      <div class="invoice-tracking">
                      <span>
                          {` Tracking No: ${data[3]?.trackingNumber}`}
                      </span>
                      </div>
                  <div class="parent parent-invoice-table-address">
                      <table class="child invoice-table-address" >
                          <tr class="table-addresses">
                              <th>FROM</th>
                              <th>SHIP TO</th>
                          </tr>
                          <tr class="temp" >
                              <td>La Rocher Ceylon pvt ltd</td>
                              <td>{data[3]?.cfullName}</td>
                          </tr>
                          <tr>
                              <td>Hot line : 071-1752090</td>
                              <td class="table-phone">{data[3]?.cphone.split(/,/g)[0]}</td>
                          </tr>
                          <tr>
                          <td>www.larocherceylon.com</td>
                          <td>{data[3]?.caddress.replace(/,/g , ', ')}</td>
                          </tr>
                          <tr>
                              <td>larocherbeauty@gmail.com</td>
                              <td>{data[3]?.cdistrict}</td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>{data[3]?.cemail}</td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>{data[3]?.cemail}</td>
                          </tr>
                      </table>
                  </div>

                  <div class="parent parent-invoice-table">
                      <table class="invoice-table" >
                          <tr class="table-row-border">
                              <th class="table-row-border-product">Product</th>
                              <th>QTY</th>
                              <th>PRICE</th>
                          </tr>
                          {data[3]?.productData?.map(pr => (<tr>
                              <td class="table-row-border-product">{pr.pName}</td>
                              <td>{pr.ocount}</td>
                              <td>{parseFloat(pr.pprice)}</td>
                          </tr>))}
                      </table>
                  </div>

                  <div class="parent  parent-invoice-total">
                      <span class="invoice-total-text child">
                          TOTAL
                      </span>

                      <span class="invoice-total child">
                          LKR : {data[3]?.total.toFixed(2)}
                      </span>
                     
                  </div>
                </div>
              </Item>
            </Grid>}
            </Grid>
          ))
        }
    {/*<div>
      <header className="headerStart">
        <div class="headerSection1">
          <div class="logoAndName">
              <img src='logo.jpg' alt="larocher" width="50" style={{width: '20%'}}
                height="100"/>
            <div class="logoAnd">
              <h1>La Rocher Ceylon pvt ltd</h1>
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
          <a>
            http://www.larocherceylon.com
          </a>
          <a>
            larocherbeauty@gmail.com / 
            larocherceylon@gmail.com
          </a>
          <span>
            Hot line - 0711 752 090 / 0777 284 644
          </span>
          <span>
            83/1/1, Pagoda, Nugegoda. 
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
              Please make payment on delivery.
            </p>
          </div>
          <div>
            <b>Payment Options</b>
            <ul>
              <li>Cash On Delivery</li>
              <li>Bank Transfer</li>
              <li>One Pay ( Master / Visa / Amex)</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>*/}
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
