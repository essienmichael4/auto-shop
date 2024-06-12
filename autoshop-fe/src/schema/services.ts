import { z } from "zod";

export const CreateNewServiceSchema = z.object({
    dueDate: z.coerce.date(),
    customer: z.coerce.number().positive(),
    servicer: z.coerce.number().positive(),
    name: z.string().min(2, {
        message: "Must be a valid service rendered"
    }),
    description: z.string().optional()
})

export type CreateNewServiceSchemaType = z.infer<typeof CreateNewServiceSchema>
