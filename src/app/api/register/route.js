import connectDB from "@/src/db/connectDB";
import Credential from "@/src/models/credential";
import { NextResponse } from "next/server";

// POST
export async function POST(request) {
    try {
        // Extract data from the request JSON
        const { name, contact, employeeId, email, password, role, provider } = await request.json();

        // Ensure a database connection is established
        await connectDB()
        // Check if a user with the same email already exists
        const existingUser = await Credential.findOne({ email });

        if (existingUser) {
            // Handle the case where the email is already in use (e.g., return an error response)
            return NextResponse.json({ message: "Email already in use" }, { status: 400 });
        }

        // Create a new user credential in the database
        await Credential.create({ name, contact, employeeId, email, password, role, provider });

        // Return a success response with a 201 status code
        return NextResponse.json({ message: "Credential created" }, { status: 201 });
    } catch (error) {
        // Handle errors by logging them and returning an error response
        console.error("Error while creating credential:", error);
        return NextResponse.json({ message: "Failed to create credential" }, { status: 500 });
    }
}

// GET
export async function GET(request) {
    try {
        // Ensure a database connection is established
        await connectDB();

        // Retrieve all user credentials from the database
        const credentials = await Credential.find();

        // Return a success response with a 200 status code
        return NextResponse.json({ credentials }, { status: 200 });
    } catch (error) {
        // Handle errors by logging them and returning an error response
        console.error("Error while retrieving credentials:", error);
        return NextResponse.json({ message: "Failed to retrieve credentials" }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request) {
    try {
        // Ensure a database connection is established
        await connectDB();

        // Retrieve the credential ID from the request parameters
        const { id } = request.params;

        // Delete the credential from the database
        await Credential.findByIdAndDelete(id);

        // Return a success response with a 200 status code
        return NextResponse.json({ message: "Credential deleted" }, { status: 200 });
    } catch (error) {
        // Handle errors by logging them and returning an error response
        console.error("Error while deleting credential:", error);
        return NextResponse.json({ message: "Failed to delete credential" }, { status: 500 });
    }
}

// PUT
export async function PUT(request) {
    try {
        // Ensure a database connection is established
        await connectDB();

        // Retrieve the credential ID from the request parameters
        const { id } = request.params;

        // Extract data from the request JSON
        const { name, contact, employeeId, email, password, role, provider } = await request.json();

        // Update the credential in the database
        await Credential.findByIdAndUpdate(id, { name, contact, employeeId, email, password, role, provider });

        // Return a success response with a 200 status code
        return NextResponse.json({ message: "Credential updated" }, { status: 200 });
    } catch (error) {
        // Handle errors by logging them and returning an error response
        console.error("Error while updating credential:", error);
        return NextResponse.json({ message: "Failed to update credential" }, { status: 500 });
    }
}