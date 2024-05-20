"use client";
import Image from "next/image";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [locations, setLocations] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState("");
	const [showLocation, setShowLocation] = useState(false);
	const [restaurants, setRestaurants] = useState([]);
	const router = useRouter()
	useEffect(() => {
		loadLocations();
		loadRestaurants();
	}, []);
	const loadLocations = async () => {
		let response = await fetch("http://localhost:3000/api/customer/locations");
		response = await response.json();
		if (response.success) {
			setLocations(response.result);
		}
	};
	const loadRestaurants = async (params) => {
		let url = "http://localhost:3000/api/customer";
		if (params?.location) {
			url=url+"?location="+params.location
		} else if(params?.restaurant){
			url = url + "?restaurant=" + params.restaurant;
		}
		let response = await fetch(url);
		response = await response.json();
		if (response.success) {
			setRestaurants(response.result);
		}
	};
	const handleListItem = (item) => {
		setSelectedLocation(item);
		setShowLocation(false);
		loadRestaurants({location:item})
	};
	return (
		<div>
			<CustomerHeader />
			<div className="bg-[url('https://wallpaperaccess.com/full/1537562.png')] flex-col justify-center items-center h-screen bg-cover">
				<div className="flex justify-center items-center p-5 font-bold text-4xl">
					Food Delivery App
				</div>
				<div className="flex justify-center items-center p-5 gap-5">
					<div className="flex-col">
						<input
							className="border-2 border-black p-5 rounded-lg"
							type="text"
							value={selectedLocation}
							onClick={() => setShowLocation(true)}
							placeholder="Select Place"
						/>
						<ul className="text-black absolute text-center w-52">
							{showLocation &&
								locations.map((item) => (
									<li
										onClick={() => handleListItem(item)}
										className="border-black border-2 py-4 px-2 cursor-pointer bg-slate-50 rounded-lg w-full"
									>
										{item}
									</li>
								))}
						</ul>
					</div>
					<div>
						<input
							className="border-2 border-black p-5 rounded-lg"
							type="text"
							onChange={(event)=>loadRestaurants({restaurant:event.target.value})}
							placeholder="Select Food or Restaurant"
						/>
					</div>
				</div>
				<div className="flex-col p-4">
					{restaurants.map((item) => (
						<div onClick={()=>router.push('explore/'+item.name+"?id="+item._id)} className="flex justify-between bg-white p-5 gap-5 border-slate-400 border-2 cursor-pointer rounded-xl mt-2">
							<div className="">{item.name}</div>
							<div>Contact: {item.contact}</div>
							<div>Address: {item.city}</div>
							<div>Email: {item.email}</div>
						</div>
					))}
				</div>
			</div>
			<RestaurantFooter />
		</div>
	);
}
