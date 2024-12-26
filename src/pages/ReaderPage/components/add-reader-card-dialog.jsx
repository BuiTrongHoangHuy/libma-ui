import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export function AddReaderCardDialog() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Thêm mới</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Thêm mới thẻ bạn đọc</DialogTitle>
                </DialogHeader>
                <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
                <div className="grid grid-cols-2 gap-8">
                    {/* Account Information Section */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="fullname">Họ tên (*)</label>
                            <Input id="fullname" placeholder="Nhập họ tên" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="date">Ngày sinh</label>
                            <Input id="birthDay" type="date" placeholder="" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="address">Địa chỉ</label>
                            <Input id="address" placeholder="Địa chỉ" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone">Điện thoại</label>
                            <Input id="phone" placeholder="0123456789" />
                        </div>
                        <div className="space-y-2">
                            <label>Trạng thái</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Đã kích hoạt" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Đã kích hoạt</SelectItem>
                                    <SelectItem value="inactive">Chưa kích hoạt</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email">Email</label>
                            <Input id="email" type="email" placeholder="Nhập Email" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password">Mật khẩu</label>
                            <Input id="password" type="password" placeholder="Mật khẩu" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="ID">Mã thẻ</label>
                            <Input id="cardID"  placeholder="XXX-XXX-XXX" readOnly/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="date">Ngày hết hạn</label>
                            <Input id="expiredDay" type="date" placeholder="" />
                        </div>
                        <div className="space-y-2">
                            <label>Loại thẻ</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Thẻ sinh viên" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">Thẻ sinh viên</SelectItem>
                                    <SelectItem value="guest">Thẻ vãng lai</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
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

