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
            return NextResponse.json({ message: "You already send to Signatory" }, { status: 404 });
        }

        console.log("User Role:", userRole);

        // Determine the next signatory based on the current signatory
        switch (file.currentSignatory) {
            case "ProgChair":
                console.log("Switch Case: ProgChair");
                if (userRole === "ProgChair") {
                    file.currentSignatory = "CESU";
                }
                break;
            case "CESU":
                console.log("Switch Case: CESU");
                if (userRole === "CESU") {
                    file.currentSignatory = "DEAN";
                }
                break;
            case "DEAN":
                console.log("Switch Case: DEAN");
                if (userRole === "DEAN") {
                    file.currentSignatory = "FOCAL";
                }
                break;
            case "FOCAL":
                console.log("Switch Case: FOCAL");
                if (userRole === "FOCAL") {
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

        // const sender = await Credential.findById(userId);

        // console.log("Before Sender:", sender);
        // Add a notification for the new signatory
        const newSignatoryUser = await Credential.findOne({
            role: file.currentSignatory,
        });


        if (newSignatoryUser) {
            const sender = await Credential.findById(userId);

            // console.log("Sender:", sender);
            if (sender && sender.name) {
                // console.log("Sender name before push:", sender.name);
                newSignatoryUser.notifications.push({
                    sender: {
                        name: sender.name,
                        image: sender.image,
                    },
                    message: `${file.filename} sign this file`,


                });

                // console.log("Name:", sender.name);
                // console.log("Image:", sender.image);

                await newSignatoryUser.save();
            } else {
                console.error("Sender not found or name is missing");
            }
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