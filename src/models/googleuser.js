import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    image: {
        type: String,
    },
    role: {
        type: String,
        default: 'Focal'
    },
    provider: {
        type: String,
        default: 'credentials'
    },
}, { timestamps: true })



const UserGoogle = models.user || model('user', userSchema)

export default UserGoogle;