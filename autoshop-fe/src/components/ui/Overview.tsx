"use client"

import { DateRangePicker } from '@/components/ui/date-range-picker'
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants'
import { UserSettings } from '@prisma/client'
import { differenceInDays, startOfMonth } from 'date-fns'
import React, { useState } from 'react'
import { toast } from 'sonner'
import StatsCard from './StatsCard'
import CategoriesStats from './CategoriesStats'

const Overview = ({userSettings}:{userSettings:UserSettings}) => {
    const [dateRange, setDateRange] = useState<{from: Date, to: Date}>({
        from: startOfMonth(new Date()),
        to: new Date()
    })

    return (
        <>
            <div className="container flex flex-wrap gap-2 py-6 items-end justify-between">
                <h2 className="text-3xl font-bold">Overview</h2>
                <div className="flex items-center gap-3">
                    <DateRangePicker 
                      initialDateFrom={dateRange.from}
                      initialDateTo={dateRange.to}
                      showCompare={false}
                      onUpdate={(values)=>{
                        const {from, to} = values.range
                        if(!from || !to) return

                        if(differenceInDays(to, from) > MAX_DATE_RANGE_DAYS){
                            toast.error(`The selectedd date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days`)
                            return
                        }

                        setDateRange({from, to})
                      }}
                    />
                </div>
            </div>
            <div className="container flex flex-col w-full gap-2">
                <StatsCard userSettings={userSettings} from={dateRange.from} to={dateRange.to} />
                <CategoriesStats userSettings={userSettings} from={dateRange.from} to={dateRange.to} />
            </div>
        </>
    )
}

export default Overview
