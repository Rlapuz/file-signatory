// import connectDB from "@/db/connectDB";
// import FileModel from "@/models/fileModel"
// import { NextResponse } from "next/server";

// // API endpoint for moving a file to a different folder

// export async function PUT(request) {
//     try {
//         // Ensure a database connection is established
//         await connectDB();

//         // Retrieve the file ID and new parent folder ID from the request JSON
//         const { id, newParentId } = await request.json();

//         // Find the file by ID and update the 'parentId' field to move it to the new folder
//         const updatedFileData = await FileModel.findByIdAndUpdate(id, { currentFolderId: newParentId }, { new: true });


//         // Return a success response with a 200 status code
//         return NextResponse.json(updatedFileData, { status: 200 });
//     } catch (error) {
//         // Handle errors by logging them and returning an error response
//         console.error("Error while moving file:", error);
//         return NextResponse.json({ message: "Failed to move file" }, { status: 500 });
//     }
// }

// // PATCH
// export async function PATCH(request) {
//     try {
//         // Ensure a database connection is established
//         await connectDB();

//         // Retrieve the file ID and new parent folder ID from the request JSON
//         const { id, newParentId } = await request.json();

//         // Find the file by ID and update the 'parentId' field to move it to the new folder
//         const updatedFileData = await FileModel.findByIdAndUpdate(id, { currentFolderId: newParentId }, { new: true });


//         // Return a success response with a 200 status code
//         return NextResponse.json(updatedFileData, { status: 200 });
//     }
//     catch (error) {
//         // Handle errors by logging them and returning an error response
//         console.error("Error while moving file:", error);
//         return NextResponse.json({ message: "Failed to move file" }, { status: 500 });
//     }
// }




