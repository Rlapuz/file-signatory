import mongoose from "mongoose";

// Create a variable to track whether the connection has been established
let isConnected = false;

const connectDB = async () => {
    try {
        if (!isConnected) {
            // If not connected, establish the connection
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            isConnected = true;
            console.log("Connected to MongoDB");
        }
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

export default connectDB;
