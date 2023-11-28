
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import FileSignatoryModel from "@/models/signatoryModel";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { fileId } = await request.json();

        console.log("fileId", fileId);

        await connectDB();

        const file = await FileSignatoryModel.findOneAndUpdate(
            { "file._id": fileId },
            { $set: { "status": "Approved" } },
            { new: true }

        );
        console.log("file", file);


        if (!file) {
            return NextResponse.json({ message: "File Signatory not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "File Signatory status updated to approved" }, { status: 200 });
    } catch (error) {
        console.error("Error updating file signatory status:", error);
        return NextResponse.json(
            { message: "Failed to update file signatory status" },
            { status: 500 }
        );
    }
}
