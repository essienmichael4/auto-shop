import Header from '@/components/Header/Header'
// import useAuth from '@/hooks/useAuth'
import { useState } from 'react'
import garage from "../../assets/dashboard.jpg"
import { differenceInDays, startOfMonth } from 'date-fns'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { toast } from 'sonner'
import Notifications from '@/components/Notifications/Notifications'

const Garage = () => {
    // const {auth} = useAuth()
    const [dateRange, setDateRange] = useState<{from: Date, to: Date}>({
        from: startOfMonth(new Date()),
        to: new Date()
    })

  return (
    <div>
        <Header />
        <div className='max-w-[1880px] bg-cover bg-center mx-auto mt-[5rem] h-96 bg-slate-500' style={{backgroundImage: `url(${garage})`}}>
            <div className='w-full h-full bg-black/50'></div>
        </div>
        <div className='container -mt-96 py-4  mx-auto px-8'>
            <div className='flex items-center justify-between gap-8'>
                <h2 className='text-2xl text-white font-semibold'>Garage</h2>
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
                <Notifications />
            </div>
            {/* <div className='p-4 bg-white mt-4 rounded-xl'>
                
                <div className='mt-4 p-4'>
                Notifications goes here
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default Garage
