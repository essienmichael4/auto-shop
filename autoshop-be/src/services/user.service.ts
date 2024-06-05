import { PrismaClient, Role } from '@prisma/client'
const prisma = new PrismaClient()

export const findUserByEmail = (email:string)=>{
    return prisma.user.findUnique({where:{email}, include: {departments:true}})
}

export const findUserById = (id:number)=>{
    return prisma.user.findUnique({where:{id}})
}

export const createNewUser = (firstname:string, lastname:string, email:string, role: Role, departments: {office: string}[], othernames?:string, password?:string)=>{
    return prisma.user.create({data: {
        firstname,
        lastname,
        othernames,
        password,
        email,
        status: "Active",
        role,
        departments: {
            connectOrCreate: departments.map(department => {
                return {
                    where: { office : department.office},
                    create: { office :department.office}
                };
            })
        }
    }
            
    })
}
