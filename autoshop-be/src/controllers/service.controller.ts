import { Request, Response } from "express";
import log from "../utils/logger";
import { AuthRequest } from "../types/authRequest.type";
import { UpdateServiceByID, createNewService, getAllServices, getServiceByID } from "../services/service.service";

/**
 * 
 * @param req Request Object
 * @param res Response Object
 * @returns 
 */
export const createService = async (req:AuthRequest, res:Response)=>{
    try{
        const {customer, servicer, dueDate, name, description} = req.body
        const account = req.tokenAccount

        const newService = await createNewService(account!.dub.id, Number(servicer), Number(customer), dueDate, name, description)

        res.send({newService, message: "Service created successfully"})

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
export const getServices = async (req:Request, res:Response)=>{
    try{
        const services = await getAllServices()
        res.send(services)
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
export const updateService = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params

        const service = await getServiceByID(Number(id))
        res.send(service)
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
export const getService = async (req:AuthRequest, res:Response)=>{
    try{
        const {id} = req.params
        const {customer, servicer, dueDate, name, description} = req.body
        const account = req.tokenAccount

        const updatedService = await UpdateServiceByID(Number(id), account!.dub.id, Number(servicer), Number(customer), dueDate, name, description)
    }catch(err:any){
        res.status(400).json(err)
    }
}
