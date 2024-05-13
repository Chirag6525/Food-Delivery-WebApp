import React from 'react'

const RestaurantLogin = () => {
  return (
		<div className="flex items-center justify-center">
			<div className="max-w-md w-full sapce-y-8">
				<div className="mt-6 text-center text-3xl">Login Page</div>
				<div>
					<div className="mt-6">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Enter Email id"
						/>
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="password"
							placeholder="Enter Password"
						/>
					</div>
				</div>
				<div className="mt-4 flex justify-center items-center">
					<button className="group relative border-2  rounded-lg px-10 py-3 bg-blue-600">
						Login
					</button>
				</div>
			</div>
		</div>
	);
}

export default RestaurantLogin