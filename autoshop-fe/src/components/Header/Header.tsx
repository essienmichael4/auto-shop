import { NavLink } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { LogOut, User } from 'lucide-react'
import useAuth from '@/hooks/useAuth'

const routes = [
    {
        name: "Dashboard",
        path: "../dashboard"
    },{
        name: "My Garage",
        path: "../garage"
    },{
        name: "Services",
        path: "../services"
    },{
        name: "Customers",
        path: "../customers"
    },{
        name: "Employees",
        path: "../employees"
    }
]

const Header = () => {
    const {setAuth} = useAuth()
  return (
    <header className='fixed top-0 z-10 w-full h-[5rem] bg-[#161417] flex items-center'>
        <div className="container mx-auto px-8 flex items-center justify-between">
            <div className='flex items-center gap-12'>
                <h1 className='oswald text-3xl text-white'>Auto Shop</h1>
                <nav>
                    <ul className='flex items-center gap-8'>
                        {routes.map((route, i) => {
                            return <li key={i}>
                                    <NavLink 
                                      to={route.path}
                                      className={({isActive}) => isActive ? 'text-white flex items-center gap-2' :'text-[#8C8C8C] flex items-center gap-2'}
                                    >{route.name}</NavLink>
                                </li>
                        } )}
                    </ul>
                </nav>
            </div>
            <div className="flex items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className='w-12 h-12 rounded-full bg-white'><User className="h-8 w-8" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>{
                            setAuth(undefined)
                        }}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </header>
  )
}

export default Header
