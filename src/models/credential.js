import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";



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

    image: {
        type: String,

    },
    role: {
        type: String,
        default: 'user',
    },
    provider: {
        type: String,
        default: 'credentials'
    },
    status: {
        type: String,
        default: 'active', // You can set the default status as 'active'
    },
    notifications: [
        {
            sender: {
                name: {
                    type: String,
                    required: false,
                },
                image: {
                    type: String,
                },
            },

            message: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                enum: ["unread", "read"],
                default: "unread",
            },

            statusFile: {
                type: String,
                ref: 'FileSignatory',
            },
            // time
            timestamps: {
                type: Date,
                default: Date.now,
            }
        },
    ],



}, { timestamps: true })

CredentialSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const hashedPassword = await bcrypt.hash(this.password, 12)
        this.password = hashedPassword
    }
    next()
})

// method to compare password for login
CredentialSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const Credential = models.Credential || model("Credential", CredentialSchema)

export default Credential;