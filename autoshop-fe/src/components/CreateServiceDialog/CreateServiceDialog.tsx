import React, { useCallback, useState } from 'react'
import { Dialog, DialogTitle, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../../components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputTags } from '../ui/InputTags'
import { Button } from '../ui/button'
import { format } from 'date-fns'
import { axios_instance } from '@/api/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useAuth from '@/hooks/useAuth'
import { CreateNewServiceSchema, CreateNewServiceSchemaType } from '@/schema/services'
import { cn } from '@/lib/utils'
import CustomerPicker from './CustomerPicker'
import EmployeePicker from './EmployeePicker'

interface Props{
    trigger: React.ReactNode
}

const CreateServiceDialog = ({trigger}:Props) => {
    const {auth} = useAuth()
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    
    const form = useForm<CreateNewServiceSchemaType>({
        resolver:zodResolver(CreateNewServiceSchema),
        defaultValues:{
            dueDate: new Date(),
            customer: undefined,
            servicer: undefined,
            name: "",
            description: ""
        }
    })

    const handleCustomerChange = useCallback((value:number)=>{
        form.setValue("customer", value)
    }, [form])
    
    const handleEmployeeChange = useCallback((value:number)=>{
        form.setValue("servicer", value)
    }, [form])

    const createService = async (data:CreateNewServiceSchemaType)=>{
        const response = await axios_instance.post("/services", {
            ...data
        }, {
            headers: {
                Authorization: `Bearer ${auth?.backendTokens.accessToken}`
            }
        })

        return response.data
    }

    const {mutate, isPending} = useMutation({
        mutationFn: createService,
        onSuccess: (data)=>{
            toast.success(data.message, {
                id: "create-service"
            })

            form.reset({
                dueDate: new Date(),
                customer: undefined,
                servicer: undefined,
                name: "",
                description: ""
            })

            queryClient.invalidateQueries({queryKey: ["services"]})

            setOpen(prev => !prev)
        }
    })

    const onSubmit = (data:CreateNewServiceSchemaType)=>{
        console.log(data);
        
        toast.loading("Creating service...", {
            id: "create-service"
        })
        mutate(data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Creat a new service
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                            control={form.control}
                            name="customer"
                            render={({field}) =>(
                                <FormItem className='flex flex-col'>
                                    <FormLabel className='mr-2'>Customer Name</FormLabel>
                                    <FormControl>
                                        <CustomerPicker onChange={handleCustomerChange}/>
                                    </FormControl>
                                    <FormDescription>Select a customer</FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="servicer"
                            render={({field}) =>(
                                <FormItem className='flex flex-col'>
                                    <FormLabel className='mr-2'>Serviced By</FormLabel>
                                    <FormControl>
                                        <EmployeePicker  onChange={handleEmployeeChange}/>
                                    </FormControl>
                                    <FormDescription>Select a employee</FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Service Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>Name or Type of service render</FormDescription>
                                </FormItem>
                            )}
                        />
                        

                        <FormField 
                            control={form.control}
                            name="description"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>Service description (optional)</FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="dueDate"
                            render={({field}) =>(
                                <FormItem className='flex flex-col'>
                                    <FormLabel className='mr-2'>Due Date</FormLabel>
                                    <Popover >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button 
                                                    variant={'outline'}
                                                    className={cn("pl-3 text-left font-normal", !field.value && 'text-muted-foreground')}>
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className='p-0 w-auto'>
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(value)=>{
                                                    if(!value) return
                                                    field.onChange(value)
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>Select a due date for this service</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField 
                            control={form.control}
                            name="description"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={""} {...field} />
                                    </FormControl>
                                    <FormDescription>Transaction description (optional)</FormDescription>
                                </FormItem>
                            )}
                        /> */}
    
                        {/* <FormField 
                            control={form.control}
                            name="amount"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={0} type='number' {...field} />
                                    </FormControl>
                                    <FormDescription>Transaction amount (required)</FormDescription>
                                </FormItem>
                            )}
                        /> */}
    
                        <div className="flex items-center justify-between gap-2">
                            
                            
                            
                        </div>
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
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                        {!isPending && "Create"}
                        {isPending && <Loader2 className='animate-spin' /> }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )
}

export default CreateServiceDialog
