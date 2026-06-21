require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const businessRoutes = require('./routes/business.route')

const PORT = 5000;

const app = express()
app.use(express.json())

app.use('/api',businessRoutes)

app.get('/api/health',async(req,res)=>{
    res.status(200).json({
        message:'EvertThing is Fine'
    })
})

const startServer = async () =>{
    connectDB().then(()=>{
        app.listen(PORT,()=>{
            console.log(`Server is running on ${PORT}`)
        })
    }).catch((err)=>{
        console.log(err.message)
    })
}

startServer();