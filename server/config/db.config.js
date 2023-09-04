import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectToDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    if (connect) {
      console.log("DB connected to successfully");
    }
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

export default connectToDb;
