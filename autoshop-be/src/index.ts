import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import log from "./utils/logger"

//Routes
import userRoute from "./routes/user.route"
import authRoute from "./routes/auth.route"
import customerRoute from "./routes/customer.route"
import serviceRoute from "./routes/service.route"

const port = process.env.PORT || 5001
const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use("/api/v1", authRoute)
app.use("/api/v1", userRoute)
app.use("/api/v1", customerRoute)
app.use("/api/v1", serviceRoute)

app.listen(port, ()=>{
    log.info(`Server running on port ${port}`);   
    
})
