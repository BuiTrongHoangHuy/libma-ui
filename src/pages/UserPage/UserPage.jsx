import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button.jsx";
import { ChevronDown } from "lucide-react"
import React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input"
import {columns} from "@/pages/UserPage/columns.jsx";

const data = [
    {
        id: "US001",
        name: "admin",
        allowUse: false,
        createdAt: "03/12/2024",
        note: "huy22@yahoo.com",
    },
    {
        id: "US002",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },{
        id: "US003",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },{
        id: "US004",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },{
        id: "US005",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },{
        id: "US006",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },{
        id: "US007",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },{
        id: "US008",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },{
        id: "US009",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },{
        id: "US0010",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },{
        id: "US011",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },{
        id: "US012",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },{
        id: "US013",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },{
        id: "US014",
        name: "user",
        allowUse: true,
        createdAt: "04/12/2024",
        note: "huy33@yahoo.com",
    },
];


export const UsersPage = () => {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
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
        <div className="px-10 pt-2 flex flex-col space-y-10">
            <div>
                <p className="text-display/lg/bold font-bold">User</p>
            </div>
            <Tabs defaultValue="group_user">
                <TabsList className="border-y-2  w-full flex justify-start space-x-5 bg-white rounded-none h-fit p-0">
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                            focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                            aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                                 value="group_user">Group User</TabsTrigger>
                    <TabsTrigger className=" text-text/lg/semibold text-black-300 px-4 py-2 border-b border-gray-500
                                            focus:outline-none focus:text-black-500 focus:border-b-4 focus:border-primary
                                            aria-selected:border-primary aria-selected:border-b-4 aria-selected:text-black-500"
                        value="user">User</TabsTrigger>
                </TabsList>

                <TabsContent className="py-10" value="group_user">

                    <div className="w-full">
                        <div className="flex items-center py-4">
                            <Input
                                placeholder="Filter by name..."
                                value={(table.getColumn("name")?.getFilterValue() ?? "")}
                                onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                                className="max-w-sm"
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="ml-auto">
                                        Columns <ChevronDown/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {table
                                        .getAllColumns()
                                        .filter((column) => column.getCanHide())
                                        .map((column) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={column.id}
                                                    className="capitalize"
                                                    checked={column.getIsVisible()}
                                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                                >
                                                    {column.id}
                                                </DropdownMenuCheckboxItem>
                                            )
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
                            <div className="flex-1 text-sm text-muted-foreground">
                                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                                selected.
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" size="sm" onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}>
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent className="py-10" value="user">

                    <Table>
                        <TableCaption></TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tên đăng nhập</TableHead>
                                <TableHead>Họ và tên</TableHead>
                                <TableHead>Quyền hạn</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead>Thời gian tạo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">admin</TableCell>
                                <TableCell>Hoàng Huy</TableCell>
                                <TableCell>Admin</TableCell>
                                <TableCell>Đã kích hoạt</TableCell>
                                <TableCell>3/12/2024</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>

        </div>
    );
}