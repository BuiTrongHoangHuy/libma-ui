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

const permissions = [
    { id: "system", label: "Thiết lập hệ thống" },
    { id: "users", label: "Quản lý người dùng" },
    { id: "readers", label: "Quản lý bạn đọc" },
    { id: "categories", label: "Quản lý danh mục" },
    { id: "books", label: "Quản lý ấn phẩm" },
    { id: "statistics", label: "Thống kê - báo cáo" },
]

export function AddGroupUserDialog() {
    const [open, setOpen] = useState(false)
    const [selectedPermissions, setSelectedPermissions] = useState([])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Thêm mới</Button>
            </DialogTrigger>
            <DialogContent className=" max-w-xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Thêm mới nhóm người dùng</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-4">
                    <div className="grid gap-4 px-2">
                        <div className="space-y-2">
                            <label htmlFor="groupCode" className="text-sm font-medium">
                                Mã nhóm (*)
                            </label>
                            <Input id="groupCode" placeholder="Nhập mã nhóm" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="groupName" className="text-sm font-medium">
                                Tên nhóm
                            </label>
                            <Input id="groupName" placeholder="Nhập tên nhóm" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="notes" className="text-sm font-medium">
                                Ghi chú
                            </label>
                            <Textarea id="notes" placeholder="Ghi chú" />
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
                        <div className="space-y-4">
                            <label className="text-sm font-medium">Phân quyền:</label>
                            <div className="border rounded-md">
                                <div className="bg-primary-600 p-3 flex items-center space-x-2">
                                    <Checkbox
                                        id="selectAll"
                                        checked={selectedPermissions.length === permissions.length}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedPermissions(permissions.map(p => p.id))
                                            } else {
                                                setSelectedPermissions([])
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor="selectAll"
                                        className="text-sm font-medium text-white leading-none"
                                    >
                                        Tên quyền
                                    </label>
                                </div>
                                <div className="p-4 space-y-3">
                                    {permissions.map((permission) => (
                                        <div key={permission.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={permission.id}
                                                checked={selectedPermissions.includes(permission.id)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedPermissions([...selectedPermissions, permission.id])
                                                    } else {
                                                        setSelectedPermissions(selectedPermissions.filter(id => id !== permission.id))
                                                    }
                                                }}
                                            />
                                            <label
                                                htmlFor={permission.id}
                                                className="text-sm font-medium leading-none"
                                            >
                                                {permission.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
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

