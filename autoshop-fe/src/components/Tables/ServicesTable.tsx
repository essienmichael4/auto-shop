import { useState } from 'react'
import {ColumnDef, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel,getFilteredRowModel, useReactTable, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useQuery } from '@tanstack/react-query'
import { axios_instance } from '@/api/axios'
import useAuth from '@/hooks/useAuth'
import {  Service } from '@/lib/types'
import { DataTableColumnHeader } from '../DataTable/ColumnHeader'
import { DataTableViewOptions } from '../DataTable/ColumnToggle'
import { Button } from '../ui/button'

const emptyData: any[]= []

const ServicesTable = () => {
    const {auth} = useAuth()
    const [sorting, setSorting] = useState<SortingState>([])
    const [filtering, setFiltering] = useState("")

    const services = useQuery<Service[]>({
        queryKey: ["services"],
        queryFn: async() => await axios_instance.get("/services", {
            headers: {
                'Authorization': `Bearer ${auth?.backendTokens.accessToken}`
            }
        }).then(res => res.data)
    })

    const columns:ColumnDef<Service>[] =[{
        accessorKey: "id",
        header:({column})=>(<DataTableColumnHeader column={column} title='Service ID' />),
        cell:({row}) => <div >
            <span className='text-gray-400'>#</span>{row.original.id}
        </div>
    },{
        accessorKey: "name",
        header:({column})=>(<DataTableColumnHeader column={column} title='Service Name' />),
        cell:({row}) => <div>
            {row.original.name}
        </div>
    },{
        accessorFn: (row) => `${row.customer.firstname} ${row.customer.lastname} ${row.customer.othernames}`,
        id: "customer",
        header:({column})=>(<DataTableColumnHeader column={column} title='Customer Name' />),
        cell:({row}) => <div>
            {row.original.customer.firstname} {row.original.customer.lastname} {row.original.customer?.othernames}
        </div>
    },{
        accessorKey: "customer.email",
        header:({column})=>(<DataTableColumnHeader column={column} title='Customer Email' />),
        cell:({row}) => <div>
            {row.original.customer.email}
        </div>
    },{
        accessorKey: "createdAt",
        header:({column})=>(<DataTableColumnHeader column={column} title='Service Date' />),
        cell:({row}) => <div>
            {row.original.createdAt}
        </div>
    },{
        accessorKey: "dueDate",
        header:({column})=>(<DataTableColumnHeader column={column} title='Due Date' />),
        cell:({row}) => <div>
            {row.original.dueDate}
        </div>
    },{
        accessorFn: (row) => `${row.servicer.firstname} ${row.servicer.lastname} ${row.servicer.othernames}`,
        id: "servicer",
        header:({column})=>(<DataTableColumnHeader column={column} title='Serviced By' />),
        cell:({row}) => <div>
            {row.original.servicer.firstname} {row.original.servicer.lastname} {row.original.servicer?.othernames}
        </div>
    }]

    const table = useReactTable({
        data: services.data || emptyData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            pagination: {
                pageSize: 20
            }
        },
        state:{
            sorting,
            globalFilter: filtering
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <div className='w-full'>
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <input value={filtering}  onChange={e => setFiltering(e.target.value)} placeholder='Search services...' className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
                </div>
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

export default ServicesTable
