import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import log from "./utils/logger"

//Routes
import userRoute from "./routes/user.route"

const port = process.env.PORT || 5001
const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use("/api/v1/user", userRoute)

app.listen(port, ()=>{
    log.info(`Server running on port ${port}`);   
    
})
