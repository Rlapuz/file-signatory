import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import FileSignatoryModel from "@/models/signatoryModel";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";

// POST 
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        const { filename, size, url, mimetype } = await request.json();
        await connectDB();

        // Get the user's role from the session
        const userRole = session.user.role; // Update this line with the correct way to get the user's role

        await FileSignatoryModel.create({
            filename,
            size,
            url,
            mimetype,
            userId: session.user._id,
            currentSignatory: userRole, // Set currentSignatory based on the user's role
        });

        return NextResponse.json({ message: "SignatoryFile Created" }, { status: 201 });
    } catch (error) {
        console.error("Error while creating SignatoryFile:", error);
        return NextResponse.json({ message: "Failed to create SignatoryFile" }, { status: 500 });
    }
}



// GET
export async function GET() {
    try {

        await connectDB();

        const files = await FileSignatoryModel.find({ deleted: false });
        return NextResponse.json(files);
    } catch (error) {
        console.error("Error while getting SignatoryFile:", error);
        return NextResponse.json({ message: "Failed to get SignatoryFile" }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id")
    await connectDB()
    // Find the file by ID and update the 'deleted' field to true
    const updatedFileData = await FileSignatoryModel.findByIdAndUpdate(id, { deleted: true }, { new: true });


    return NextResponse.json(updatedFileData, { status: 200 })
}

// PUT
export async function PUT(request) {
    const body = Object.fromEntries([...new FormData(request)])
    const id = request.nextUrl.searchParams.get("id")
    await connectDB()
    const updatedFileData = await FileSignatoryModel.findOneAndUpdate({ "_id": id }, body, { new: true })
    return NextResponse.json(updatedFileData, { status: 200 })
}

