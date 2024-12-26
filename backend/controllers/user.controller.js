import userModel from "../models/user.model.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//create token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

//Route for Login the user
const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message: "User doesn't exist"});
        }

        const comparePassword = await bcrypt.compare(password,user.password);
        if(comparePassword){
            const token = createToken(user._id);
            res.json({success: true,token});
        }else{
            res.json({success: false, message: "Invalid credential"});
        }
        
    } catch (error) {
        console.log(error);
        res.json({success: false, messgae: error.message});
    }
}

//Route for Register the user
const registerUser = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        //checking the user
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false, message:"User is already exist"});
        }
        //validating email and format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"});
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please enter strong password"});
        }

        //const hashedPassword = await bcrypt/hashSync(password,10); 
        // or
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = createToken(newUser._id);
        res.status(200).json({success: true, token});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }

}

//Route for admin 
const admin = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true,  token});
        }else{
            res.json({success: false, message: "Inavlid credential"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export  {loginUser, registerUser, admin}