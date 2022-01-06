import React from "react";
import {Route, Switch, useRouteMatch, Link } from 'react-router-dom'; 

import NewProduct from "../Product/NewProduct/NewProduct";
import UpdateProduct from "../Product/UpdateProduct/UpdateProduct"
import Inventory from "../Inventory/Inventory";
import Payment from "../Payment/Payment";
import Account from "../Account/Account";
import NavBar from "../../UI/NavBar/NavBar";
import ManageProductMenu from "../Product/ManageProductMenu";

import styles from './AdminDashboard.module.css';
import { withRouter } from "react-router";
import DeleteProduct from "../Product/DeleteProduct/DeleteProduct";

const AdminDashboard = (props) =>{
    let { path, url } = useRouteMatch();
    const navbar = [
        {
            id_num:1,
            id: "manage-products",
            path: '/manage-products',
            li: "Manage Products",
        },
        {
            id_num:2,
            id: "manage-inventory",
            path: '/manage-inventory',
            li: "Manage Inventory",
        },
        {
            id_num:3,
            id: "manage-payments",
            path: '/manage-payments',
            li: "Manage Payments",
        },
        {
            id_num:4,
            id: "manage-accounts",
            path: '/manage-accounts',
            li: "Manage Accounts",
        },
    ]

return(   

            <div className={`${styles.container}`}>
                <NavBar/>
                <Switch>
                    <Route exact path={["/dashboard", "/dashboard/manage-products"]}>
                        <ManageProductMenu/>
                    </Route>
                        <Route exact path={["/dashboard/manage-products/add-product", "/dashboard/add-product"]}>
                            <NewProduct></NewProduct>
                        </Route>
                        <Route exact path={["/dashboard/manage-products/update-product", "/dashboard/update-product"]}>
                            <UpdateProduct/>
                        </Route>
                        <Route exact path={["/dashboard/manage-products/delete-product", "/dashboard/delete-product"]}>
                             <Inventory/>
                        </Route>
                    <Route exact path="/dashboard/manage-payments">
                        <Payment/>
                    </Route>
                    <Route exact path="/dashboard/manage-accounts">
                        <Account/>
                    </Route>
                </Switch>
            </div>
)
}

export default withRouter(AdminDashboard);