import { axios_instance } from '@/api/axios'
import useAuth from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { Notification } from '@/lib/types'
import { Trash2Icon } from 'lucide-react'

const Notifications = () => {
    const {auth} = useAuth()

    const notifications = useQuery<Notification[]>({
        queryKey: ["notifications"],
        queryFn: async() => await axios_instance.get("/notifications", {
            headers: {
                'Authorization': `Bearer ${auth?.backendTokens.accessToken}`
            }
        }).then(res => res.data)
    })

    return (
        <div>
            {notifications?.data?.length === 0 && <div className='bg-white flex items-center justify-center w-full h-24 rounded-lg'><p className='font-medium text-muted-foreground text-lg'>No notifications</p></div>}
            { notifications?.data?.length !==0 && notifications?.data?.map((notification) => <NotificationCard  notification={notification}/>) }
        </div>
    )
}

function NotificationCard({notification}:{notification:Notification}){
    return <div className=' mt-4 p-4 bg-white rounded-lg flex flex-col gap-4'>
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 rounded-full bg-gray-400'></div>
                    <p className='text-xs'>{notification.createdAt}</p>
                </div>
                <div className=''>{<Trash2Icon className='text-rose-700 hover:bg-rose-300 hover:rounded-lg' />}</div>
            </div>
        </div>
        <div className='ml-4 w-[75%]'>
            <p>{notification.message}</p>
        </div>
    </div>
}

export default Notifications
