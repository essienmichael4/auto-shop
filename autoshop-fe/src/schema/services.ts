import { z } from "zod";

export const CreateNewServiceSchema = z.object({
    dueDate: z.coerce.date(),
    customer: z.coerce.number().positive(),
    servicer: z.coerce.number().positive()
})

export type CreateNewServiceSchemaType = z.infer<typeof CreateNewServiceSchema>
