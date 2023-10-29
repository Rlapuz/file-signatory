import FileModel from "@/models/fileModel";
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
        const files = await FileModel.find({ userId, deleted: false });
        return NextResponse.json(files);
    } catch (error) {
        console.error("Error while getting files:", error);
        return NextResponse.json({ message: "Failed to get files" }, { status: 500 });
    }
}


// PUT
export async function PUT(request) {
    const body = Object.fromEntries([...new FormData(request)])
    const id = request.nextUrl.searchParams.get("id")
    await connectDB()
    const updatedFileData = await FileModel.findOneAndUpdate({ "_id": id }, body, { new: true })
    return NextResponse.json(updatedFileData, { status: 200 })
}