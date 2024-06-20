import {ColumnDef, flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useQuery } from '@tanstack/react-query'
import { axios_instance } from '@/api/axios'
import useAuth from '@/hooks/useAuth'
import {  Service } from '@/lib/types'
import { DataTableColumnHeader } from '../DataTable/ColumnHeader'
import { Link } from "react-router-dom"

interface Props{
    from: Date,
    to:Date
}
const emptyData: any[]= []

const SummaryTable = ({from, to}:Props) => {
    const {auth} = useAuth()

    const services = useQuery<Service[]>({
        queryKey: ["summary", "services", from, to],
        queryFn: async() => await axios_instance.get(`/recent-services?from=${from}&to=${to}`, {
            headers: {
                'Authorization': `Bearer ${auth?.backendTokens.accessToken}`
            }
        }).then(res => res.data)
    })

    const columns:ColumnDef<Service>[] =[{
        accessorKey: "id",
        header:({column})=>(<DataTableColumnHeader column={column} title='Service ID' />),
        cell:({row}) => <div>
            #{row.original.id}
        </div>
    },{
        accessorKey: "name",
        header:({column})=>(<DataTableColumnHeader column={column} title='Service Name' />),
        cell:({row}) => <div>
            {row.original.name}
        </div>
    },{
        accessorKey: "customerName",
        header:({column})=>(<DataTableColumnHeader column={column} title='Customer Name' />),
        cell:({row}) => <div>
            {row.original.customer.firstname} {row.original.customer.lastname} {row.original.customer?.othernames}
        </div>
    },{
        accessorKey: "email",
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
        accessorKey: "servicedBy",
        header:({column})=>(<DataTableColumnHeader column={column} title='Serviced By' />),
        cell:({row}) => <div>
            {row.original.servicer.firstname} {row.original.servicer.lastname} {row.original.servicer?.othernames}
        </div>
    }]

    const table = useReactTable({
        data: services.data || emptyData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className='w-full'>
            <div className="mb-4 flex items-center justify-between">
                <div className='flex items-end gap-4'>
                    <h3 className='text-xl'>Services</h3>
                </div>
                <Link to="../services" className="bg-[#47C9D1] hover:bg-[#106981] px-3 py-1 rounded-full text-white text-sm">See more</Link>
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
            
        </div>
    )
}

export default SummaryTable
