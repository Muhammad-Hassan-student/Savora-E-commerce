import { errorHandler } from "../middleware/error.js";
import categoryModel from "../models/category.model.js";

const generateSlug = (name) => {
    const formattedName = name
        .toLowerCase()          // Small letters
        .replace(/[^a-z0-9 ]/g, '') // Special characters hataye
        .replace(/\s+/g, '-')   // Spaces ko "-" se replace kiya
        .substring(0, 20);      // 20 characters tak limit kiya

    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `${formattedName}-${randomNum}`;
};


export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    //
    const namexist = await categoryModel.findOne({ name });
    if (namexist) {
      return next(errorHandler(400, `${name} is already exist in categories`));
    }
    
    const newCategory = new categoryModel({
      name,
      slug: generateSlug(name),
    });
    await newCategory.save();
    res.status(201).json({
        success: true,
        message: `${name} category is created`,
        newCategory});
  } catch (error) {
    console.log("Error in create category", error);
    next();
  }
};

//Update Category
export const update = async (req,res,next) => {
    try {
        const {name} = req.body;
        const {id} = req.params;

        const category = await categoryModel.findByIdAndUpdate(id,{name,slug: generateSlug(name)},{new: true});
        res.status(200).json(category);
    } catch (error) {
        console.log('error in update category', erorr);
        next();
    }
}

export const allCategories = async (req,res,next) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log("erorr in get all categories", error);
        next();
    }
}

export const singleCategory = async (req,res,next) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug});
        res.status(201).json(category);
    } catch (error) {
        console.log('error in get single category', error);
        next();
    }
}

export const deleteCat = async (req,res,next) => {
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true,message: "This category is deleted successfully"});
    } catch (error) {
        console.log("Error in delete category controller ",error);
        next();
    }
}