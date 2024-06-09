import Header from '@/components/Header/Header'
// import useAuth from '@/hooks/useAuth'
import customers from "../../assets/dashboard.jpg"
import CreateNewCustomerDialog from '@/components/CreateNewCustomerDialog/CreateNewCustomerDialog'
import CustomersTable from '@/components/Tables/CustomersTable'

const Customers = () => {
    // const {auth} = useAuth()

  return (
    <div>
        <Header />
        <div className='max-w-[1880px] bg-cover bg-center mx-auto mt-[5rem] h-96 bg-slate-500' style={{backgroundImage: `url(${customers})`}}>
            <div className='w-full h-full bg-black/50'></div>
        </div>
        <div className='container -mt-96 py-4  mx-auto px-8'>
            <div className='flex items-center justify-between gap-8'>
                <h2 className='text-2xl text-white font-semibold'>Customers</h2>
                <div className='flex gap-4'>
                    <CreateNewCustomerDialog trigger={
                        <button className='bg-white px-4 py-2 rounded text-xs'>Add Customer</button>

                    } />
                </div>
            </div>
            <div className='p-4 bg-white/15 mt-4 rounded-xl backdrop-blur-sm'>
                <CustomersTable />
            </div>
        </div>
    </div>
  )
}

export default Customers
