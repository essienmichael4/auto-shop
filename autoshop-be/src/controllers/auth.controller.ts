import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import log from "../utils/logger";
import { findUserByEmail } from "../services/user.service";
import { generateJWT } from "../services/auth.service";
import { AuthRequest } from "../types/authRequest.type";

/**
 * 
 * @param req Request Object
 * @param res Response Object
 * @returns Object containing a User and JWT tokens
 */
export const loginUser = async (req:Request, res:Response)=>{
    try{
        const {email, password} = req.body

        log.info(req.body)

        let user = await findUserByEmail(email)

        if(!user){
            return res.status(401).json({error: "User does not exist"})
        }

        if(user.status == "DISABLED"){
            return res.status(401).json({error: "User account does not have permission to login anymore. If there is a problem, contact a Manager."})
        }

        if(!user.password){
            return res.status(401).json({error: "User account does not have login permission. If this is a mistake, contact a Manager to assign your account a password."})
        }

        let passVerify = await bcrypt.compare(password, user.password)
        if(!passVerify){
            if(password == user.password){
                passVerify = true
            }
        }
        if(!passVerify){
            return res.status(401).json({error: "User credentials invalid"})
        }

        delete (user as any).password

        res.send({
            user,
            backendTokens: {
                accessToken: generateJWT(user.email, user.id,user.firstname, user.lastname, '1h'),
                refreshToken: generateJWT(user.email, user.id,user.firstname, user.lastname, '7d')
            }
        })
    }catch(err:any){
        res.status(400).json(err)
    }
}

/**
 * 
 * @param req Request Object
 * @param res Response Object
 * @returns Object containing JWT tokens
 */
export const refreshToken = async (req:AuthRequest, res:Response)=>{
    try{    
        const tokenAccount = req.tokenAccount

        if(!tokenAccount){
            return res.status(401).json({message: "Unauthorized"})
        }

        res.send({
            accessToken: generateJWT(tokenAccount!.username, tokenAccount!.dub.id, tokenAccount!.dub.name.split(" ")[0], tokenAccount!.dub.name.split(" ")[1], '1h'),
            refreshToken: generateJWT(tokenAccount!.username, tokenAccount!.dub.id, tokenAccount!.dub.name.split(" ")[0], tokenAccount!.dub.name.split(" ")[1], '7d')
        })
    }catch(err:any){
        res.status(400).json(err)
    }
}
