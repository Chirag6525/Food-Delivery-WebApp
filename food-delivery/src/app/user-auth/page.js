"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import UserSignup from "../_components/UserSignup";
import UserLogin from "../_components/UserLogin";

const UserAuth = (props) => {
	const [login, setLogin] = useState(true);
	return (
		<div>
			<CustomerHeader />
			<div>
				{login ? (
					<UserLogin redirect={props.searchParams} />
				) : (
					<UserSignup redirect={props.searchParams} />
				)}
				<div className="justify-center flex items-center pt-3">
					<button onClick={() => setLogin(!login)}>
						{login
							? "Do not have account? Signup"
							: "Already have an account? Login"}
					</button>
				</div>
			</div>

			<RestaurantFooter />
		</div>
	);
};

export default UserAuth;
