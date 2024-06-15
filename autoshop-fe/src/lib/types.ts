import { Dispatch, SetStateAction } from "react"

export type AuthType = {
    user:{
        firstname:string,
        lastname: string,
        othernames?: string,
        email: string
    },
    backendTokens: {
        accessToken: string,
        refreshToken: string
    }
}

export type AuthContextType = {
    auth: AuthType | undefined,
    setAuth: Dispatch<SetStateAction<AuthType | undefined>>;
}

export type Customer = {
    id:number
    firstname:string
    lastname:string
    othernames?:string,
    email:string,
    phones:{number:string}[]
}

export type Employee = {
    id:number
    firstname:string
    lastname:string
    othernames?:string,
    email:string,
    status: string,
    role?: string
    departments:{office:string}[]
}

export type Service = {
    id:number
    createdAt:string
    dueDate:string,
    name: string,
    customer: {
        firstname:string
        lastname:string
        othernames?:string,
        email:string,
        phones:{number:string}[]
    },
    servicer: {
        firstname:string
        lastname:string
        othernames?:string,
        email:string,
        departments:{office:string}[]
    }
}

export type Notification= {
    id: number,
    message: string,
    createdAt: string
}

export type Stats = {
    monthStats: {
        title: string,
        currentService: number,
        currentMonthServices: number,
        percentageDifferenceFromPreviousMonth: number
    },dayStats:{
        title: string,
        currentDayServices: number,
        percentageDifferenceFromPreviousDay: number
    },customerStats:{
        title: string,
        all: number,
        new: number
    }
}

export type HistoryResponseType = {
    services: number,
    year: number,
    month: number,
    day?: number
}
