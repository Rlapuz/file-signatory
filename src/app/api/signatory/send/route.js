// api/signatory/send.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FileSignatoryModel from "@/models/signatoryModel";
import Credential from "@/models/credential";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userRole = session.user.role; // Get the user's role from the session
        const userId = session.user._id; // Get the user's ID from the session

        await connectDB();

        // Find the file by user ID
        const file = await FileSignatoryModel.findOne({ userId, status: "Draft" });

        if (!file) {
            return NextResponse.json({ message: "File not found" }, { status: 404 });
        }

        console.log("User Role:", userRole);

        // Determine the next signatory based on the current signatory
        switch (file.currentSignatory) {
            case "ProgChair":
                console.log("Switch Case: ProgChair");
                if (userRole === "CESU") {
                    file.currentSignatory = "CESU";
                }
                break;
            case "CESU":
                console.log("Switch Case: CESU");
                if (userRole === "DEAN") {
                    file.currentSignatory = "DEAN";
                }
                break;
            case "DEAN":
                console.log("Switch Case: DEAN");
                if (userRole === "FOCAL") {
                    file.currentSignatory = "FOCAL";
                }
                break;
            case "FOCAL":
                console.log("Switch Case: FOCAL");
                if (userRole === "ProgChair") {
                    file.currentSignatory = "ProgChair";
                    file.status = "Approved"; // Set status to Approved when FOCAL sends back to ProgChair
                }
                break;
            default:
                console.log("Switch Case: Default");
                console.log("Unexpected Current Signatory:", file.currentSignatory);
                break;
        }


        console.log("Updated File Object:", file);



        // Save the updated file
        file.status = "Pending"; // Ensure that status is set to Pending for all other cases
        const updatedFileData = await file.save();

        // Add a notification for the new signatory
        const newSignatoryUser = await Credential.findOne({
            role: file.currentSignatory,
        });

        if (newSignatoryUser) {
            newSignatoryUser.notifications.push({
                message: `File "${file.filename}" is awaiting your signature.`,
            });

            await newSignatoryUser.save();
        }

        return NextResponse.json(
            {
                message: "File sent to signatory",
                file: updatedFileData,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while sending file to signatory:", error);
        return NextResponse.json(
            { message: "Failed to send file to signatory" },
            { status: 500 }
        );
    }
}
