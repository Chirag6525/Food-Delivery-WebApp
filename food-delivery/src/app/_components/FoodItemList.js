import React, { useEffect, useState } from 'react'

const FoodItemList = () => {
  const [foodItem, setFoodItem] = useState([])
  useEffect(() => {
    loadFoodItem();
  }, [])
  const loadFoodItem = async () => {
    const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'))
    const resto_id = restaurantData._id
    let response = await fetch(
			"http://localhost:3000/api/restaurant/foods/"+resto_id
		);
    response = await response.json()
    // console.log(response)
    if (response.success) {
      setFoodItem(response.result)
    } else {
      alert("Food Item List not Loading")
    }
  }
  
  return (
		<div className="flex items-center justify-center">
			<div className="">
				<div className="text-center mt-5">Food Items</div>
				<div className="mt-5">
					<table className="border-black border-2">
						<thead className="border-black border-2">
							<tr>
								<td className="border-black border-2 px-10 py-5">S.No</td>
								<td className="border-black border-2 px-10 py-5">Name</td>
								<td className="border-black border-2 px-10 py-5">Price</td>
								<td className="border-black border-2 px-10 py-5">
									Description
								</td>
								<td className="border-black border-2 px-10 py-5">Image</td>
								<td className="border-black border-2 px-10 py-5">Operations</td>
							</tr>
						</thead>
						<tbody>
							{ foodItem && foodItem.map((item, key) => (
								<tr key={key}>
									<td className="border-black border-2 px-10 py-5">
										{key + 1}
									</td>
									<td className="border-black border-2 px-10 py-5">
										{item.name}
									</td>
									<td className="border-black border-2 px-10 py-5">
										{item.price}
									</td>
									<td className="border-black border-2 px-10 py-5">
										{item.desc}
									</td>
									<td className="border-black border-2 px-10 py-5">
                    <img className='w-[13rem]' src={ item.img_path} />
										
									</td>
									<td className="border-black border-2 px-10 py-5">
										<button className="border-black border-2 rounded-md bg-red-600 px-3 m-2">
											Delete
										</button>
										<button className="border-black border-2 rounded-md bg-green-600 px-3 m-2">
											Edit
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default FoodItemList