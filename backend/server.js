import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoDb from './config/mongoDb.js'
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/user.route.js'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';

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

app.get('/',(req,res) => {
    res.send('Server testing ....');
})

app.listen(port,() => {
    console.log(`Server is running on port: ` + port);
})