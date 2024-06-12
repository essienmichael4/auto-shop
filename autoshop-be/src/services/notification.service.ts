import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import nodemailer from 'nodemailer';

export type Service = {
    id:number
    createdAt:Date
    dueDate:Date,
    name: string,
    customer: {
        firstname:string
        lastname:string
        othernames:string | null,
        email:string,
        phones:{number:string}[]
    },
    servicer: {
        firstname:string
        lastname:string
        othernames:string | null
    }
}

export const getAllNotifications = ()=>{
    return prisma.notifications.findMany()
}

export const createNotification = (services:Service[]) =>{    
    return prisma.notifications.createMany({
        data: services.map(service=>{
            const millisecondsDiff = (new Date(service.dueDate)).valueOf() - (Date.now()).valueOf()
            const duration = Math.round(millisecondsDiff / (1000 * 3600 * 24))
            let notification = ""

            if(duration === 0) notification = `${service.customer.firstname} ${service.customer.lastname} ${service.customer.othernames} has a service which is due today on ${service.dueDate}. A similar message has already been delivered to ${service.customer.firstname} ${service.customer.lastname} ${service.customer.othernames} but you might need to double check with ${service.customer.firstname} ${service.customer.lastname} ${service.customer.othernames} to confirm receipt and if they will be able to meet the deadline.
                Thank you.`
             
            if(duration === 1) notification = `${service.customer.firstname} ${service.customer.lastname} ${service.customer.othernames} has a service which is due tomorrow on ${service.dueDate}. A similar message has already been delivered to ${service.customer.firstname} ${service.customer.lastname} ${service.customer.othernames} but you might need to double check with ${service.customer.firstname} ${service.customer.lastname} ${service.customer.othernames} to confirm receipt and if they will be able to meet the deadline.
                Thank you.`
             
            if(duration === 2) notification = `${service.customer.firstname} ${service.customer.lastname} ${service.customer.othernames} has a service which is due in the next two days on ${service.dueDate}. A similar message has already been delivered to ${service.customer.firstname} ${service.customer.lastname} ${service.customer.othernames} but you might need to double check with ${service.customer.firstname} ${service.customer.lastname} ${service.customer.othernames} to confirm receipt and if they will be able to meet the deadline.
                Thank you.`
             
            return {
                message: `${service.customer.firstname} ${service.customer.lastname} ${service.customer.othernames} has a service which is due in the next two days on ${service.dueDate}. A similar message has already been delivered to ${service.customer.firstname} ${service.customer.lastname} ${service.customer.othernames} but you might need to double check with ${service.customer.firstname} ${service.customer.lastname} ${service.customer.othernames} to confirm receipt and if they will be able to meet the deadline.
                Thank you.`
            }
        })
    })

}

export const sendEmail = async (services:Service[])=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_SENDER,
          pass: process.env.EMAIL_PASSWORD,
        },
    });

    services.forEach(async (service) => {
        const millisecondsDiff = (new Date(service.dueDate)).valueOf() - (Date.now()).valueOf()
        const duration = Math.round(millisecondsDiff / (1000 * 3600 * 24))
        let text = ""

        const { to, subject } = {
            to: service.customer!.email,
            subject: "Auto Shop service due"
        }

        if(duration === 0) text= `
        Hi ${service.customer.firstname},
        Your car service with Auto Shop which was last rendered on ${service.createdAt} is due today. An attendant will be reaching out to you shortly to know if you will able to keep the appointment.
        If you have any concerns, you can reach out to our customer care on 0200000000.
        Thank you.
        `
             
        if(duration === 1) text= `
        Hi ${service.customer.firstname},
        Your car service with Auto Shop which was last rendered on ${service.createdAt} is due tomorrow. An attendant will be reaching out to you shortly to know if you will able to keep the appointment.
        If you have any concerns, you can reach out to our customer care on 0200000000.
        Thank you.
        `
            
        if(duration === 2) text= `
        Hi ${service.customer.firstname},
        Your car service with Auto Shop which was last rendered on ${service.createdAt} is due on ${service.dueDate}. An attendant will be reaching out to you shortly to know if you will able to keep the appointment.
        If you have any concerns, you can reach out to our customer care on 0200000000.
        Thank you.
        `

        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to,
            subject,
            text,
          };
      
        await transporter.sendMail(mailOptions);
    })
}
