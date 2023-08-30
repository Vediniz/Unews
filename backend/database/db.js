import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        console.log("Connecting to the database...");
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectDatabase;
