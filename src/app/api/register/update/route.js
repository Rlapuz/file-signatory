import connectDB from "@/src/db/connectDB";
import Credential from "@/src/models/credential";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
    try {
        await connectDB();

        if (req.method === "PUT") {
            const { id, email, password, role } = req.body;

            // Update the user's profile in the database based on the provided user ID
            const updatedUser = await Credential.findByIdAndUpdate(
                id,
                { email, password, role },
                { new: true } // Return the updated document
            );

            if (updatedUser) {
                return NextResponse.json({ msg: "Profile updated successfully" }, { status: 200 });
            } else {
                return NextResponse.json({ msg: "User not found" }, { status: 404 });
            }
        } else {
            return NextResponse.json({ msg: "Method Not Allowed" }, { status: 405 });
        }
    } catch (error) {
        console.error("Error while updating user profile:", error);
        return NextResponse.json({ msg: "Failed to update user profile" }, { status: 500 });
    }
}
