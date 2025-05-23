import express from 'express';
import 'express-async-errors';
import cors from 'cors'

import dotenv from 'dotenv'
import { notFound } from './middlewares/notFound.js'
import {errorHandleMiddleware} from './middlewares/errorHandleMiddleware.js'
import { connectDB } from './config/configDB.js';
import productRoute from './routes/product.route.js'
import authRoute from './routes/auth.route.js'
const app = express()

// middlewares
dotenv.config()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 5000


// routes
app.use('/api/products', productRoute);
app.use('/api/auth', authRoute);


app.use(notFound)
app.use(errorHandleMiddleware)


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`)
})



