import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { LoginSchema, LoginSchemaType } from '@/schema/login'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from '@/api/axios'
import useAuth from '@/hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const LoginForm = () => {
    const {setAuth} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/autoshop/dashboard"

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data:LoginSchemaType) =>{
        try{
            toast.loading("Logging in...", {
                id: "login"
            })
            const response = await axios.post("/auth/login", JSON.stringify({
                email: data.email,
                password: data.password
            }))
            
            setAuth(response.data)
            form.reset()
            toast.success("Login successful", {
                id: "login"
            })
            navigate(from, {replace:true})
        }catch(err){
            console.log(err);
            // if(!err.response){
            //     toast.error("Server not found")
            // }else{
            //     toast.error(err.response.data.error)
            // }
        }
    }

    return (
        <Form {...form}>
            <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
                control={form.control}
                name="email"
                render={({field}) =>(
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name="password"
                render={({field}) =>(
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} type='password' />
                        </FormControl>
                        <div className='w-full text-right mt-0 p-0'>
                            <Button variant='link' className='mt-0 h-0 p-0 text-[#47C9D1]'>Forgot Password?</Button>
                        </div>
                        {/* <FormDescription>Please enter password to login</FormDescription> */}
                    </FormItem>
                )}
            />

            <Button type='submit' variant={"default"} className='bg-[#47C9D1]'>
                Login
            </Button>
            </form>
        </Form>
    )
}

export default LoginForm
