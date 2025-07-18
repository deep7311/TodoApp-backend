// register
// login

import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existingUser = await userModel.findOne({email})
        if(existingUser) {
            return res.status(400).json({message: "Email already exists"})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({username, email, password: hashPassword})
        res.status(201).json({message: "User created successfully", user})
    } catch (error) {
        res.status(500).json({message: "Internal server error", error})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user) {
            return res.status(400).json({message: "Invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({message: "Invalid email or password"})
        }

        res.status(200).json({message: "Logged in successfully", user})
    } catch (error) {
        res.status(500).json({message: "Internal server error", error})
    }
}