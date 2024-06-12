import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createNewService = (addedBy:number, servicedBy:number, customerid:number, dueDate:string, name:string, description?:string) =>{
    return prisma.service.create({
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
