import { NavLink } from 'react-router-dom'

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
  return (
    <header className='fixed top-0 z-20 w-full h-[5rem] bg-[#161417] flex items-center'>
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

                <div className='w-12 h-12 rounded-full bg-white'></div>
            </div>
        </div>
    </header>
  )
}

export default Header
