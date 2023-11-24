// src/app/api/signatory/notif/route.js

import FileSignatoryModel from "@/models/signatoryModel";
import connectDB from "@/db/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

// GET
export async function GET(request) {
    try {
        // Get the user's role from the session
        const session = await getServerSession(authOptions);
        const userRole = session.user.role;

        if (!userRole) {
            return NextResponse.json(
                { message: "User role not found" },
                { status: 400 }
            );
        }

        await connectDB();

        // Fetch files where currentSignatory matches the user's role
        const files = await FileSignatoryModel.find({
            currentSignatory: userRole,
            deleted: false,
        });

        // console.log("Files:", files);

        return NextResponse.json(files);
    } catch (error) {
        console.error("Error while getting signatory files:", error);
        return NextResponse.json(
            { message: "Failed to get signatory files" },
            { status: 500 }
        );
    }
}




