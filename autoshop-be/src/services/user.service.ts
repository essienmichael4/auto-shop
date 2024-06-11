import { PrismaClient, Role } from '@prisma/client'
const prisma = new PrismaClient()

export const findUserByEmail = (email:string)=>{
    return prisma.user.findUnique({where:{email}, include: {departments:true}})
}

export const findUserById = (id:number)=>{
    return prisma.user.findUnique({where:{id}})
}

export const createNewUser = (firstname:string, lastname:string, email:string, role: Role, departments:string[], othernames?:string)=>{
    return prisma.user.create({data: {
        firstname,
        lastname,
        othernames,
        email,
        status: "Active",
        role,
        departments: {
            connectOrCreate: departments.map(department => {
                return {
                    where: { office : department},
                    create: { office :department}
                };
            })
        }
    }
            
    })
}

export const getAllUsers = () =>{
    return prisma.user.findMany({
        select: {
            departments:true,
            id: true,
            firstname: true,
            lastname: true,
            othernames: true,
            email: true,
            status: true,
            role: true,
        }
    })
}

export const getUserById = (id:number) =>{
    return prisma.user.findUnique({
        where:{id},
        select: {
            departments:true,
            id: true,
            firstname: true,
            lastname: true,
            othernames: true,
            email: true,
            status: true,
            role: true,
        }
    })
}

export const updateUserPassword = (id:number, password:string) =>{
    return prisma.user.update({
        where: {id},
        data:{
            password
        }
    })
}
