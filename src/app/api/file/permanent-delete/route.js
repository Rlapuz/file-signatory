
import connectDB from "@/db/connectDB";
import FileModel from "@/models/fileModel";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {

        const id = request.nextUrl.searchParams.get("id");
        await connectDB();

        // Find the file by ID and delete it from the database
        await FileModel.findByIdAndDelete(id);

        return NextResponse.json({ message: "File permanently deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error while permanently deleting file:", error);
        return NextResponse.json({ message: "Failed to permanently delete file" }, { status: 500 });
    }
}
