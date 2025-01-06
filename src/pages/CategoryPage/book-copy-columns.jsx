import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";

const statusMap = {
    "Available": "Có sắn",
    "Borrowed": "Đang mượn",
};
const colorMap = {
    "Available": "text-success",
    "Borrowed": "text-error",
};
// eslint-disable-next-line react/prop-types,react-refresh/only-export-components
const StatusBookCopy = ({status}) => (
    <div className={` ${colorMap[status]}`}>{statusMap[status]}</div>
)

const conditionMap = {
    "New": "Mới",
    "Good": "Tốt",
    "Old": "Cũ"
}
// eslint-disable-next-line react/prop-types,react-refresh/only-export-components
const ConditionBookCopy = ({status}) => (
    <div>{conditionMap[status]}</div>
)
export const bookCopyColumns = (handleViewTitleDetails) => [
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
        accessorKey: "copyId",
        header: "Mã cuốn sách",
        cell: ({row}) => (
            <div className="w-[80px]">{row.getValue("copyId")}</div>
        ),
    },
    {
        accessorKey: "titleName",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tên sách
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => (
            <div className="px-5">{row.getValue("titleName")}</div>
        ),
    },
    {
        accessorKey: "location",
        header: "Vị trí",
    },
    {
        accessorKey: "condition",
        header: "Tình trạng",
        cell: ({row}) => (
            <ConditionBookCopy status={row.getValue("condition")}/>
        )
    },
    {
        accessorKey: "bookStatus",
        header: "Trạng thái",
        cell: ({row}) => (
            <StatusBookCopy status={row.getValue("bookStatus")}></StatusBookCopy>
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
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            onClick={() => handleViewTitleDetails(user.copyId)}

                        >View book copy details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];