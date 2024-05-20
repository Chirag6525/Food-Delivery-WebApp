"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
	const [cartStorage, setCartStorage] = useState(
		JSON.parse(localStorage.getItem("cart"))
    );
    const [total, setTotal] = useState(() => cartStorage?.length == 1 ? cartStorage[0].price : cartStorage?.reduce((a, b)=> {
    return a.price+b.price
    }))
	console.log(total)
	const route = useRouter()
	useEffect(() => {
		if (!total) {
		  route.push('/')
	  }
	}, [total])
	
	const orderNow = () => {
		if (JSON.parse(localStorage.getItem('user'))) {
			route.push('/order')
		} else {
			route.push('/user-auth?order=true')
		}
	}
	const removeFromCart = (id) => {
		setremoveCartData(id);
		var localIds = cartId.filter((item) => item != id);
		setCartData();
		setCartId(localIds);
	};
	return (
		<div className="bg-[url('https://wallpaperaccess.com/full/1537562.png')] flex-col justify-center items-center h-screen bg-cover">
			<CustomerHeader />

			<div className="">
				{cartStorage.length > 0 ? (
					cartStorage.map((item) => (
						<div>
							<div className="text-black flex items-center justify-between p-3 bg-white">
								<img
									src={item.img_path}
									className="w-[13rem]"
								/>
								<div>{item.name}</div>

								<div>{item.desc}</div>
								<div>Price: {item.price}</div>
								<button
									onClick={() => removeFromCart(item._id)}
									className="border-black border-2 rounded-md bg-red-600 px-3 m-2 cursor-pointer"
								>
									Remove from Cart
								</button>
							</div>

							<div className="border-2 border-black"></div>
						</div>
					))
				) : (
					<div>No Food Item available</div>
				)}
			</div>
			<div className="flex-col pt-5 pb-2 border-b-4 border-black bg-slate-400">
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
				<div className="flex justify-center items-center pt-4">
					<button onClick={orderNow}
						className="border-black border-2 rounded-md bg-green-600 px-3 m-2 cursor-pointer ">
						ORDER
					</button>
				</div>
			</div>

			<RestaurantFooter />
		</div>
	);
};

export default Page;
