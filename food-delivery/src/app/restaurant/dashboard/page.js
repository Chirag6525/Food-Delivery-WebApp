'use client'
import AddFoodItem from '@/app/_components/AddFoodItem'
import FoodItemList from '@/app/_components/FoodItemList'
import RestaurantHeader from '@/app/_components/RestaurantHeader'
import React, { useState } from 'react'

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false)
  return (
		<div>
			<RestaurantHeader />
			<button
				className="group relative border-2  rounded-lg px-10 py-3 bg-blue-600"
				onClick={() => setAddItem(true)}
			>
				Add Food Item
			</button>
			<button
				className="group relative border-2  rounded-lg px-10 py-3 bg-blue-600"
				onClick={() => setAddItem(false)}
			>
				DashBoard
			</button>
		  {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
		</div>
	);
}

export default Dashboard