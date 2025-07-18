// email, password (use bcrypt)
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String}
})

const userModel = mongoose.model("User", userSchema)

export default userModel