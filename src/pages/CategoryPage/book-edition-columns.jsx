import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ArrowUpDown} from "lucide-react";

export const bookEditionColumns = [
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
        accessorKey: "editionId",
        header: "Mã đầu sách",
        cell: ({row}) => (
            <div className="w-[80px]">{row.getValue("editionId")}</div>
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
        accessorKey: "editionNumber",
        header: "Số phiên bản",
    },
    {
        accessorKey: "publicationYear",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Năm xuất bản
                <ArrowUpDown/>
            </Button>
        ),
        cell: ({row}) => (
            <div className="px-5">{row.getValue("publicationYear")}</div>
        ),
    },
    {
        accessorKey: "publisher",
        header: "Nhà xuất bản",
    },
    {
        accessorKey: "isbn",
        header: "ISNBN",
    }
];