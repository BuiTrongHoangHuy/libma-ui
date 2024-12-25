import { DataTableBook } from "@/components/data-table-book"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useState } from "react"
import { bookColumns } from "./book-columns"

const bookData = [
    {
        bookId: "B001",
        bookTitle: "OOP",
        authorName: "Hoàng"
    },
    {
        bookId: "B001",
        bookTitle: "OOP",
        authorName: "Hoàng"
    },
    {
        bookId: "B001",
        bookTitle: "OOP",
        authorName: "Hoàng"
    },
];

export function AddBorrowingTicketDialog() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Thêm sách mượn</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Thêm sách mượn</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-4">
                    <DataTableBook data={bookData} columns={bookColumns}/>
                </ScrollArea>
                <div className="flex justify-end space-x-2 mt-6">
                    <Button
                        variant="default"
                        onClick={() => {
                            // Handle save logic here
                            setOpen(false)
                        }}
                    >   
                        Lưu
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setOpen(false)}
                    >
                        Đóng
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

