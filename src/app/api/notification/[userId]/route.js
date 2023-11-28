import FileSignatoryModel from "@/models/signatoryModel";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";



// GET
export async function GET(req) {
    try {
        const { userId } = req.query
        // console.log(userId)
        // console.log(req.query)
        console.log("Received userId:", userId);

        await connectDB();
        const files = await FileSignatoryModel.find({ userId, deleted: false });
        return NextResponse.json(files);
    } catch (error) {
        console.error("Error while getting files:", error);
        return NextResponse.json({ message: "Failed to get files" }, { status: 500 });
    }
}

