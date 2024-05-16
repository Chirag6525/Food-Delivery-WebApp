import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";

import { NextResponse } from "next/server";

export async function GET() {
	//connection
	await mongoose.connect(connectionStr, { useNewUrlParser: true });
	//Schema
	const data = await restaurantSchema.find();
	console.log(data);
	return NextResponse.json({ result: data });
}

//storing the restaurant data

export async function POST(request) {
	let payload = await request.json();
	let result;
	let success = false;
	await mongoose.connect(connectionStr, { useNewUrlParser: true });
	if (payload.login) {
		//use it for login page
		result = await restaurantSchema.findOne({
			email: payload.email,
			password: payload.password,
		});
		if (result) {
			success = true;
		}
	} else {
		//use it for signup page
		let restaurant = new restaurantSchema(payload);
		result = await restaurant.save();
		if (result) success = true;
	}
	return NextResponse.json({ result, success});
}
