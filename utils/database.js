import mongoose from "mongoose";

const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (mongoose.connection.readyState === 1) {
        console.log("✅ MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompts",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        });

        console.log("🚀 MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};

export default connectToDB;
