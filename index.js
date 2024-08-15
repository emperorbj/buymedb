const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Product = require('./models/product.model')
const app = express()
const productRoute = require("./routes/product.route")

// middlewares
app.use(express.json())
app.use(cors())



// CONNECTION WITH MONGODB
mongoose.connect("mongodb+srv://cwaku96:AEUmQP9AMX3kW9jm@backenddb.1vaa7.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backenddb")
.then(() => {
    console.log('Connected!')
    app.listen(8000, () => {
        console.log("server running port 8000");
        
    })

})
.catch(() => console.log('connection failed')
)

// routes
app.use('/api/products', productRoute);

// API END POINTS
app.get('/', (req,res) => {
    res.send('testing api');
})


// Get all products
// app.get('/api/products', async (req,res) => {
//     try{
//         const products = await Product.find({})
//         res.status(200).json(products)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })


// get a single product
// app.get('/api/products/:id', async (req,res) =>{
//     try{
//         const id = req.params.id
//         console.log(id);
//         const product = await Product.findById(id)
//         res.status(200).json(product)
        
//     }
//     catch(error) {
//         res.status(500).json({message: error.message})
//     }
// })


// post products
// app.post('/api/products', async (req,res) => {
    
//     try{
//         const product = await Product.create(req.body)
//         res.status(200).json(product);
//     }
//     catch(error){
//         console.error("Error creating product:", error); 
//         res.status(500).json({message: error.message})
//     }
// })


// update product by id
// app.put('/api/products/:id', async (req,res) => {
//     try{
//         const id = req.params.id
//         const product = await Product.findByIdAndUpdate(id, req.body)

//         if(!product){
//             return res.status(404).json({message: "Product not found"})
//         }

//         const updatedProduct = await Product.findById(id)
//         res.status(200).json(updatedProduct)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })


// delete product by id
// app.delete('/api/products/:id', async (req,res) => {
//     try{
//         const id = req.params.id
//         const product = await Product.findByIdAndDelete(id)
//         if(!product){
//             return res.status(404).json({message: "Product not found"})
//         }
//         res.status(200).json({message: "Product deleted successfully"})
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

