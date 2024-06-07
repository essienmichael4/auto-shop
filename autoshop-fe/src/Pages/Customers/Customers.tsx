import Header from '@/components/Header/Header'
import useAuth from '@/hooks/useAuth'
import React, { useState } from 'react'
import customers from "../../assets/dashboard.jpg"
import { differenceInDays, startOfMonth } from 'date-fns'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { toast } from 'sonner'

const Customers = () => {
    const {auth} = useAuth()
    const [dateRange, setDateRange] = useState<{from: Date, to: Date}>({
        from: startOfMonth(new Date()),
        to: new Date()
    })

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
                    <button className='bg-white px-4 py-2 rounded'>Add Customer</button>
                </div>
            </div>
            <div className='p-4 bg-white/15 mt-4 rounded-xl backdrop-blur-sm'>
                <h3>Today</h3>
                <div className=' mt-4 p-4 bg-white rounded-lg'>
                    Table goes here
                </div>
            </div>
        </div>
    </div>
  )
}

export default Customers