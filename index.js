const express = require ('express');
const app = express();
const cors = require ('cors');
const dotenv = require ('dotenv');
dotenv.config()
const emailRoute = require('./routes/emailRoute.js')
const Port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/', emailRoute)

app.listen(Port, ()=>{
    console.log(`Server is up and listening on port ${Port}`)
})
