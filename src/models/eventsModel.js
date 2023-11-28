import { Schema, model, models } from "mongoose"

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    allDay: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        // Reference to the Credential model and UserGoogle model
        ref: 'Credential',
        required: true,
    },
}, { timestamps: true });

const EventModel = model('Event', eventSchema);

export default EventModel;
