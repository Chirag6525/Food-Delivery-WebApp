import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const UserLogin = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const route = useRouter()
	const handleLogin = async () => {
		console.log({ email, password })
		let response = await fetch('http://localhost:3000/api/user/login',
			{method: 'POST',
			body: JSON.stringify({email,password})}
		)
		response = await response.json()
		if (response.success) {
			const { result } = response
			delete result.password
			localStorage.setItem('user', JSON.stringify(result))
			if (props.redirect?.order) {
				route.push('/order')
			} else {
	
				route.push('/')
			}
		}
		else {
			alert("Login Failed")
		}
    }
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
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{/* {!email && (
							<span className="flex items-align justify-center text-red-600 px-8">
								Please Enter valid Email
							</span>
						)} */}
					</div>
					<div className="">
						<input
							className="mt-4 w-full p-2 rounded-lg bg-slate-300"
							type="password"
							placeholder="Enter Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{/* {!password && (
							<span className="flex items-align justify-center text-red-600 px-8">
								Please Enter valid Password
							</span>
						)} */}
					</div>
				</div>
				<div className="mt-4 flex justify-center items-center">
					<button
						onClick={handleLogin}
						className="group relative border-2  rounded-lg px-10 py-3 bg-blue-600"
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}

export default UserLogin