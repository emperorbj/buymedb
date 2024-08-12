const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Product = require('./models/product.model')
const app = express()
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

// API END POINTS
app.get('/', (req,res) => {
    res.send('testing api');
})

app.post('/products', async (req,res) => {
    console.log("Incoming POST request to /products with body:", req.body);
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }
    catch(error){
        console.error("Error creating product:", error); 
        res.status(500).json({message: error.message})
    }
})

