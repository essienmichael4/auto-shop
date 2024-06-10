import { Request, Response } from "express";
import log from "../utils/logger";
import * as bcrypt from 'bcrypt'
import { createNewUser, getAllUsers, getUserById } from "../services/user.service";

/**
 * 
 * @param req Request Object
 * @param res Response Object
 * @returns 
 */
export const createUser = async (req:Request, res:Response)=>{
    try{
        const {firstname, lastname, othernames, email, role, departments, password} = req.body

        let hashedPassword:string = ""
        if(password){
            hashedPassword = await bcrypt.hash(password, 10)
        }

        const newUser = createNewUser(firstname, lastname, email, role, departments, othernames, hashedPassword) 

        res.send({newUser, message: "User created successfully"})

    }catch(err:any){
        res.status(400).json(err)
    }
}

/**
 * 
 * @param req Request Object
 * @param res Response Object
 * @returns 
 */
export const getUsers = async (req:Request, res:Response)=>{
    try{
        const users =  getAllUsers()
        res.send(users)
    }catch(err:any){
        res.status(400).json(err)
    }
}

/**
 * 
 * @param req Request Object
 * @param res Response Object
 * @returns 
 */
export const getUser = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params

        const user = await getUserById(Number(id))
        if(!user) return res.sendStatus(404).json({message: `Employee with ID: ${id} was not found.`})

        res.send(user)
    }catch(err:any){
        res.status(400).json(err)
    }
}

/**
 * 
 * @param req Request Object
 * @param res Response Object
 * @returns 
 */
export const updateUserPassword = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params

    }catch(err:any){
        res.status(400).json(err)
    }
}
