import connectDB from "@/db/connectDB";
import FileModel from "@/models/fileModel";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        try {
            await connectDB();

            const id = req.query.id; // Extract the file ID from the query parameters

            // Find the file by ID and update the 'deleted' field to false to restore it
            const updatedFileData = await FileModel.findByIdAndUpdate(id, { deleted: false }, { new: true });

            if (!updatedFileData) {
                return NextResponse.json({ message: "File not found or could not be restored." }, { status: 404 });
            }

            return NextResponse.json(updatedFileData, { status: 200 });
        } catch (error) {
            console.error("Error while restoring file:", error);
            return NextResponse.json({ message: "Failed to restore file" }, { status: 500 });
        }
    } else {
        return NextResponse.error("Method not allowed", 405);
    }
}
