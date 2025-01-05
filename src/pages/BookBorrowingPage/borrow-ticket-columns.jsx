import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDown} from "lucide-react";


const statusMap = {
    1: "Còn hạn",
    0: "Đã hủy",
    2: "Quá hạn",
};
const colorMap = {
    1: "text-success",
    2: "text-warning",
    0: "text-error",
};
// eslint-disable-next-line react/prop-types
const StatusLoanRecord = ({status}) => (
    <div className={` ${colorMap[status]}`}>{statusMap[status]}</div>
)

export const borrowTicketColumns = [
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
            <div className="w-[25px]">
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
        accessorKey: "transactionId",
        header: "Số phiếu mượn",
    },
    {
        accessorKey: "readerId",
        header: "Số thẻ bạn đọc",
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
        accessorKey: "loanDate",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Ngày mượn
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => (
            <div className="px-5">{new Date(row.getValue("loanDate")).toLocaleDateString()}</div>
        ),
    },
    {
        accessorKey: "dueDate",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Ngày hết hạn
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => (
            <div className="px-5">{new Date(row.getValue("dueDate")).toLocaleDateString()}</div>
        ),
    },
    {
        accessorKey: "countBook",
        header: "SL mượn",
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("countBook")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({row}) => (
            <StatusLoanRecord status={row.getValue("status")}/>
        ),
    },
];