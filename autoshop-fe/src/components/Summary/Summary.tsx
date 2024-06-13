import React from 'react'
import { axios_instance } from '@/api/axios'
import useAuth from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { Stats } from '@/lib/types'

interface Props{
    from: Date,
    to:Date
}

const Summary = ({from, to}:Props) => {
    const {auth} = useAuth()

    const stats = useQuery<Stats>({
        queryKey: ["summary", from, to],
        queryFn: async() => await axios_instance.get(`/stats-card?from=${from}&to=${to}`, {
            headers: {
                'Authorization': `Bearer ${auth?.backendTokens.accessToken}`
            }
        }).then(res => res.data)
    })

    return (
        <div className='flex items-center gap-8'>
            <div className="flex-1 bg-black p-4 rounded-lg relative">
                <h3  className='text-white'>{stats.data?.monthStats.title}</h3>
                <p className='text-5xl text-white mt-4'>{stats.data?.monthStats.currentService}</p>
                <div className='flex items-center gap-2'>
                    <span className='px-2 py-1 text-xs rounded-full bg-emerald-200 text-emerald-700'>{stats.data?.monthStats.percentageDifferenceFromPreviousMonth}%</span> <p className='text-white text-xs'> From Last Month</p>
                </div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-lg relative">
                <h3  className=''>{stats.data?.dayStats.title}</h3>
                <p className='text-5xl  mt-4'>{stats.data?.dayStats.currentDayServices}</p>
                <div className='flex items-center gap-2'>
                <span className='px-2 py-1 text-xs rounded-full bg-rose-200 text-rose-700'>{stats.data?.dayStats.percentageDifferenceFromPreviousDay}%</span> <p className=' text-xs'> From Yesterday</p>
                </div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-lg relative">
                <h3  className=''>{stats.data?.customerStats.title}</h3>
                <p className='text-5xl  mt-4'>{stats.data?.customerStats.all}</p>
                <div className='flex items-center gap-2'>
                <span className='px-2 py-1 text-xs rounded-full bg-emerald-200 text-emerald-700'>+{stats.data?.customerStats.new}</span> <p className=' text-xs'> From Last Month</p>
                </div>
            </div>
        </div>
    )
}

export default Summary
