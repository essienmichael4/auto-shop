import React, { useState } from 'react'
import {ColumnDef, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useQuery } from '@tanstack/react-query'
import { axios_instance } from '@/api/axios'
import useAuth from '@/hooks/useAuth'
import { Customer } from '@/lib/types'
import { DataTableColumnHeader } from '../DataTable/ColumnHeader'
import { DataTableViewOptions } from '../DataTable/ColumnToggle'
import { Button } from '../ui/button'

const emptyData: any[]= []

const CustomersTable = () => {
    const {auth} = useAuth()
    const [sorting, setSorting] = useState<SortingState>([])

    const customers = useQuery<Customer[]>({
        queryKey: ["customers"],
        queryFn: async() => await axios_instance.get("/customers", {
            headers: {
                'Authorization': `Bearer ${auth?.backendTokens.accessToken}`
            }
        }).then(res => res.data)
    })

    const columns:ColumnDef<Customer>[] =[{
        accessorKey: "name",
        header:({column})=>(<DataTableColumnHeader column={column} title='Name' />),
        cell:({row}) => <div>
            {row.original.firstname} {row.original.lastname} {row.original?.othernames}
        </div>
    },{
        accessorKey: "email",
        header:({column})=>(<DataTableColumnHeader column={column} title='Email' />),
        cell:({row}) => <div>
            {row.original.email}
        </div>
    },{
        accessorKey: "phones",
        header:({column})=>(<DataTableColumnHeader column={column} title='Phone' />),
        cell:({row}) => {
        return <div className='flex gap-4'>
            {row.original?.phones.map((phone, i)=> <span key={i}>{phone.number}</span>)}
        </div>}
    }]

    const table = useReactTable({
        data: customers.data || emptyData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            pagination: {
                pageSize: 20
            }
        },
        state:{
            sorting
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <div className='w-full'>
            <div className="mb-4 flex items-center justify-between">
                <div>Filters</div>
                <div className='flex flex-wrap gap-2'>
                    <DataTableViewOptions table={table} />
                </div>
            </div>
            <div className="rounded-md border bg-white/75">
            <Table>
                <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        )
                    })}
                    </TableRow>
                ))}
                </TableHeader>
                <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                >
                Previous
                </Button>
                <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                >
                Next
                </Button>
            </div>
        </div>
    )
}

export default CustomersTable
