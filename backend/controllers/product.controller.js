import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/product.model.js';

//add products
const addProduct = async (req,res) => {

    try {
        const {name,description,price,category,subCategory,sizes,bestSeller} = req.body;

       const imagea =req.files.image1 && req.files.image1[0] 
       const imageb =req.files.image2 && req.files.image2[0] 
       const imagec =req.files.image3 && req.files.image3[0] 
       const imaged =req.files.image4 && req.files.image4[0] 

       const images = [imagea,imageb, imagec, imaged].filter((item) => item !== undefined);
       
        let imagesUrl = await Promise.all(
            images.map(async(item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'});
                return result.secure_url;
            })
        )

            const productData = {
                name,
                description,
                price:Number(price),
                category,
                subCategory,
                bestSeller: bestSeller === "true" ? true : false,
                sizes: JSON.parse(sizes),
                image: imagesUrl,
                date: Date.now(),

            }
            console.log(productData);
            const product = new productModel(productData);
            await product.save();

            await res.status(200).json({success:true, message: "Add product successfully"});

    } catch (error) {
        console.log(error);
        res.json({status:500,success: false, message: error.message});
    }

}
//add products
const listProducts = async (req,res) => { 
    try {
        const products = await productModel.find({});
        res.json({success: true, products});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}
//add products
const removeProduct = async (req,res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Remove product successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}
//add products
const singleProduct = async (req,res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, message: product});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export  {addProduct, listProducts, removeProduct, singleProduct};