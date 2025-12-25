import mongoose from "mongoose";
const connectdb=async()=>{
    try{
        const MongoURL=`${process.env.MONGO_URL}/ChatApp`;
        await mongoose.connect(MongoURL)
        console.log("MongoDB connected :) ")
    }
    catch(err){
        console.log("MongoDB not connected :(") 
        console.log(err)
    }
}
export default connectdb