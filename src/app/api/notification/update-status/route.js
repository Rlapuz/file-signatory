
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Credential from "@/models/credential";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { notificationId } = await request.json();

        await connectDB();

        const user = await Credential.findOneAndUpdate(
            { "notifications._id": notificationId },
            { $set: { "notifications.$.status": "read" } },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({ message: "Notification not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Notification status updated to read" }, { status: 200 });
    } catch (error) {
        console.error("Error updating notification status:", error);
        return NextResponse.json(
            { message: "Failed to update notification status" },
            { status: 500 }
        );
    }
}
