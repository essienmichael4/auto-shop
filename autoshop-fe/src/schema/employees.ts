import { z } from "zod";

export const CreateNewEmployeeSchema = z.object({
    firstname: z.string().min(2, {
        message: "Firstname must be a valid firstname"
    }),
    lastname: z.string().min(2, {
        message: "Lastname must be a valid lastname"
    }),
    othernames: z.string().optional(),
    email: z.string().email({
        message: "Email must be a valid email."
    }),
    departments: z.string().array(),
    role: z.enum(["ADMIN", "SUPERADMIN", "USER"])
})

export type CreateNewEmployeeSchemaType = z.infer<typeof CreateNewEmployeeSchema>
