import Header from '@/components/Header/Header'
import { useState } from 'react'
import services from "../../assets/dashboard.jpg"
import { differenceInDays, startOfMonth } from 'date-fns'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { toast } from 'sonner'
import ServicesTable from '@/components/Tables/ServicesTable'
import CreateServiceDialog from '@/components/CreateServiceDialog/CreateServiceDialog'

const Services = () => {
    const [dateRange, setDateRange] = useState<{from: Date, to: Date}>({
        from: startOfMonth(new Date()),
        to: new Date()
    })

  return (
    <div>
        <Header />
        <div className='max-w-[1880px] bg-cover bg-center mx-auto mt-[5rem] h-96 bg-slate-500' style={{backgroundImage: `url(${services})`}}>
            <div className='w-full h-full bg-black/50'></div>
        </div>
        <div className='container -mt-96 py-4  mx-auto px-8'>
            <div className='flex items-center justify-between gap-8'>
                <h2 className='text-2xl text-white font-semibold'>Services</h2>
                <div className='flex gap-4'>
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
                    <CreateServiceDialog trigger={
                        <button className='bg-white px-4 rounded'>Add Service</button>
                    } />
                </div>
            </div>
            <div className='p-4 bg-white/15 mt-4 rounded-xl backdrop-blur-sm'>
                <ServicesTable />
            </div>
        </div>
    </div>
  )
}

export default Services
