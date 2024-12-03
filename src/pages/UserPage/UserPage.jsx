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
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button.jsx";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
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

const data2 = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@yahoo.com",
    },
    {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@gmail.com",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@gmail.com",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@gmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
]

/*
export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "allowUse",
        header: "Allow Use",
        cell: ({ row }) => (
            <Checkbox
                checked={row.getValue("allowUse")}
                disabled
                aria-label="Allow Use"
            />
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Created At
                <ArrowUpDown />
            </Button>
        ),
    },
    {
        accessorKey: "note",
        header: "Note",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View user details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]
*/

let data = [

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

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "allowUse",
        header: "Allow Use",
        cell: ({ row }) => {
            return (
                <Checkbox
                    checked={row.getValue("allowUse")}
                    aria-label="Allow Use"
                />
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Created At
                <ArrowUpDown />
            </Button>
        ),
    },
    {
        accessorKey: "note",
        header: "Note",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View user details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
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