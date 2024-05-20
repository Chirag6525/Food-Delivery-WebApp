'use client'
import React from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import UserSignup from "../_components/UserSignup";

const UserAuth = () => {
    return <div>
        <CustomerHeader />
        <div>

        <UserSignup/>
        </div>
        <RestaurantFooter/>
            </div>;
};

export default UserAuth;
