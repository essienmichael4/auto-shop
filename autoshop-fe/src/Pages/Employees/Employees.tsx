import Header from '@/components/Header/Header'
import useAuth from '@/hooks/useAuth'
import React, { useState } from 'react'
import employees from "../../assets/dashboard.jpg"
import EmployeesTable from '@/components/Tables/EmployeesTable'
import CreateNewEmployeeDialog from '@/components/CreateNewEmployeeDialog/CreateNewEmployeeDialog'

const Employees = () => {
    const {auth} = useAuth()

    return (
        <div>
            <Header />
            <div className='max-w-[1880px] bg-cover bg-center mx-auto mt-[5rem] h-96 bg-slate-500' style={{backgroundImage: `url(${employees})`}}>
                <div className='w-full h-full bg-black/50'></div>
            </div>
            <div className='container -mt-96 py-4  mx-auto px-8'>
                <div className='flex items-center justify-between gap-8'>
                    <h2 className='text-2xl text-white font-semibold'>Employees</h2>
                    <div className='flex gap-4'>
                    <CreateNewEmployeeDialog trigger={
                        <button className='bg-white px-4 py-2 rounded text-xs'>Add Employee</button>

                    } />
                    </div>
                </div>
                <div className='p-4 bg-white/15 mt-4 rounded-xl backdrop-blur-sm'>
                    <EmployeesTable />
                </div>
            </div>
        </div>
    )
}

export default Employees
