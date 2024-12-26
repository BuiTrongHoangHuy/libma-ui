import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const publicationsData = [
    {
        id: "PL001",
        name: "Tạp chí",
    },
    {
        id: "PL002",
        name: "Truyện",
    }, {
        id: "PL003",
        name: "Sách giáo khoa",
    }, {
        id: "PL004",
        name: "Luận án",
    },
];

export function AddBookTitleDialog() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Thêm mới</Button>
            </DialogTrigger>
            <DialogContent className=" max-w-xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Thêm mới tựa sách</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-2">
                    <div className="grid gap-4 px-2">
                        <div className="space-y-2">
                            <label htmlFor="titleId" className="text-sm font-medium">
                                Mã tựa sách (*)
                            </label>
                            <Input disabled id="titleId" className="bg-gray-500 text-black text-sm" placeholder="Mã tự động" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="titleName" className="text-sm font-medium">
                                Tên tựa sách
                            </label>
                            <Input id="titleName" placeholder="Nhập tên tựa sách" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="author" className="text-sm font-medium">
                                Tác giả
                            </label>
                            <Input id="author" placeholder="Nhập tên tác giả" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Thể loại</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Thể loại" />
                                </SelectTrigger>
                                <SelectContent>
                                    {publicationsData.map((item) => (
                                        <SelectItem key={item.id} value={item.id}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 pb-2">
                            <label htmlFor="summary" className="text-sm font-medium">
                                Tóm tắt (*)
                            </label>
                            <Textarea id="summary" placeholder="Tóm tắt" />
                        </div>
                    </div>
                </ScrollArea>
                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        onClick={() => {
                            // Handle save logic here
                            setOpen(false)
                        }}
                        className="bg-primary hover:bg-primary/90 text-white"
                    >
                        Lưu
                    </Button>
                    <Button
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

