import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createNewService = (addedBy:number, servicedBy:number, customerid:number, dueDate:string, name:string, description?:string) =>{
    return prisma.$transaction([

        prisma.service.create({
            data:{
                customerid,
                servicedBy,
                addedBy,
                dueDate,
                name,
                description
            },
            include: {
                servicer:{
                    select: {
                        firstname: true,
                        lastname: true,
                        othernames: true,
                    }
                },
                customer:{
                    select: {
                        firstname: true,
                        lastname: true,
                        othernames: true,
                        email: true,
                        phones:true
                    }
                },
            }
        }),
    
        prisma.monthHistory.upsert({
            where:{
                day_month_year:{
                    day: new Date().getUTCDate(),
                    month: new Date().getUTCMonth(),
                    year: new Date().getUTCFullYear()
                }
            },
            create:{
                day: new Date().getUTCDate(),
                month: new Date().getUTCMonth(),
                year: new Date().getUTCFullYear(),
                services: 1
            },
            update: {
                services: {increment: 1},
            }
        }),
    
        prisma.yearHistory.upsert({
            where:{
                month_year:{
                    month: new Date().getUTCMonth(),
                    year: new Date().getUTCFullYear()
                }
            },
            create:{
                month: new Date().getUTCMonth(),
                year: new Date().getUTCFullYear(),
                services: 1
            },
            update: {
                services: {increment: 1},
            }
        })
    ])

    
    
}

export const getServiceByID = (id:number) =>{
    return prisma.service.findUnique({
        where: {
            id
        },
        include: {
            servicer:{
                select: {
                    firstname: true,
                    lastname: true,
                    othernames: true,
                }
            },
            customer:{
                select: {
                    firstname: true,
                    lastname: true,
                    othernames: true,
                    email: true,
                    phones:true
                }
            },
        }
    })
}

export const getAllServices = () =>{
    return prisma.service.findMany({
        include: {
            servicer:{
                select: {
                    firstname: true,
                    lastname: true,
                    othernames: true,
                }
            },
            customer:{
                select: {
                    firstname: true,
                    lastname: true,
                    othernames: true,
                    email: true,
                    phones:true
                }
            },
        }
    })
}

export const UpdateServiceByID = (id:number, addedBy:number, servicedBy:number, customerid:number, dueDate:string, name:string, description?:string) =>{
    return prisma.service.update({
        where: {
            id
        },
        data:{
            customerid,
            servicedBy,
            addedBy,
            dueDate,
            name,
            description
        },
        include: {
            servicer:{
                select: {
                    firstname: true,
                    lastname: true,
                    othernames: true,
                }
            },
            customer:{
                select: {
                    firstname: true,
                    lastname: true,
                    othernames: true,
                    email: true,
                    phones:true
                }
            },
        }
    })
}
