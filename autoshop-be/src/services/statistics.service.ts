import { PrismaClient } from '@prisma/client'
import { getDaysInMonth } from 'date-fns'
const prisma = new PrismaClient()

type HistoryData = {
    services: number,
    year: number,
    month: number,
    day?: number
}

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

export const getHistoryData = async(timeframe: "MONTH" | "YEAR", month:number, year:number) => {
    if(timeframe = "YEAR"){
        return await getYearHistory(year)
    }
    if(timeframe = "MONTH"){
        return await getMonthHistory(month, year)
    }
}

export const getMonthHistory = async (month:number, year:number) => {
    const result = await prisma.monthHistory.groupBy({
        by:["day"],
        where:{
            month,
            year
        },
        _sum:{services:true},
        orderBy:{day:"asc"}
    })

    if(!result || result.length === 0) return []

    const history:HistoryData[] = []
    const daysInMonth = getDaysInMonth(new Date(year, month))

    for(let i = 1; i <= daysInMonth; i++){
        let services = 0

        const day = result.find(row => row.day === i)
        if(day){
            services = day._sum.services || 0
        }

        history.push({
            year,
            month,
            services,
            day: i
        })
    }
    
    return history
}

export const getYearHistory = async(year:number) => {
    const result = await prisma.yearHistory.groupBy({
        by: ["month"],
        where:{
            year
        },
        _sum: {
            services: true
        },
        orderBy:{
            month: "asc"
        }
    })

    if(!result || result.length == 0) return []

    const history:HistoryData[] = []

    for(let i=0; i < 12; i++){
        let services = 0

        const month = result.find(row => row.month === i)
        if(month){
            services = month._sum.services || 0
        }

        history.push({
            year,
            month: i,
            services
        })
    }

    return history
}
