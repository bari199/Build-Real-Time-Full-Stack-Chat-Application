import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';




export const signup = async (req,res) => {
    const {fullName, email, password, bio} = req.body;
    try{
        if(!fullName || !email || !password || !bio){
            return res.json({success:false, message:"Missing Details"})
        }
        const user = await User.findOne({email});
        if(user){
             return res.json({success:false, message:"Account already exists "})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User({
            fullName,
            email,
            password: hashedPassword,
            bio
        });
        const token = generateToken(newUser._id)
        res.json({success:true, userData:newUser,token, message:"Account created successfully"});

    }catch(error){
        console.error("Error during user signup:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

// Controller to login a user 
export const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        const userData = await User.findOne({email})
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if(!userData){
            return res.json({success:false, message:"Account does not exist"})
        }
    } catch (error) {
        
    }
}
