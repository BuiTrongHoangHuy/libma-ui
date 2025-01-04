import * as XLSX from "xlsx";
import {Button} from "/src/components/ui/button.jsx";
import {FileOutputIcon} from "lucide-react";


// eslint-disable-next-line react/prop-types
export const ExportButton = ({data, fileName}) => {
    function getCurrentTimeFormatted() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");

        return `${year}${month}${day}${hours}${minutes}`;
    }

    const exportToExcel = (fileName = "export.xlsx") => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, fileName);
    };

    return (
        <Button
            className={"ml-2"}
            onClick={() =>
                exportToExcel(`${fileName}-${getCurrentTimeFormatted()}.xlsx`)
            }
        >
            <FileOutputIcon/>
            Xuất file
        </Button>
    );
};
