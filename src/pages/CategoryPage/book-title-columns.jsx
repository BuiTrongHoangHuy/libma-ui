import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDown} from "lucide-react";

export const bookTitleColumns = [
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
            <div className="w-[30px]">
                <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "titleId",
        header: "Mã tựa sách",
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue("titleId")}</div>
        ),
    },
    {
        accessorKey: "titleName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tên tựa sách
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="px-5">{row.getValue("titleName")}</div>
        ),
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Thể loại
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="px-5">{row.getValue("category")}</div>
        ),
    },
    {
        accessorKey: "summary",
        header: "Tóm tắt",
    }
];