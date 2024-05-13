"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RestaurantHeader = () => {
	const [details, setDetails] = useState();
	const router = useRouter();
	const pathName = usePathname();
	useEffect(() => {
		let data = localStorage.getItem("restaurantUser");
		if (!data && pathName == "/restaurant/dashboard") {
			router.push("/restaurant");
		} else if (data && pathName == "/restaurant") {
			router.push("/restaurant/dashboard")

		} else {
			setDetails(JSON.parse(data));
		}
	},[]);
	const handlelogOut = () => {
		localStorage.removeItem("restaurantUser")
		router.push("/restaurant");
	}
	return (
		<div className="w-full px-20 py-2 flex justify-between items-center bg-slate-400">
			<div>
				<img
					className="h-[5rem] w-[5rem]"
					src="https://th.bing.com/th/id/R.a2bb842262145082b8381f9c28ea92a5?rik=sdgk1CJ7ZbtZKA&riu=http%3a%2f%2fclipart-library.com%2fnewhp%2f76-761918_home-delivery-charge-delivery-boy-logo-png.png&ehk=zjJ6UuE%2fKhMbPIMfCeaucW0VY2pzRhGTGzW8BGunfb0%3d&risl=&pid=ImgRaw&r=0"
				/>
			</div>
			<div className="flex gap-10">
				<Link href="/">Home</Link>
				{details && details.name ? (
					<>
						<Link href="/">Profile</Link>
						<button onClick={handlelogOut}>LogOut</button>
					</>
				) : (
					<Link href="/">Login/Signup</Link>
				)}
			</div>
		</div>
	);
};

export default RestaurantHeader;
