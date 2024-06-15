import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { axios_instance } from '@/api/axios'
import useAuth from '@/hooks/useAuth'
import HistoryPeriodSelector from './HistoryPeriodSelector'

const HistoryChart = () => {
    const {auth} = useAuth()
    const [timeframe, setTimeFrame] = useState<"MONTH" | "YEAR">("MONTH")
    const [period, setPeriod] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })

    const historyDataQuery = useQuery<[]>({
        queryKey: ["history", timeframe, period],
        queryFn: async() => await axios_instance.get(`/history?timeframe=${timeframe}&month=${period.month}&year=${period.year}`, {
            headers: {
                'Authorization': `Bearer ${auth?.backendTokens.accessToken}`
            }
        }).then(res => res.data)
    })

    const dataAvailable = historyDataQuery.data && historyDataQuery.data.length > 0
    
    return (
        <div className='h-[500px] mt-4 p-4 bg-white rounded-lg'>
            <h3>History</h3>
            <div>
                <HistoryPeriodSelector 
                    timeframe={timeframe}
                    period={period}
                    setPeriod={setPeriod}
                    setTimeFrame={setTimeFrame}
                />
            </div>
        </div>
    )
}

export default HistoryChart