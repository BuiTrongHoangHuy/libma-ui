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

export function AddHandleViolationDialog() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Thêm mới xử lý vi phạm</Button>
            </DialogTrigger>
            <DialogContent className=" max-w-3xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Thêm mới xử lý vi phạm</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-4">
                    <div className="grid gap-4 px-2">
                        <div className="space-y-2">
                            <label htmlFor="groupCode" className="text-sm font-medium">
                                Số thẻ (*)
                            </label>
                            <Input id="cardCode" placeholder="Nhập mã" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="groupName" className="text-sm font-medium">
                                Họ và tên
                            </label>
                            <Input id="fullName" placeholder="Nhập tên" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="notes" className="text-sm font-medium">
                                Nội dung vi phạm (*)
                            </label>
                            <Textarea id="contentViolation" placeholder="Nội dung vi phạm" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="bookCode" className="text-sm font-medium">
                                Mã sách
                            </label>
                            <Input id="bookCode" placeholder="Nhập mã" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Hình thức phạt</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tạm dừng thẻ" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pauseCard">Tạm dừng thẻ</SelectItem>
                                    <SelectItem value="recallCard">Thu hồi thẻ</SelectItem>
                                    <SelectItem value="fine">Phạt tiền</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="date" className="text-sm font-medium">
                                Ngày phạt
                            </label>
                            <Input id="beginAt" type="date" placeholder="" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="date" className="text-sm font-medium">
                                Ngày kết thúc
                            </label>
                            <Input id="endAt" type="date" placeholder="" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Số tiền phạt
                            </label>
                            <Input id="fine" placeholder="100.000" />
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

