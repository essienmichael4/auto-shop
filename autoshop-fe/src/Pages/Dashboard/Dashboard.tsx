import Header from '@/components/Header/Header'
import { useState } from 'react'
import dashboard from "../../assets/dashboard.jpg"
import { differenceInDays, endOfDay, startOfMonth } from 'date-fns'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { toast } from 'sonner'
import Summary from '@/components/Summary/Summary'
import SummaryTable from '@/components/Tables/SummaryTable'
import HistoryChart from '@/components/HistoryChart/HistoryChart'

const Dashboard = () => {
    const [dateRange, setDateRange] = useState<{from: Date, to: Date}>({
        from: startOfMonth(new Date()),
        to: endOfDay(new Date())
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
                <Summary from={dateRange.from} to={dateRange.to} />
                <HistoryChart />
            </div>
            <div className='p-8 bg-white mt-4 rounded-xl'>
                <SummaryTable from={dateRange.from} to={dateRange.to} />
            </div>
        </div>
    </div>
  )
}

export default Dashboard
