import connectDB from "@/db/connectDB";
import FileModel from "@/models/fileModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";


// PUT for restoring a deleted file
export async function PUT(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectDB();

    // Find the file by ID and update the 'deleted' field to false to restore it
    const updatedFileData = await FileModel.findByIdAndUpdate(id, { deleted: false }, { new: true });

    return NextResponse.json(updatedFileData, { status: 200 });
}



// PUT for restoring a deleted file
// export async function PUT(req, res) {
//     try {

//         const session = await getServerSession({ req });

//         if (!session) {
//             return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//         }
//         await connectDB();


//         const id = request.nextUrl.searchParams.get("id");


//         // Find the file by ID and update the 'deleted' field to false to restore it
//         const updatedFileData = await FileModel.findByIdAndUpdate(id, { deleted: false }, { new: true });

//         if (!updatedFileData) {
//             return NextResponse.json({ message: "File not found or could not be restored." }, { status: 404 });
//         }

//         return NextResponse.json(updatedFileData, { status: 200 });
//     } catch (error) {
//         console.error("Error while restoring file:", error);
//         return NextResponse.json({ message: "Failed to restore file" }, { status: 500 });
//     }

// }
