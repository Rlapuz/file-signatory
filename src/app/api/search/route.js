import { getSession } from "next-auth";
import FileModel from "@/models/fileModel";
import FolderModel from "@/models/folderModel";

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const { query } = req.query;

    try {
        const files = await FileModel.find({
            userId: session.user._id,
            filename: { $regex: query, $options: "i" }, // Case-insensitive search
        });

        const folders = await FolderModel.find({
            userId: session.user._id,
            name: { $regex: query, $options: "i" },
        });

        res.status(200).json({ files, folders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}