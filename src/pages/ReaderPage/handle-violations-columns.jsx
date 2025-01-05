import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {formatCurrency} from "@/utils/convert.js";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";

const statusMap = {
    1: "Hoàn thành",
    0: "Chưa hoàn thành",
    2: "Quá hạn",
};
const colorMap = {
    1: "text-success",
    2: "text-warning",
    0: "text-error",
};
// eslint-disable-next-line react/prop-types,react-refresh/only-export-components
const Resovled = ({status}) => (
    <div className={` ${colorMap[status]}`}>{statusMap[status]}</div>
)
export const handleViolationsColumns = [
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
        accessorKey: "readerId",
        header: "Số thẻ",
    },
    {
        accessorKey: "fullName",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tên bạn đọc
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => (
            <div className="px-5">{row.getValue("fullName")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Lý do phạt",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "violationType",
        header: "Hình thức phạt",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("violationType")}</div>
        ),
    },
    {
        accessorKey: "fineAmount",
        header: "Số tiền",
        cell: ({row}) => (
            <div className="capitalize">{formatCurrency(Number(row.getValue("fineAmount")))}</div>
        ),
    },
    {
        accessorKey: "penaltyDate",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Ngày phạt
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => (
            <div
                className="px-5">{row.getValue("penaltyDate") ? new Date(row.getValue("penaltyDate")).toLocaleDateString() : ""}</div>
        ),
    },
    {
        accessorKey: "penaltyEndDate",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Ngày kết thúc
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => (
            <div
                className="px-5">{row.getValue("penaltyDate") ? new Date(row.getValue("penaltyEndDate")).toLocaleDateString() : ""}</div>
        ),
    },
    {
        accessorKey: "resolved",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Xử lý
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => (
            <Resovled status={row.getValue("resolved")}/>
        ),
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
                        <DropdownMenuItem>View violation details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];