import { Schema, model, models } from "mongoose";


const CredentialSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    provider: {
        type: String,
        default: 'credentials'
    },

}, { timestamps: true })

const Credential = models.Credential || model("Credential", CredentialSchema)

export default Credential;