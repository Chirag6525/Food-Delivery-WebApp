"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditFoodItem = (props) => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [path, setPath] = useState("");
	const [desc, setDesc] = useState("");
	const [error, setError] = useState(false);
	const router = useRouter();
	useEffect(() => {
		handleLoadFoodItem();
	}, []);
	const handleLoadFoodItem = async () => {
		let response = await fetch(
			"http://localhost:3000/api/restaurant/foods/edit/" + props.params.id
		);
		response = await response.json();
		if (response.success) {
			console.log(response.result);
			setName(response.result.name);
			setPrice(response.result.price);
			setPath(response.result.img_path);
			setDesc(response.result.desc);
		}
	};
	const handleEditFoodItem = async () => {
		if (!name || !price || !path || !desc) {
			setError(true);
			return false;
		}
		{
			setError(false);
		}
		console.log(name, price, path, desc);
		let response = await fetch(
			"http://localhost:3000/api/restaurant/foods/edit/" + props.params.id,
			{
				method: "PUT",
				body: JSON.stringify({ name, price, img_path: path, desc }),
			}
		);
		response = await response.json();
		if (response.success) {
			router.push("../dashboard")
		}
		else {
			alert("data Not updated Please try again")
		}
	};
	return (
		<div className="flex items-center justify-center">
			<div className="max-w-md w-full sapce-y-8">
				<div className="mt-6 text-center text-3xl">Update Food Item</div>
				<div>
					<div className="mt-6">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Enter Food Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						{error && !name && (
							<span className="flex items-align justify-center text-red-600 px-8">
								Please Enter valid Name
							</span>
						)}
					</div>
					<div className="mt-6">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Enter Food Price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
						{error && !price && (
							<span className="flex items-align justify-center text-red-600 px-8">
								Please Enter Price
							</span>
						)}
					</div>
					<div className="mt-6">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Enter Image Link"
							value={path}
							onChange={(e) => setPath(e.target.value)}
						/>
						{error && !path && (
							<span className="flex items-align justify-center text-red-600 px-8">
								Please Enter valid Path
							</span>
						)}
					</div>
					<div className="mt-6">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Enter Desciption"
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
						/>
						{error && !desc && (
							<span className="flex items-align justify-center text-red-600 px-8">
								Please Enter Description
							</span>
						)}
					</div>
				</div>
				<div className="mt-4 flex justify-center items-center">
					<button
						className="group relative border-2  rounded-lg px-10 py-3 bg-red-600"
						onClick={handleEditFoodItem}
					>
						UpdateFood Item
					</button>
				</div>
				<div className="mt-4 flex justify-center items-center">
					<button
						className="group relative border-2 rounded-lg px-5 py-2 bg-green-600"
						onClick={() => router.push("../dashboard")}
					>
						Back to Food item
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditFoodItem;
