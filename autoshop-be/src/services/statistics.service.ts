import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getServicesCount = (from:Date, to: Date)=>{
    return prisma.service.count({
        where:{
            createdAt:{
                lte: DateToUTCDate(new Date(to)),
                gte: DateToUTCDate(new Date(from))
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
                lte: to && DateToUTCDate(new Date(to)),
                gte: from && DateToUTCDate(new Date(from))
            }
        }
    })
}

export const getServices = (from?:Date, to?: Date) => {
    return prisma.service.findMany({
        take: 20,
        where:{
            createdAt:{
                lte: to && DateToUTCDate(new Date(to)),
                gte: from && DateToUTCDate(new Date(from))
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

 function DateToUTCDate(date:Date){
    return new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        )
    )
}
