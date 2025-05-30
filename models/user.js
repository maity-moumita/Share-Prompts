import { Schema, model, models } from "mongoose";

 const userSchema = new Schema({
    email: {
        type:String,
        unique: [true,'Email already exists!'],
        required: [true,'Email is required!'],
    },
    username: {
        type: String,
        required: [true,'Username is Required!'],
        match: [/^[a-zA-Z0-9._-]{3,20}$/,"Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    }
 },)

 const User = models.User || model("User",userSchema);

 export default User;