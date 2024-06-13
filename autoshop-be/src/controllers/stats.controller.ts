import { Request, Response } from "express";
import log from "../utils/logger";
import { AuthRequest } from "../types/authRequest.type";
import { differenceInPercentage, getCustomersCount, getServices, getServicesCount } from "../services/statistics.service";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import { title } from "process";

export const getStatistics = async (req:Request, res:Response)=>{
    const {from, to} = req.query
    const servicesCount = await getServicesCount(new Date(from as string), new Date(to as string))
    const lastMonthServicesCount = await getServicesCount(startOfMonth(new Date().setDate(0)), endOfMonth(new Date().setDate(0)))
    const currentMonthServicesCount = await getServicesCount(startOfMonth(new Date()), endOfMonth(new Date()))
    const yesterdayServicesCount = await getServicesCount(startOfDay(new Date()), endOfDay(new Date()))
    const todayServicesCount = await getServicesCount(startOfDay(new Date()), endOfDay(new Date()))

    const customersCount = await getCustomersCount()
    const newCustomersCount = await getCustomersCount(startOfMonth(new Date()), endOfMonth(new Date()))

    const data = {
        monthStats: {
            title: "Services",
            currentService: servicesCount,
            currentMonthServices: currentMonthServicesCount,
            percentageDifferenceFromPreviousMonth: differenceInPercentage(servicesCount, lastMonthServicesCount)
        },dayStats:{
            title: "Today's Services",
            currentDayServices: todayServicesCount,
            percentageDifferenceFromPreviousDay: differenceInPercentage(todayServicesCount, yesterdayServicesCount)
        },customerStats:{
            title: "Customers",
            all: customersCount,
            new: newCustomersCount
        }
    }

    res.send(data)
}

export const getRecentServices = async (req:Request, res:Response)=>{
    const {from, to} = req.query
    const services = await getServices(new Date(from as string), new Date(to as string))
    res.send(services)
}
