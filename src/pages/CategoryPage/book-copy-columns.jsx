import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDown} from "lucide-react";

export const bookCopyColumns = [
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
        accessorKey: "bookId",
        header: "Mã cuốn sách",
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue("bookId")}</div>
        ),
    },
    {
        accessorKey: "bookTitle",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tên sách
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="px-5">{row.getValue("bookTitle")}</div>
        ),
    },
    {
        accessorKey: "location",
        header: "Vị trí",
    },
    {
        accessorKey: "condition",
        header: "Tình trạng",
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
    }
];