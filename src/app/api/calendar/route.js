import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import EventModel from "@/models/eventsModel";
import connectDB from "@/db/connectDB";
import { getSession } from "next-auth/react";

await connectDB()

// POST
export async function POST(request) {
    try {

        // const session = await getSession({ req: request.req });

        // if (!session) {
        //     return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        // }
        const session = await getServerSession(authOptions)
        const { title, start, allDay } = await request.json();
        console.log("Received data:", { title, start, allDay });
        await connectDB();
        await EventModel.create({ title, start, allDay, userId: session.user._id });
        return NextResponse.json({ message: "Event Created" }, { status: 201 });
    } catch (error) {
        console.error("Error while creating event:", error);
        return NextResponse.json({ message: "Failed to create event" }, { status: 500 });
    }
}

// GET
export async function GET() {
    try {


        await connectDB();
        const events = await EventModel.find();
        return NextResponse.json(events);
    } catch (error) {
        console.error("Error while getting event:", error);
        return NextResponse.json({ message: "Failed to get event" }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id")
    await connectDB()
    await EventModel.findByIdAndDelete(id)
    return NextResponse.json({ message: "Event Deleted" }, { status: 200 })
}

// PUT
export async function PUT(request) {
    const data = JSON.parse((await request).body)
    const id = request.nextUrl.searchParams.get("id")
    await connectDB()
    const result = await EventModel.updateOne({ "_id": id }, { "name": data })
    return NextResponse.json(result, { status: 200 })
}

