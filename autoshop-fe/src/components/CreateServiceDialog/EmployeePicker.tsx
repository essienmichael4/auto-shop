import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useQuery } from '@tanstack/react-query'
import useAuth from '@/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { axios_instance } from '@/api/axios'
import { Employee } from '@/lib/types'

interface Props {
    onChange: (value: number)=>void
}

const EmployeePicker = ({ onChange }:Props) => {
    const {auth} = useAuth()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<number>()

    useEffect(()=>{
        if(!value) return
        onChange(value)
    }, [onChange, value])

    const employeesQuery = useQuery({
        queryKey: ["employees"],
        queryFn: async() => await axios_instance.get("/employees", {
            headers: {
                'Authorization': `Bearer ${auth?.backendTokens.accessToken}`
            }
        }).then(res => res.data)
    })

    const selectedEmployee = employeesQuery.data?.find((employee:Employee)=> employee.id === value)
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant={"outline"} role='combobox' aria-expanded={open} className=' justify-between'>
                    {selectedEmployee ? (
                        <EmployeeRow employee={selectedEmployee} />
                    ) : (
                        "Select employee name"
                    )}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0'>
                <Command onSubmit={e=> e.preventDefault()}>
                    <CommandInput placeholder='Search employee'/>
                    <CommandEmpty>
                        <p>Employee not found</p>
                        <p className="text-xs text-muted-foreground">Tip: Create a new employee</p>
                    </CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {employeesQuery?.data && 
                                employeesQuery?.data?.map((employee:Employee) => {
                                    return (
                                        <CommandItem key={employee.id} onSelect={()=>{
                                            setValue(employee.id)
                                            setOpen(prev=>!prev)
                                        }}>
                                        <EmployeeRow employee={employee} />
                                        <Check className={cn("mr-2 w-4 h-4 opacity-0", value===employee.id && "opacity-100")} />
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

function EmployeeRow({employee}:{employee:Employee}){
    return (
        <div className="flex items-center gap-2">
            <span>{employee.firstname} {employee.lastname} {employee?.othernames}</span>
        </div>
    )
}

export default EmployeePicker
