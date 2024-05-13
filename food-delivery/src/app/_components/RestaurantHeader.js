import Link from "next/link";
import React from "react";

const RestaurantHeader = () => {
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
				<Link href="/">Login/Signup</Link>
				<Link href="/">Profile</Link>
			</div>
		</div>
	);
};

export default RestaurantHeader;
