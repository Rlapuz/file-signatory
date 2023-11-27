// params file/[userId] , create new folder for this route (dynamic) 

import { NextResponse } from "next/server";
import FolderModel from "@/models/folderModel";
import connectDB from "@/db/connectDB";



// GET
export async function GET(req) {
    try {
        const { userId } = req.query
        // console.log(userId)
        // console.log(req.query)
        console.log("Received userId:", userId);

        await connectDB();
        const folders = await FolderModel.find({ userId });
        return NextResponse.json(folders);
    } catch (error) {
        console.error("Error while getting folders:", error);
        return NextResponse.json({ message: "Failed to get folders" }, { status: 500 });
    }
}

// PUT
export async function PUT(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const formData = await request.formData();
        const newFolderName = formData.get('newFolderName');

        console.log("Received PUT request for folder ID:", id);
        console.log("New folder name:", newFolderName);

        await connectDB();

        const updateFoldername = await FolderModel.findByIdAndUpdate(id, { name: newFolderName }, { new: true });

        console.log("Updated folder data:", updateFoldername);

        return NextResponse.json(updateFoldername, { status: 200 });
    } catch (error) {
        console.error("Error while updating folder:", error);
        return NextResponse.json({ message: "Failed to update folder" }, { status: 500 });
    }
}
