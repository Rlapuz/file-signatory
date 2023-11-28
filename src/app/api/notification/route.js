
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Credential from "@/models/credential";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";
import FileSignatoryModel from "@/models/signatoryModel";

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // const userEmail = request.nextUrl.searchParams.get("userEmail");
        const userEmail = session.user.email;

        await connectDB();

        // Find the user by email and fetch notifications
        const user = await Credential.findOne({ email: userEmail });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const { role, notifications } = user;





        // Check role and handle notifications accordingly
        switch (role) {
            case 'ProgChair':
            case 'CESU':
            case 'DEAN':
            case 'FOCAL':
            case 'ADMIN':
                return NextResponse.json(notifications, { status: 200 });

            default:
                return NextResponse.json({ message: "Unknown role" }, { status: 403 });
        }


    } catch (error) {
        console.error("Error while fetching notifications:", error);
        return NextResponse.json(
            { message: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}


export async function DELETE(request) {
    try {
        const notifications = await request.json();
        const { _id } = notifications;

        await connectDB();

        const user = await Credential.findOneAndUpdate(
            { "notifications._id": _id },
            { $pull: { notifications: { _id } } },
            { new: true }
        );

        if (!user) {
            return NextResponse.json(
                { message: "Notification not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Notification Deleted" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting notification:", error);
        return NextResponse.json(
            { message: "Failed to delete notification" },
            { status: 500 }
        );
    }
}


