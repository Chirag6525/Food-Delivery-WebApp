import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import { restaurantSchema } from "../lib/restaurantsModel";

const RestaurantSignup = () => {
	const [email, setEmail] = useState("");
	const [password, setPasssword] = useState("");
	const [c_password, setc_password] = useState("");
	const [name, setName] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");
	const [contact, setContact] = useState("");
	const router = useRouter();
	const [error, setError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const handleSignup = async () => {
		if (password !== c_password) {
			setPasswordError(true);
		} else {
			setPasswordError(false);
		}
		if (
			!email ||
			!password ||
			!c_password ||
			!name ||
			!city ||
			!address ||
			!contact
		) {
			setError(true);
			return false;
		} else {
			setError(false);
		}
		console.log(email, password, c_password, name, city, address, contact);
		let response = await fetch("http://localhost:3000/api/restaurant", {
			method: "POST",
			body: JSON.stringify({ email, password, name, city, address, contact }),
		});
		response = await response.json();
		console.log(response);
		if (response.success) {
			// alert("Successfully Registered");
			const { result } = response;
			delete result.password;
			localStorage.setItem("restaurantUser", JSON.stringify(result));
			router.push("/restaurant/dashboard");
		}
	};
	return (
		<div className="flex items-center justify-center">
			<div className="max-w-md w-full sapce-y-8">
				<div className="mt-6 text-center text-3xl">Signup Page</div>
				<div className="mt-2">
					<div className="">
						<input
							className="input-field mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Enter Email id"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
						{error && !email && (
							<span className="items-align justify-center text-red-600 px-8">
								Please Enter Email
							</span>
						)}
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="password"
							placeholder="Enter Password"
							value={password}
							onChange={(event) => setPasssword(event.target.value)}
						/>
						{(error && !password) && (
							<span className="flex items-align justify-center text-red-600 px-8">
								Please Enter Valid Password
							</span>
						)}
						{passwordError && (
							<span className="flex items-align justify-center text-red-600 px-8">
								Password and confirm Password not Match
							</span>
						)}
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="password"
							placeholder="Confirm Password"
							value={c_password}
							onChange={(event) => setc_password(event.target.value)}
						/>
						{error && !c_password && (
							<span className="flex items-align justify-center text-red-600 px-8">
								Please Enter Password
							</span>
						)}
						{passwordError && (
							<span className="flex items-align justify-center text-red-600 px-8">
								Password and confirm Password not Match
							</span>
						)}
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Enter Restaurant Name"
							value={name}
							onChange={(event) => setName(event.target.value)}
						/>
						{error && !name && (
							<span className="items-align justify-center text-red-600 px-8">
								Please Enter Name
							</span>
						)}
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Enter City"
							value={city}
							onChange={(event) => setCity(event.target.value)}
						/>
						{error && !city && (
							<span className="items-align justify-center text-red-600 px-8">
								Please Enter City
							</span>
						)}
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Enter Full Address"
							value={address}
							onChange={(event) => setAddress(event.target.value)}
						/>
						{error && !address && (
							<span className="items-align justify-center text-red-600 px-8">
								Please Enter Address
							</span>
						)}
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Enter Mobile Number"
							value={contact}
							onChange={(event) => setContact(event.target.value)}
						/>
						{error && !contact && (
							<span className="items-align justify-center text-red-600 px-8">
								Please Enter Contact
							</span>
						)}
					</div>
				</div>
				<div className="mt-4 flex justify-center items-center">
					<button
						className="group relative border-2  rounded-lg px-10 py-3 bg-blue-600"
						onClick={handleSignup}
					>
						SignUp
					</button>
				</div>
			</div>
		</div>
	);
};

export default RestaurantSignup;
