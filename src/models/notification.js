import { Schema, model, models } from "mongoose";


const NotificationSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["unread", "read"],
        default: "unread",
    },
}, { timestamps: true })

const NotificationModel = models.Notification || model('Notification', NotificationSchema);

export default NotificationModel;