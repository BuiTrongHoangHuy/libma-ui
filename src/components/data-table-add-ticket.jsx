
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button.jsx";
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown } from "lucide-react"
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input"
import { AddUserDialog } from "@/pages/UserPage/components/add-user-dialog.jsx";


// eslint-disable-next-line react/prop-types
export const DataTableAddTicket = ({ data, columns, addButton }) => {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { control, handleSubmit } = useForm({
        defaultValues: {
            borrowCode: "UIT001",
            cardCode: "US000048",
            fullName: "Bùi Trọng Hoàng Huy",
            creationDate: "2024-12-24",
        },
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <form className="w-full">
            <div className="grid items-center py-4">
                <div className="flex space-x-4">
                    <div className="space-y-2 grid">
                        <label htmlFor="borrowCode" className="text-sm font-medium">
                            Số phiếu mượn
                        </label>
                        <Controller
                            name="borrowCode"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="borrowCode"
                                    readOnly
                                    className="w-[270px] bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded border"
                                />
                            )}
                        />
                    </div>
                    <div className="space-y-2 grid">
                        <label htmlFor="cardCode" className="text-sm font-medium">
                            Số thẻ
                        </label>
                        <Controller
                            name="cardCode"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="cardCode"
                                    placeholder="Nhập số thẻ"
                                    className="w-[270px] text-gray-800 text-sm px-4 py-2 rounded border"
                                />
                            )}
                        />
                    </div>
                    <div className="space-y-2 grid">
                        <label htmlFor="fullName" className="text-sm font-medium">
                            Họ tên
                        </label>
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="fullName"
                                    readOnly
                                    className="w-[270px] bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded border"
                                />
                            )}
                        />
                    </div>
                    <div className="space-y-2 grid">
                        <label htmlFor="creationDate" className="text-sm font-medium">
                            Ngày tạo phiếu
                        </label>
                        <Controller
                            name="creationDate"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="creationDate"
                                    type="date"
                                    className="w-[270px] text-gray-800 text-sm px-4 py-2 rounded border"
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    {addButton}
                </div>
            </div>
            <div className="rounded-md border">
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
            <div className="justify-end flex mt-4">
                <Button>Lưu</Button>
            </div>
            {/* <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Trước
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Sau
                    </Button>
                </div>
            </div> */}
        </form>
    )
}