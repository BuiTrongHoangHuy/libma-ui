import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";

export const publicationsColumns = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
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
        accessorKey: "category_id",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Mã loại
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => (
            <div className="px-5">{row.getValue("category_id")}</div>
        ),
    },
    {
        accessorKey: "categoryName",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tên loại
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => (
            <div className="px-5">{row.getValue("categoryName")}</div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Thời gian tạo
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => (

            <div className="px-5">{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
        ),
    },
    /*{
        accessorKey: "allowUse",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Được sử dụng
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => {
            return (
                <Checkbox
                    className="ml-10"
                    checked={row.getValue("allowUse")}
                    aria-label="Allow Use"
                />
            );
        },
    },*/
    {
        accessorKey: "note",
        header: "Ghi chú",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>View category details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];