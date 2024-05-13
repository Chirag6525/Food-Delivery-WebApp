"use client";
import React, { useState } from "react";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantFooter from "../_components/RestaurantFooter";

const Restaurant = () => {
	const [login, setlogin] = useState(true);
	return (
		<div>
			<RestaurantHeader />
			<div className="mt-6 flex justify-center items-center text-3xl font-bold">
				Restaurant Login/SignUp page
			</div>
			<div className="flex justify-center items-center">
				<div>
					{login ? <RestaurantLogin /> : <RestaurantSignup />}
					<div className="text-blue-600 text-sm mt-3 justify-center flex items-center">
						<button onClick={() => setlogin(!login)}>
							{login
								? "Don't have an account? Signup"
								: "Already have Account? Login"}
						</button>
					</div>
				</div>
            </div>
            <RestaurantFooter/>
		</div>
	);
};

export default Restaurant;
