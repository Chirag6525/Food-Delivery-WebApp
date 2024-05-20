import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CustomerHeader = (props) => {
	const userStorage = JSON.parse(localStorage.getItem("user"));
	const cartStorage = JSON.parse(localStorage.getItem("cart"));
	const [cartNumber, setCartNumber] = useState(cartStorage?.length);
	const [cartItem, setCartItem] = useState(cartStorage);
	const [user, setUser] = useState(userStorage ? userStorage : undefined);
	const router = useRouter()
	useEffect(() => {
		if (props.cartData) {
			console.log(props);
			if (cartNumber) {
				if (cartItem[0].resto_id != props.cartData.resto_id) {
					localStorage.removeItem("cart");
					setCartNumber(1);
					setCartItem([props.cartData]);
					localStorage.setItem("cart", JSON.stringify([props.cartData]));
				} else {
					let localCartItem = cartItem;
					localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
					setCartItem(localCartItem);
					setCartNumber(cartNumber + 1);
					localStorage.setItem("cart", JSON.stringify(localCartItem));
				}
			} else {
				setCartNumber(1);
				setCartItem([props.cartData]);
				localStorage.setItem("cart", JSON.stringify([props.cartData]));
			}
		}
	}, [props.cartData]);
	useEffect(() => {
		if (props.removeCartData) {
			let localCartItem = cartItem.filter((item) => {
				return item._id != props.removeCartData;
			});
			setCartItem(localCartItem);
			setCartNumber(cartNumber - 1);
			localStorage.setItem("cart", JSON.stringify(localCartItem));
			if (localCartItem.length === 0) {
				localStorage.removeItem("cart");
			}
		}
	}, [props.removeCartData]);
	const logOut = () => {
		localStorage.removeItem('user')
		router.push('/user-auth')
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
				{user ? (
					<>
						<Link href="/">{user?.name}</Link>
						<button onClick={logOut}>LogOut</button>
					</>
				) : (
					<>
						<Link href="/">Login</Link>
						<Link href="/user-auth">Signup</Link>
					</>
				)}

				<Link href={cartNumber ? "/cart" : "#"}>
					Cart({cartNumber ? cartNumber : 0})
				</Link>
				<Link href="/">Add Restaurant</Link>
			</div>
		</div>
	);
};

export default CustomerHeader;
