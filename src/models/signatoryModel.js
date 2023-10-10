import { Schema, model, models } from "mongoose";

const FilesignatorySchema = new Schema({
    fileId: {
        type: Schema.Types.ObjectId,
        ref: "File",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Credential", // Reference to the user who sent the FileSignatory
        required: true,
    },
    currentSignatory: {
        type: String,
        enum: ["ProgChair", "CESU", "DEAN", "FOCAL"],
        default: "ProgChair", // Set the initial signatory role
    },
    status: {
        type: String,
        default: "Pending",
    },
    // You can add more fields specific to the FileSignatory routing here
}, { timestamps: true });

const FileSignatory = models.FileSignatory || model('FileSignatory', FilesignatorySchema);

export default FileSignatory;
