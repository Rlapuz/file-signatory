import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import FolderModel from "@/models/folderModel";
import connectDB from "@/db/connectDB";


// POST
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions)
        const { name } = await request.json();
        await connectDB();
        await FolderModel.create({ name, userId: session.user._id });
        return NextResponse.json({ message: "Folder Created" }, { status: 201 });
    } catch (error) {
        console.error("Error while creating folder:", error);
        return NextResponse.json({ message: "Failed to create folder" }, { status: 500 });
    }
}

// GET
export async function GET() {
    try {
        await connectDB();
        const folders = await FolderModel.find();
        return NextResponse.json(folders);
    } catch (error) {
        console.error("Error while getting folder:", error);
        return NextResponse.json({ message: "Failed to get folder" }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id")
    await connectDB()
    await FolderModel.findByIdAndDelete(id)
    return NextResponse.json({ message: "Folder Deleted" }, { status: 200 })
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

        const updateFoldername = await FolderModel.findByIdAndUpdate(
            id,
            { $set: { name: newFolderName } },
            { new: true }
        );


        console.log("Updated folder data:", updateFoldername);

        return NextResponse.json(updateFoldername, { status: 200 });
    } catch (error) {
        console.error("Error while updating folder:", error);
        return NextResponse.json({ message: "Failed to update folder" }, { status: 500 });
    }
}

