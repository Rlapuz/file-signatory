import { Schema, model, models } from "mongoose";

const fileSchema = new Schema({
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
    userId: {
        type: Schema.Types.ObjectId,
        // Reference to the Credential model and UserGoogle model
        ref: 'Credential',
        ref: 'UserGoogle',
        required: true,
    },
    currentSignatory: {
        type: String,
        enum: ["ProgChair", "CESU", "DEAN", "FOCAL"],
        default: "ProgChair", // Set the initial signatory role
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "Draft"],
        default: "Draft",
    },
    deleted: {
        type: Boolean,
        default: false, // Set as false initially to indicate not deleted
    },


}, { timestamps: true });

const FileModel = models.File || model('File', fileSchema);

export default FileModel;

/**
 * ! IMPORTANT NOTE 
 * status need enum Pending, Approved, Rejected Draft
 * Draft Signatory default  
 */