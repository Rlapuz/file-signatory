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



// PUT
export async function PUT(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const formData = await request.formData();
        const newFileName = formData.get('newFileName');

        console.log("Received PUT request for file ID:", id);
        console.log("New file name:", newFileName);

        await connectDB();

        const updatedFileData = await FileModel.findByIdAndUpdate(id, { filename: newFileName }, { new: true });

        // console.log("Updated file data:", updatedFileData);

        return NextResponse.json(updatedFileData, { status: 200 });
    } catch (error) {
        console.error("Error while updating file:", error);
        return NextResponse.json({ message: "Failed to update file" }, { status: 500 });
    }
}
