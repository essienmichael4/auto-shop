import { Request, Response } from "express";
import log from "../utils/logger";
import { AuthRequest } from "../types/authRequest.type";
import { createNewCustomer, getAllCustomers, getCustomerById } from "../services/customer.service";

/**
 * 
 * @param req Request Object
 * @param res Response Object
 * @returns 
 */
export const createCustomer = async (req:AuthRequest, res:Response)=>{
    try{
        const {firstname, lastname, othernames, email, phones} = req.body
        const account = req.tokenAccount

        const newCustomer = await createNewCustomer(account!.dub.id, firstname, lastname, email, phones, othernames)

        res.send({newCustomer, message: "Customer added successfully"})
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
export const getCustomers = async (req:AuthRequest, res:Response)=>{
    try{
        const customers = await getAllCustomers()

        res.send(customers)
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
export const getCustomer = async (req:AuthRequest, res:Response)=>{
    try{
        const {id} = req.params

        const customer = await getCustomerById(Number(id))
        if(!customer) return res.sendStatus(404).json({message: `Customer with ID: ${id} was not found.`})

        res.send(customer)
    }catch(err:any){
        res.status(400).json(err)
    }
}
