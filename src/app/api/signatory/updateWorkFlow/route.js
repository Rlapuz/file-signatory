
// import connectDB from "@/db/connectDB";
// import FileSignatoryModel from "@/models/signatoryModel";

// export async function PUT(request) {
//     const { fileId, currentSignatory, currentStage, workflow } = await request.json();

//     await connectDB();
//     const updatedFileData = await FileSignatoryModel.findByIdAndUpdate(
//         fileId,
//         { currentSignatory, currentStage, workflow },
//         { new: true }
//     );

//     return NextResponse.json(updatedFileData, { status: 200 });
// }
