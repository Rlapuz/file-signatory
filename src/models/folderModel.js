import { Schema, model, models } from "mongoose";

const folderSchema = new Schema({
    name: String,
    userId: {
        type: Schema.Types.ObjectId,
        // Reference to the Credential model and UserGoogle model
        ref: 'Credential',
        ref: 'UserGoogle',
        required: true,
    },
    // files: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'File', // Reference to the File model
    //     },
    // ],
}, { timestamps: true });

const FolderModel = models.Folder || model('Folder', folderSchema);

export default FolderModel;


