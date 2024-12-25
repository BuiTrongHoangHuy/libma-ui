import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDown} from "lucide-react";

export const readerCardColumns = [
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
        accessorKey: "readerName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tên bạn đọc
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="px-5">{row.getValue("readerName")}</div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Ngày tạo
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="px-5">{row.getValue("createdAt")}</div>
        ),
    },
    {
        accessorKey: "expiredAt",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Ngày hết hạn
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="px-5">{row.getValue("expiredAt")}</div>
        ),
    },
    {
        accessorKey: "cardType",
        header: "Loại thẻ",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("cardType")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    // {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const user = row.original;

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() => navigator.clipboard.writeText(user.id)}
    //                     >
    //                         Copy user ID
    //                     </DropdownMenuItem>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>View user details</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];