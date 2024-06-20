import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../../components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { CreateNewCustomerSchema, CreateNewCustomerSchemaType } from '@/schema/customers'
import { InputTags } from '../ui/InputTags'
import { Button } from '../ui/button'
import { axios_instance } from '@/api/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import useAuth from '@/hooks/useAuth'
import { Customer } from '@/lib/types'

interface Props{
    trigger?: React.ReactNode,
    successCallback?: (customer:Customer)=>void
}

const CreateNewCustomerDialog = ({trigger, successCallback}:Props) => {
    const {auth} = useAuth()
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const form = useForm<CreateNewCustomerSchemaType>({
        resolver:zodResolver(CreateNewCustomerSchema),
        defaultValues:{
            firstname:"",
            lastname: "",
            othernames: "",
            email: "",
            phones: []
        }
    })

    const createCustomer = async (data:CreateNewCustomerSchemaType)=>{
        const response = await axios_instance.post("/customers", {
            ...data
        }, {
            headers: {
                Authorization: `Bearer ${auth?.backendTokens.accessToken}`
            }
        })

        return response.data
    }

    const {mutate, isPending} = useMutation({
        mutationFn: createCustomer,
        onSuccess: (data)=>{
            toast.success(data.message, {
                id: "create-customer"
            })

            form.reset({
                firstname:"",
                lastname: "",
                othernames: "",
                email: "",
                phones: []
            })

            if(successCallback) successCallback(data)

            queryClient.invalidateQueries({queryKey: ["customers"]})

            setOpen(prev => !prev)
        }
    })

    const onSubmit = (data:CreateNewCustomerSchemaType)=>{
        toast.loading("Creating Customer...", {
            id: "create-customer"
        })
        console.log(data);
        mutate(data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add a new 
                        customer
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className='space-y-2'>
                        <div className='flex items-center gap-4 w-full'>
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({field}) =>(
                                    <FormItem className='flex-1'>
                                        <FormLabel className='text-xs'>Firstname</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )} 
                            />
                            <FormField 
                                control={form.control}
                                name="lastname"
                                render={({field}) =>(
                                    <FormItem className='flex-1'>
                                        <FormLabel className='text-xs'>Lastname</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )} 
                            />
                        </div>

                        <FormField 
                            control={form.control}
                            name="othernames"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel className='text-xs'>Other names</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )} 
                        />
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel className='text-xs'>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )} 
                        />
                        <FormField
                            control={form.control}
                            name="phones"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-xs'>Phone(s)</FormLabel>
                                <FormControl>
                                    <InputTags {...field} />
                                </FormControl>
                                <FormDescription className='text-xs'>
                                    Phone number(s) of customer
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter >
                    <DialogClose asChild>
                        <Button 
                            type='button'
                            variant={"secondary"}
                            onClick={()=>{
                                form.reset()
                            }} >
                                Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending} className='bg-[#47C9D1] hover:bg-[#106981]'
                    >
                        {!isPending && "Create Customer"}
                        {isPending && <Loader2 className='animate-spin' /> }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNewCustomerDialog
