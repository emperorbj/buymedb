const express = require('express')
const mongoose = require('mongoose')
const app = express()

// CONNECTION WITH MONGODB
mongoose.connect("mongodb+srv://cwaku96:AEUmQP9AMX3kW9jm@backenddb.1vaa7.mongodb.net/free-api?retryWrites=true&w=majority&appName=backenddb")
.then(() => {
    console.log('Connected!')
    app.listen(3000, () => {
        console.log("server running port 3000");
        
    })
})
.catch(() => console.log('connection failed')
)

// API END POINTS
app.get('/', (req,res) => {
    res.send('testing api');
})

