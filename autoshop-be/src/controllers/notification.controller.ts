import { Request, Response } from "express";
import { getAllServices } from "../services/service.service";
import { createNotification, getAllNotifications, sendEmail } from "../services/notification.service";

export const getNotifications = async (req:Request, res:Response)=>{
    const notifications = await getAllNotifications()
    res.send(notifications)
}

export const scheduleNotificationAndSendMails = async()=>{
    const services = await getAllServices()

    const due = services.filter(service=>{
        const millisecondsDiff = (new Date(service.dueDate)).valueOf() - (Date.now()).valueOf()
        const duration = Math.round(
            millisecondsDiff / (1000 * 3600 * 24)
        )
        
        if (duration >= 0 && duration <=2){
            return service
        }
    })
        
    if(!due) return

    await createNotification(due)

    await sendEmail(due)
}


