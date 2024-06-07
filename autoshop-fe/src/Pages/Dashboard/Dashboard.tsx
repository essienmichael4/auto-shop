import Header from '@/components/Header/Header'
import useAuth from '@/hooks/useAuth'
import React, { useState } from 'react'
import dashboard from "../../assets/dashboard.jpg"
import { differenceInDays, startOfMonth } from 'date-fns'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { toast } from 'sonner'

const Dashboard = () => {
    const {auth} = useAuth()
    const [dateRange, setDateRange] = useState<{from: Date, to: Date}>({
        from: startOfMonth(new Date()),
        to: new Date()
    })

  return (
    <div>
        <Header />
        <div className='max-w-[1880px] bg-cover bg-center mx-auto mt-[5rem] h-96 bg-slate-500' style={{backgroundImage: `url(${dashboard})`}}>
            <div className='w-full h-full bg-black/50'></div>
        </div>
        <div className='container -mt-96 py-4  mx-auto px-8'>
            <div className='flex items-center justify-between gap-8'>
                <h2 className='text-2xl text-white font-semibold'>Summary</h2>
                <DateRangePicker
                      initialDateFrom={dateRange.from}
                      initialDateTo={dateRange.to}
                      showCompare={false}
                      onUpdate={(values)=>{
                        const {from, to} = values.range
                        if(!from || !to) return

                        if(differenceInDays(to, from) > 90){
                            toast.error(`The selectedd date range is too big. Max allowed range is 90 days`)
                            return
                        }

                        setDateRange({from, to})
                      }}
                    />
            </div>
            <div className='p-4 bg-white/15 mt-4 rounded-xl backdrop-blur-sm'>
                <div className='flex items-center gap-8'>
                    <div className="flex-1 bg-black p-4 rounded-lg relative">
                        <h3  className='text-white'>Services</h3>
                        <p className='text-5xl text-white mt-4'>230</p>
                        <div className='flex items-center gap-2'>
                        <span className='px-2 py-1 text-xs rounded-full bg-emerald-200 text-emerald-700'>2.5%</span> <p className='text-white text-xs'> From Last Month</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-lg relative">
                        <h3  className=''>Today's Services</h3>
                        <p className='text-5xl  mt-4'>23</p>
                        <div className='flex items-center gap-2'>
                        <span className='px-2 py-1 text-xs rounded-full bg-rose-200 text-rose-700'>-2.5%</span> <p className=' text-xs'> From Yesterday</p>
                        </div>
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-lg relative">
                        <h3  className=''>Customers</h3>
                        <p className='text-5xl  mt-4'>230</p>
                        <div className='flex items-center gap-2'>
                        <span className='px-2 py-1 text-xs rounded-full bg-emerald-200 text-emerald-700'>+2</span> <p className=' text-xs'> From Last Month</p>
                        </div>
                    </div>
                </div>
                <div className='h-[500px] mt-4 p-4 bg-white rounded-lg'>
                    chart goes here
                </div>
            </div>
            <div className='p-4 bg-white mt-4 rounded-xl'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-end gap-4'>
                        <h3 className='text-xl'>Recent Services</h3>
                        <p className='text-xs'>1 of 20 service</p>
                    </div>
                    <a href="#">See more</a>
                </div>
                <div className='mt-4'>
                    Table goes here
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
