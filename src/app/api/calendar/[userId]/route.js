// params file/[userId] , create new folder for this route (dynamic) 

import { NextResponse } from "next/server";
import EventModel from "@/models/eventsModel";
import connectDB from "@/db/connectDB";



// GET
export async function GET(req) {
    try {
        const { userId } = req.query
        // console.log(userId)
        // console.log(req.query)
        console.log("Received userId:", userId);

        await connectDB();
        const events = await EventModel.find({ userId });
        return NextResponse.json(events);
    } catch (error) {
        console.error("Error while getting events:", error);
        return NextResponse.json({ message: "Failed to get events" }, { status: 500 });
    }
}
