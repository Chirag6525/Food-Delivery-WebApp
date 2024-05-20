import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const UserSignup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [c_password, setC_Password] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
	const [contact, setContact] = useState('')
	const route = useRouter()
    const handleSignUp =async() => {
		console.log(name, email, password, city, address, contact)
		let response = await fetch('http://localhost:3000/api/user',
			{method: 'POST',
			body: JSON.stringify({name,email,password,city,address,contact})}
		)
		response = await response.json()
		if (response.success) {
			const { result } = response
			delete result.password
			localStorage.setItem('user', JSON.stringify(result))
			route.push('/')
		}
		else {
			alert("Signup Failed")
		}
}
  return (
		<div className="flex items-center justify-center">
			<div className="max-w-md w-full sapce-y-8">
				<div className="mt-6 text-center text-3xl">User Signup Page</div>
				<div className="mt-2">
					<div className="">
						<input
							className="input-field mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Enter Name"
							value={name}
							onChange={(event) => setName(event.target.value)}
						/>
					</div>
					<div className="">
						<input
							className="input-field mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Enter Email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="password"
							placeholder="Enter Password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
						/>
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="password"
							placeholder="Confirm Password"
							value={c_password}
							onChange={(event) => setC_Password(event.target.value)}
						/>
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="City"
							value={city}
							onChange={(event) => setCity(event.target.value)}
						/>
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Address"
							value={address}
							onChange={(event) => setAddress(event.target.value)}
						/>
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="text"
							placeholder="Contact"
							value={contact}
							onChange={(event) => setContact(event.target.value)}
						/>
					</div>
				</div>
				<div className="mt-4 flex justify-center items-center">
                  <button onClick={handleSignUp}
                      className="group relative border-2  rounded-lg px-10 py-3 bg-blue-600">
						SignUp
					</button>
				</div>
			</div>
		</div>
	);
}

export default UserSignup