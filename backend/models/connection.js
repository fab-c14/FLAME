import { connect } from "mongoose";

const connectDB = async () => {
    try {
        await connect('mmjuSkiuWINMk8zH', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
