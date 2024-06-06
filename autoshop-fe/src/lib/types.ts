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
