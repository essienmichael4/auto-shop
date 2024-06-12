import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../../components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { InputTags } from '../ui/InputTags'
import { Button } from '../ui/button'
import { axios_instance } from '@/api/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import useAuth from '@/hooks/useAuth'
import { CreateNewEmployeeSchema, CreateNewEmployeeSchemaType } from '@/schema/employees'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface Props{
    trigger: React.ReactNode
}

const CreateNewEmployeeDialog = ({trigger}:Props) => {
    const {auth} = useAuth()
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()

    const form = useForm<CreateNewEmployeeSchemaType>({
        resolver:zodResolver(CreateNewEmployeeSchema),
        defaultValues:{
            firstname:"",
            lastname: "",
            othernames: "",
            email: "",
            departments: [],
            role: "USER"
        }
    })

    const createEmployee = async (data:CreateNewEmployeeSchemaType)=>{
        const response = await axios_instance.post("/create-user", {
            ...data
        }, {
            headers: {
                Authorization: `Bearer ${auth?.backendTokens.accessToken}`
            }
        })

        return response.data
    }

    const {mutate, isPending} = useMutation({
        mutationFn: createEmployee,
        onSuccess: (data)=>{
            toast.success(data.message, {
                id: "create-employee"
            })

            form.reset({
                firstname:"",
                lastname: "",
                othernames: "",
                email: "",
                departments: [],
                role: "USER"
            })

            queryClient.invalidateQueries({queryKey: ["employees"]})

            setOpen(prev => !prev)
        }
    })

    const onSubmit = (data:CreateNewEmployeeSchemaType)=>{
        toast.loading("Creating employee...", {
            id: "create-employee"
        })
        mutate(data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add a new employee
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
                            name="departments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-xs'>Department(s)</FormLabel>
                                <FormControl>
                                    <InputTags {...field} />
                                </FormControl>
                                <FormDescription className='text-xs'>
                                    Department(s) of employee
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-xs'>Role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="USER">User</SelectItem>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                            <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className='text-xs'>
                                        You can the user's role here
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
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}
                    >
                        
                        {!isPending && "Create Employee"}
                        {isPending && <Loader2 className='animate-spin' /> }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNewEmployeeDialog
