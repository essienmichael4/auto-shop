import * as jwt from 'jsonwebtoken'

export const generateJWT = (email:string, id:number, firstname:string, lastname:string, time: string) => {
    const payload = {
        username: email,
        dub: {
            id: id,
            name: `${firstname} ${lastname}`
        }
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {expiresIn: time})
}
