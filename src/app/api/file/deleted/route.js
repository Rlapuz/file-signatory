import connectDB from "@/db/connectDB";

import FileModel from "@/models/fileModel"
import { NextResponse } from "next/server";



// GET deleted files
export async function GET(req) {
    try {

        await connectDB();
        const deletedFiles = await FileModel.find({ deleted: true });


        return NextResponse.json(deletedFiles);
    } catch (error) {
        console.error("Error while getting deleted files:", error);
        return NextResponse.json({ message: "Failed to get deleted files" }, { status: 500 });
    }
}

// PUT for restoring a deleted file
export async function PUT(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectDB();

    // Find the file by ID and update the 'deleted' field to false to restore it
    const updatedFileData = await FileModel.findByIdAndUpdate(id, { deleted: false }, { new: true });

    return NextResponse.json(updatedFileData, { status: 200 });
}
