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

/** 
  All of the routes for the Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Users from "layouts/users";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import Orders from "layouts/orders";
import Products from "layouts/products";
import Materials from "layouts/users copy";
import Store from "layouts/store";
import Customers from "layouts/customers";
import Expenses from "layouts/expenses";
import Settings from "layouts/settings";
import Categories from "layouts/categories";
import SubCategories from "layouts/subCategories";
import ProductStock from "layouts/store/users";
import Chemicals from "layouts/users copy 2";
import ScanPage from "layouts/Scanning";
import Delivery from "layouts/users copy 3";
import Invoice from "layouts/invoice"; 
import Incomes from "layouts/expenses copy"; 
import UtilityExpenses from "layouts/expenses copy 2"; 



// @mui icons
import Icon from "@mui/material/Icon";
import StoreIcon from '@mui/icons-material/Store';

const routes = [{
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize = "small" > dashboard </Icon>,
        route: "/dashboard",
        component: <Dashboard /> ,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Store",
        key: "store ",
        icon: <StoreIcon fontSize = "small">  inventory </StoreIcon>,
        route: "/stocks",
        component: <Store /> ,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Orders",
        key: "orders",
        icon: <Icon fontSize = "small" > add_shopping_cart </Icon>,
        route: "/orders",
        component: <Orders /> ,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Products",
        key: "products",
        icon: <Icon fontSize = "small" > store_front </Icon>,
        route: "/products",
        component: <Products /> ,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Materials",
        key: "materials",
        icon: <Icon fontSize = "small" > shape_line </Icon>,
        route: "/materials",
        component: <Materials /> ,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Chemicals",
        key: "chemicals",
        icon: <Icon fontSize = "small" > science </Icon>,
        route: "/chemicals",
        component: <Chemicals /> ,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Customers",
        key: "customers",
        icon: <Icon fontSize = "small" > supervised_user_circle </Icon>,
        route: "/customers",
        component: <Customers /> ,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Users",
        key: "users",
        icon: <Icon fontSize = "small" > manage_accounts </Icon>,
        route: "/users",
        component: <Users /> ,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Expenses",
        key: "expenses",
        icon: <Icon fontSize = "small" > money </Icon>,
        route: "/expenses",
        component: <Expenses /> ,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Incomes",
        key: "incomes",
        icon: <Icon fontSize = "small" > price_check </Icon>,
        route: "/incomes",
        component: <Incomes /> ,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Utility Expenses",
        key: "utilityExpenses",
        icon: <Icon fontSize = "small" > receipt_long </Icon>,
        route: "/utilityExpenses",
        component: <UtilityExpenses /> ,
        isVisible: true
    },
    // {
    //     type: "collapse",
    //     name: "Tables",
    //     key: "tables",
    //     icon: <Icon fontSize = "small" > table_view </Icon>,
    //     route: "/tables",
    //     component: <Tables /> ,
    //isVisible: true
  // },
    // {
    //     type: "collapse",
    //     name: "Billing",
    //     key: "billing",
    //     icon: <Icon fontSize = "small" > receipt_long </Icon>,
    //     route: "/billing",
    //     component: <Billing /> ,
    //isVisible: true
  
  // },
    // {
    //     type: "collapse",
    //     name: "RTL",
    //     key: "rtl",
    //     icon: <Icon fontSize = "small" > format_textdirection_r_to_l </Icon>,
    //     route: "/rtl",
    //     component: <RTL /> ,
    //isVisible: true
  
  // },
    // {
    //     type: "collapse",
    //     name: "Notifications",
    //     key: "notifications",
    //     icon: <Icon fontSize = "small" > notifications </Icon>,
    //     route: "/notifications",
    //     component: <Notifications /> ,
    //isVisible: true
  
  // },
    // {
    //     type: "collapse",
    //     name: "Profile",
    //     key: "profile",
    //     icon: <Icon fontSize = "small" > person </Icon>,
    //     route: "/profile",
    //     component: <Profile /> ,
    //isVisible: true
  
  // },
    {
        type: "collapse",
        name: "Sign In",
        key: "sign-in",
        icon: <Icon fontSize = "small" > login </Icon>,
        route: "/authentication/sign-in",
        component: <SignIn /> ,
        isVisible: false
    },
    {
        type: "collapse",
        name: "Sign Up",
        key: "sign-up",
        icon: <Icon fontSize = "small" > assignment </Icon>,
        route: "/authentication/sign-up",
        component: <SignUp /> ,
        isVisible: false
    },
    {
        type: "collapse",
        name: "Settings",
        key: "sign-up",
        icon: <Icon fontSize = "small" > settings </Icon>,
        route: "/settings",
        component: <Settings /> ,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Categories",
        key: "sign-up",
        icon: <Icon fontSize = "small" > assignment </Icon>,
        route: "/settings/categories",
        component: <Categories /> ,
        isVisible: false
    },
    {
        type: "collapse",
        name: "Sub Categories",
        key: "sign-up",
        icon: <Icon fontSize = "small" > assignment </Icon>,
        route: "/settings/subcategories",
        component: <SubCategories />,
        isVisible: false
    },
    {
        type: "collapse",
        name: "product-stock",
        key: "product-stock",
        route: `/stocks/product-stock/:id`,
        component: <ProductStock />,
        isVisible: false
    },
    {
        type: "collapse",
        name: "barcodescanner",
        key: "barcodescanner",
        route: `/barcodescanner`,
        icon: <Icon fontSize = "small" > qr_code_scanner </Icon>,
        component: <ScanPage />,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Delivey Account",
        key: "DeliveyAccount",
        route: `/deliveyAccount`,
        icon: <Icon fontSize = "small" > local_shipping </Icon>,
        component: <Delivery />,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Invoices",
        key: "Invoices",
        route: `/invoices`,
        icon: <Icon fontSize = "small" > receipt </Icon>,
        component: <Invoice />,
        isVisible: true
    },
    {
        type: "collapse",
        name: "Reports",
        key: "Reports",
        route: `/reports`,
        icon: <Icon fontSize = "small" > assessment</Icon>,
        component: <Invoice />,
        isVisible: true
    },
];

export default routes;