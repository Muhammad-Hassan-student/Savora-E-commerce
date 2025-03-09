import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoDb from './config/mongoDb.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user.route.js'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';
import categoryRouter from './routes/category.route.js'

//config app
const app = express();
const port = process.env.PORT || 4000;
dotenv.config();
mongoDb();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/category',categoryRouter)

app.get('/',(req,res) => {
    res.send('Server testing ....');
})
app.use((err,req,res,next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,

    });
})
app.listen(port,() => {
    console.log(`Server is running on port: ` + port);
})