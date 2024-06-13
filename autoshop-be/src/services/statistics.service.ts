import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getServicesCount = (from:Date, to: Date)=>{
    return prisma.service.count({
        where:{
            createdAt:{
                lte: new Date(to).toISOString(),
                gte: new Date(from).toISOString()
            }
        }
    })
}

export const differenceInPercentage = (first:number, second:number) => {
    const difference = first - second
    const average = (first + second) / 2
    const percentageDifference = (difference / average) * 100
    return percentageDifference
}

export const getCustomersCount = (from?:Date, to?: Date) => {
    return prisma.customer.count({
        where:{
            createdAt:{
                lte: to && new Date(to).toISOString(),
                gte: from && new Date(from).toISOString()
            }
        }
    })
}

export const getServices = (from?:Date, to?: Date) => {
    return prisma.service.findMany({
        take: 20,
        where:{
            createdAt:{
                lte: to && new Date(to).toISOString(),
                gte: from && new Date(from).toISOString()
            },
        },include: {
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
