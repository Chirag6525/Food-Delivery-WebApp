"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import React, { useEffect, useState } from "react";

const Page = (props) => {
	const name = props.params.name;
	const [restaurantDetails, setRestaurantDetails] = useState();
	const [foodItems, setFoodItems] = useState([]);
	const [cartData, setCartData] = useState();
	const [cartStorage, setCartStorage] = useState(
		JSON.parse(localStorage.getItem("cart"))
	);
	const [cartId, setCartId] = useState(
		cartStorage
			? () =>
					cartStorage.map((item) => {
						return item._id;
					})
			: []
	);
	const [removeCartData, setremoveCartData] = useState();
	useEffect(() => {
		loadRestaurantDetails();
	}, []);
	const addToCart = (item) => {
		setCartData(item);
		let localCartId = cartId;
		localCartId.push(item._id);
		setCartId(localCartId);
		setremoveCartData()
	};
	console.log(cartId);
	
	const loadRestaurantDetails = async () => {
		const id = props.searchParams.id;
		console.log(id);
		let response = await fetch("http://localhost:3000/api/customer/" + id);
		response = await response.json();

		if (response.success) {
			setRestaurantDetails(response.details);
			setFoodItems(response.foodItems);
		}
	};
	

	return (
		<div className="bg-[url('https://wallpaperaccess.com/full/1537562.png')] flex-col justify-center items-center h-screen bg-cover">
			<CustomerHeader
				cartData={cartData}
				removeCartData={removeCartData}
			/>
			<div className="flex justify-center items-center p-5 font-bold text-6xl">
				{decodeURI(name)}
			</div>
			<div className="text-black flex justify-between items-center bg-yellow-600 rounded-xl p-5">
				<div>Contact:{restaurantDetails?.contact}</div>
				<div>City:{restaurantDetails?.city}</div>
				<div>Address:{restaurantDetails?.address}</div>
				<div>Email:{restaurantDetails?.email}</div>
			</div>
			<div className="">
				{foodItems.length > 0 ? (
					foodItems.map((item) => (
						<div>
							<div className="text-black flex items-center justify-between p-3 bg-white">
								<img
									src={item.img_path}
									className="w-[13rem]"
								/>
								<div>{item.name}</div>
								<div>{item.price}</div>
								<div>{item.desc}</div>
								{cartId.includes(item._id) ? (
									<button
										onClick={() => removeFromCart(item._id)}
										className="border-black border-2 rounded-md bg-red-600 px-3 m-2 cursor-pointer"
									>
										Remove from Cart
									</button>
								) : (
									<button
										onClick={() => addToCart(item)}
										className="border-black border-2 rounded-md bg-green-600 px-3 m-2 cursor-pointer"
									>
										Add to Cart
									</button>
								)}
							</div>
							<div className="border-2 border-black"></div>
						</div>
					))
				) : (
					<div>No Food Item available</div>
				)}
			</div>
			<RestaurantFooter />
		</div>
	);
};

export default Page;
