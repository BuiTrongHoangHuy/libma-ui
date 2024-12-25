import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDown} from "lucide-react";

export const borrowTicketColumns = [
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
        accessorKey: "ticketId",
        header: "Số phiếu mượn",
    },
    {
        accessorKey: "readerId",
        header: "Số thẻ bạn đọc",
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
        accessorKey: "borrowQuantity",
        header: "SL mượn",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("borrowQuantity")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
];