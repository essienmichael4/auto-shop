import { z } from "zod";

export const CreateNewCustomerSchema = z.object({
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
    phones: z.string().array()
})

export type CreateNewCustomerSchemaType = z.infer<typeof CreateNewCustomerSchema>
