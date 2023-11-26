
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Credential from "@/models/credential";
import connectDB from "@/db/connectDB";
import { NextResponse } from "next/server";

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

        if (role === 'ProgChair' || role === 'CESU' || role === 'DEAN' || role === 'FOCAL' || role === 'ADMIN') {
            return NextResponse.json(notifications, { status: 200 });
        } else {
            return NextResponse.json({ message: "Unknown role" }, { status: 403 });
        }
        x
        // Check role and handle notifications accordingly
        switch (role) {
            case 'ProgChair':
                return NextResponse.json(notifications, { status: 200 });

            case 'CESU':


                return NextResponse.json(notifications, { status: 200 });

            case 'DEAN':


                return NextResponse.json(notifications, { status: 200 });

            case 'FOCAL':

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


