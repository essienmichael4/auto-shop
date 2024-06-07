import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createNewCustomer = (addedBy:number, firstname:string, lastname:string, email:string, phones:string[], othernames?:string)=>{
    return prisma.customer.create({data: {
        firstname,
        lastname,
        othernames,
        email,
        user: {
            connect: {
                id: addedBy
            }
        },
        phones: {
            createMany: {
                data: phones.map(phone => {
                    return {number: phone}
                })
            }
        }
    }
            
    })
}

export const getAllCustomers = () =>{
    return prisma.customer.findMany({include: {
        phones:true,
        services: {
            orderBy: {id: "desc"},
            take: 3
        }
    }})
}

export const getCustomerById = (id:number) =>{
    return prisma.customer.findUnique({
        where:{id},
        include: {
        phones:true,
        services: {
            orderBy: {id: "desc"},
        }
    }})
}
