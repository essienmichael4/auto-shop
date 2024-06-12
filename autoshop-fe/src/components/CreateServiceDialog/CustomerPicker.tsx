import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useQuery } from '@tanstack/react-query'
import useAuth from '@/hooks/useAuth'
import React, { useCallback, useEffect, useState } from 'react'
import { Check, ChevronsUpDown, PlusSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { axios_instance } from '@/api/axios'
import { Customer } from '@/lib/types'
import CreateNewCustomerDialog from '../CreateNewCustomerDialog/CreateNewCustomerDialog'

interface Props {
    onChange: (value: number)=>void
}

const CustomerPicker = ({ onChange}:Props) => {
    const {auth} = useAuth()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<number>()

    useEffect(()=>{
        if(!value) return
        onChange(value)
    }, [onChange, value])

    const customersQuery = useQuery({
        queryKey: ["customers"],
        queryFn: async() => await axios_instance.get("/customers", {
            headers: {
                'Authorization': `Bearer ${auth?.backendTokens.accessToken}`
            }
        }).then(res => res.data)
    })

    const selectedCustomer = customersQuery.data?.find((customer:Customer)=> customer.id === value)

    const successCallback = useCallback((customer:Customer)=>{
        setValue(customer.id)
        setOpen(prev => !prev)
    },[setValue, setOpen])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant={"outline"} role='combobox' aria-expanded={open} className=' justify-between'>
                    {selectedCustomer ? (
                        <CustomerRow customer={selectedCustomer} />
                    ) : (
                        "Select customer name"
                    )}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0'>
                <Command onSubmit={e=> e.preventDefault()}>
                    <CommandInput placeholder='Search customer'/>
                    <CreateNewCustomerDialog trigger={
                        <Button variant={"ghost"} className='flex items-center justify-start border-separate rounded-none p-3 border-b text-muted-foreground' >
                        <PlusSquare className='mr-2 h-4 w-4'>
                        </PlusSquare>
                            Create new
                    </Button>
                    } successCallback={successCallback}/>
                    <CommandEmpty>
                        <p>Customer not found</p>
                        <p className="text-xs text-muted-foreground">Tip: Create a new customer</p>
                    </CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {customersQuery?.data && 
                                customersQuery?.data?.map((customer:Customer) => {
                                    return (
                                        <CommandItem key={customer.id} onSelect={()=>{
                                            setValue(customer.id)
                                            setOpen(prev=>!prev)
                                        }}>
                                        <CustomerRow customer={customer} />
                                        <Check className={cn("mr-2 w-4 h-4 opacity-0", value===customer.id && "opacity-100")} />
                                        </CommandItem>
                                    )
                                })}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
      )
}

function CustomerRow({customer}:{customer:Customer}){
    return (
        <div className="flex items-center gap-2">
            <span>{customer.firstname} {customer.lastname} {customer?.othernames}</span>
        </div>
    )
}

export default CustomerPicker
