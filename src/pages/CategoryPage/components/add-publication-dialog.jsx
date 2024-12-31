import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

export function AddPublicationDialog() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Thêm mới</Button>
            </DialogTrigger>
            <DialogContent className=" max-w-xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Thêm mới phân loại ấn phẩm</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-2">
                    <div className="grid gap-4 px-2">
                        <div className="space-y-2">
                            <label htmlFor="groupCode" className="text-sm font-medium">
                                Mã phân loại (*)
                            </label>
                            <Input id="publicationId" placeholder="Nhập mã phân loại" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="groupName" className="text-sm font-medium">
                                Tên phân loại (*)
                            </label>
                            <Input id="publicationName" placeholder="Nhập tên phân loại" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="notes" className="text-sm font-medium">
                                Ghi chú
                            </label>
                            <Textarea id="note" placeholder="Ghi chú" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isActive" />
                            <label
                                htmlFor="isActive"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Được sử dụng
                            </label>
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

