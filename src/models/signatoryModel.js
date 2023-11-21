
import { Schema, model, models } from "mongoose";

const fileSignatorySchema = new Schema({
    filename: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    currentSignatory: {
        type: String,
        enum: ["ProgChair", "CESU", "DEAN", "FOCAL"],
        default: "ProgChair",
    },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "Draft"],
        default: "Draft",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Credential', // Reference to the Credential model
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const FileSignatoryModel = models.FileSignatory || model('FileSignatory', fileSignatorySchema);

export default FileSignatoryModel;

/**
 * TODO: implement if I upload file add currentSignatory based on my role
 */