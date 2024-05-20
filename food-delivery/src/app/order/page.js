"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem('user')))
	const [cartStorage, setCartStorage] = useState(
		JSON.parse(localStorage.getItem("cart"))
	);
	const [total, setTotal] = useState(() =>
		cartStorage.length == 1
			? cartStorage[0].price
			: cartStorage.reduce((a, b) => {
					return a.price + b.price;
			  })
	);
	const router = useRouter()
    const [removeCartdata, setRemoveCartdata] = useState(false)
    const orderNow = async() => {
        let user_id = JSON.parse(localStorage.getItem('user'))._id
        let cart = JSON.parse(localStorage.getItem('cart'))
        let foodItemIds = cart.map((item) => item._id).toString()
        let resto_id = cart[0].resto_id
        let deliveryBoy_id = "664b6abcde8137c5ea2bcbae"
        
        
        let collection = {
					user_id,
					foodItemIds,
					resto_id,
					deliveryBoy_id,
					status: "confirm",
					amount: total + (total * TAX) / 100 + DELIVERY_CHARGES,
				};
        let response = await fetch('http://localhost:3000/api/order', {
            method: 'POST',
            body: JSON.stringify(collection)
        })
        response =await response.json()
        if (response.success) {
			alert("Order Successfull")
			setRemoveCartdata(true)
			router.push('/myprofile')
        } else {
            alert("Order Failed")
        }
        console.log(collection)
    }
	return (
		<div className="bg-[url('https://wallpaperaccess.com/full/1537562.png')] flex-col justify-center items-center h-screen bg-cover">
			<CustomerHeader removeCartdata={ removeCartdata} />

			
            <div className="flex-col pt-5 pb-2 border-b-4 border-black bg-slate-400">
               <div>User Details:</div>
				<div className="flex justify-between ml-[30%] mr-[30%] font-bold gap-10">
					<span>Name</span>
					<span>{userStorage.name}</span>
                </div>
				<div className="flex justify-between ml-[30%] mr-[30%] font-bold gap-10">
                    <span>Address</span>
					<span>{userStorage.address}</span>
                </div>
				<div className="flex justify-between ml-[30%] mr-[30%] font-bold gap-10">
                    <span>Contact</span>
					<span>{userStorage.contact}</span>
                </div>
                <div>Amount Details:</div>
				<div className="flex justify-between ml-[30%] mr-[30%] font-bold gap-10">
					<span>Food Charges :</span>
					<span>{total}</span>
				</div>
				<div className="flex justify-between ml-[30%] mr-[30%] font-bold gap-10">
					<span>Tax :</span>
					<span className="">{(total * TAX) / 100}</span>
				</div>
				<div className="flex justify-between ml-[30%] mr-[30%] font-bold gap-10">
					<span>Delivery Charges :</span>
					<span>{DELIVERY_CHARGES}</span>
				</div>
				<div className="flex justify-between ml-[30%] mr-[30%] font-bold gap-10">
					<span>Total Amount :</span>
					<span>{total + (total * TAX) / 100 + DELIVERY_CHARGES}</span>
                </div>
                <div>Payment Methods</div>
				<div className="flex justify-between ml-[30%] mr-[30%] font-bold gap-10">
					<span>Cash on Delivery</span>
					<span>{total + (total * TAX) / 100 + DELIVERY_CHARGES}</span>
				</div>
                <div onClick={orderNow}
                    className="flex justify-center items-center pt-4">
					<button className="border-black border-2 rounded-md bg-green-600 px-3 m-2 cursor-pointer ">
						ORDER NOW
					</button>
				</div>
			</div>

			<RestaurantFooter />
		</div>
	);
};

export default Page;
