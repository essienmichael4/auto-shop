import { Request, Response } from "express";
import log from "../utils/logger";
import * as bcrypt from 'bcrypt'
import { createNewUser } from "../services/user.service";

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
