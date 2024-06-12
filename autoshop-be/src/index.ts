import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import log from "./utils/logger"
import cron from "node-cron"

//Routes
import userRoute from "./routes/user.route"
import authRoute from "./routes/auth.route"
import customerRoute from "./routes/customer.route"
import serviceRoute from "./routes/service.route"
import notificationRoute from "./routes/notification.route"
import { scheduleNotificationAndSendMails } from "./controllers/notification.controller";

const port = process.env.PORT || 5001
const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use("/api/v1", authRoute)
app.use("/api/v1", userRoute)
app.use("/api/v1", customerRoute)
app.use("/api/v1", serviceRoute)
app.use("/api/v1", notificationRoute)

app.listen(port, ()=>{
    log.info(`Server running on port ${port}`);   
    
})

cron.schedule("0 6 * * *", ()=>{
    console.log("------------------------")
    console.log("Running task")
    scheduleNotificationAndSendMails()
})
