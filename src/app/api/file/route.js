import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import FileModel from "@/models/fileModel";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";

// POST 
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions)

        const { filename, size, url, mimetype } = await request.json();
        await connectDB();
        await FileModel.create({ filename, size, url, mimetype, userId: session.user._id });
        return NextResponse.json({ message: "File Created" }, { status: 201 });
    } catch (error) {
        console.error("Error while creating file:", error);
        return NextResponse.json({ message: "Failed to create file" }, { status: 500 });
    }
}


// GET
export async function GET() {
    try {

        await connectDB();

        const files = await FileModel.find({ deleted: false });
        return NextResponse.json(files);
    } catch (error) {
        console.error("Error while getting files:", error);
        return NextResponse.json({ message: "Failed to get files" }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id")
    await connectDB()
    // Find the file by ID and update the 'deleted' field to true
    const updatedFileData = await FileModel.findByIdAndUpdate(id, { deleted: true }, { new: true });


    return NextResponse.json(updatedFileData, { status: 200 })
}

// PUT
export async function PUT(request) {
    const body = Object.fromEntries([...new FormData(request)])
    const id = request.nextUrl.searchParams.get("id")
    await connectDB()
    const updatedFileData = await FileModel.findOneAndUpdate({ "_id": id }, body, { new: true })
    return NextResponse.json(updatedFileData, { status: 200 })
}

