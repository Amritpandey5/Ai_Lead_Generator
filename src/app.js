require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const businessRoutes = require('./routes/business.route');
const leadRoutes = require('./routes/lead.routes');
const outReachRoutes = require('./routes/outreach.routes')

// PORT

const PORT = 5000;

const app = express()

// Middleware

app.use(express.json())

//Routes

app.use('/api',businessRoutes);
app.use('/api',leadRoutes);
app.use('/api',outReachRoutes);

app.get('/api/health',async(req,res)=>{
    res.status(200).json({
        message:'EvertThing is Fine'
    })
})

// Server

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