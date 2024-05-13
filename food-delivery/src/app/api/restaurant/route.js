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
	await mongoose.connect(connectionStr, { useNewUrlParser: true });
	let restaurant = new restaurantSchema(payload);
	const result = await restaurant.save();
	return NextResponse.json({ result, success: true });
}
