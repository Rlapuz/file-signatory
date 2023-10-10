import { getSession } from "next-auth/react";
import connectDB from "@/db/connectDB";
import FileModel from "@/models/fileModel";

connectDB();

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "POST") {
        try {
            // Extract the current user's role from the session or database
            const currentUserRole = session.user.role; // Adjust this based on your data structure

            // Determine the next signatory based on the current user's role
            let nextSignatory = "";

            switch (currentUserRole) {
                case "ProgChair":
                    nextSignatory = "CESU";
                    break;
                case "CESU":
                    nextSignatory = "DEAN";
                    break;
                case "DEAN":
                    nextSignatory = "FOCAL";
                    break;
                case "FOCAL":
                    // This is the final signatory, you can handle completion logic here
                    break;
                default:
                    return res.status(400).json({ error: "Invalid role" });
            }

            // Implement logic to route the document to the next signatory here
            const fileId = req.body.fileId; // Assuming you pass the fileId in the request body

            // Retrieve the file from the database based on fileId
            const file = await FileModel.findById(fileId);

            if (!file) {
                return res.status(404).json({ error: "File not found" });
            }

            // Update the current signatory of the file to the next signatory
            file.currentSignatory = nextSignatory;
            await file.save();

            // You can make database updates, send notifications, etc.

            return res.status(200).json({ message: `Document sent to ${nextSignatory}` });
        } catch (error) {
            console.error("Error sending document:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
