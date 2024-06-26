import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    let success = false
    const orderObj = new orderSchema(payload)
    const result = await orderObj.save()
    if (result) {
        success = true
    }
    return NextResponse.json({result,success})
}
export async function GET(request) {
    const userId = request.nextUrl.searchParams.get('id')
    
    await mongoose.connect(connectionStr, {useNewUrlParser:true})
    let result = await orderSchema.find({user_id:userId});
    let success = false;
    return NextResponse.json({result})

}