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
import { useForm, Controller } from "react-hook-form";
import { useState } from "react"
import { readerApi } from "../api/readerApi";
import { useToast } from "@/hooks/use-toast";

export function AddReaderCardDialog({ onReaderAdded}) {
    const [open, setOpen] = useState(false)
    const { toast } = useToast();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
            type: "student",
            status: 1,
            phoneNumber: "",
            address: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const readers = await readerApi.addReader(data)
            console.log(readers);
            toast({
                title: <p className="text-success">Thêm bạn đọc thành công</p>,
                description: "Người dùng đã được thêm thành công.",
                status: "success",
                duration: 2000,
            });
            setOpen(false);
            reset();
            onReaderAdded();
        } catch (error) {
            console.error("Error adding user:", error);
            toast({
                title: <p className="text-error">Thêm dữ liệu thất bại</p>,
                description: "Lỗi hệ thống",
                status: "error",
                duration: 2000,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={(openState) => {
            setOpen(openState);
            if (!openState) {
                reset(); // Reset form khi đóng dialog
            }
        }}>
            <DialogTrigger asChild>
                <Button>+ Thêm mới</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Thêm mới thẻ bạn đọc</DialogTitle>
                </DialogHeader>
                <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-8">
                        {/* Account Information Section */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="fullName">Họ tên (*)</label>
                                <Controller
                                    name="fullName"
                                    control={control}
                                    rules={{ required: "Họ tên là bắt buộc" }}
                                    render={({ field }) => (
                                        <>
                                            <Input {...field} id="fullName" placeholder="Nhập họ tên" />
                                            {errors.fullName && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.fullName.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="address">Địa chỉ</label>
                                <Controller
                                    name="address"
                                    control={control}
                                    rules={{ required: "Địa chỉ là bắt buộc" }}
                                    render={({ field }) => (
                                        <>
                                            <Input {...field} id="address" placeholder="Địa chỉ" />
                                            {errors.address && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.address.message}
                                                </p>
                                            )}
                                        </>

                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phoneNumber">Điện thoại</label>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    rules={{
                                        required: "Số điện thoại là bắt buộc",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Số điện thoại không hợp lệ",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <Input
                                                {...field}
                                                id="phoneNumber"
                                                placeholder="Số điện thoại"
                                            />
                                            {errors.phoneNumber && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.phoneNumber.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <label>Trạng thái</label>
                                <Controller
                                    name="status"
                                    control={control}
                                    rules={{ required: "Vui lòng chọn trạng thái" }}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                disabled
                                                onValueChange={(value) => field.onChange(Number(value))}
                                                value={field.value?.toString()}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Trạng thái" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Kích hoạt</SelectItem>
                                                    <SelectItem value="0">Chưa kích hoạt</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.status && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.status.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Personal Information Section */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email">Email (*)</label>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Email là bắt buộc",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Email không hợp lệ",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <Input {...field} id="email" placeholder="Nhập email" />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password">Mật khẩu</label>
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: "Mật khẩu là bắt buộc",
                                        minLength: {
                                            value: 6,
                                            message: "Mật khẩu phải có ít nhất 6 ký tự",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <Input
                                                {...field}
                                                id="password"
                                                type="password"
                                                placeholder="Mật khẩu"
                                            />
                                            {errors.password && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                            {/* <div className="space-y-2">
                                <label htmlFor="ID">Mã thẻ</label>
                                <Input id="cardID" placeholder="XXX-XXX-XXX" readOnly />
                            </div> */}
                            <div className="space-y-2">
                                <label htmlFor="date">Ngày hết hạn</label>
                                <Input id="expiredDay" type="date" placeholder="" />
                            </div>
                            <div className="space-y-2">
                                <label>Loại thẻ</label>
                                <Controller
                                    name="type"
                                    control={control}
                                    rules={{ required: "Vui lòng chọn loại thẻ" }}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn loại thẻ" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="student">Thẻ sinh viên</SelectItem>
                                                    <SelectItem value="guest">Thẻ vãng lai</SelectItem>
                                                    <SelectItem value="teacher">Thẻ giáo viên</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.type && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.type.message}
                                                </p>
                                            )}
                                        </>
                                    )} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-6">
                        <Button
                            variant="default"
                            type="submit"
                            onClick={() => {
                                // Handle save logic here
                            }}
                        >
                            Lưu
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => {
                                setOpen(false);
                                reset();
                            }}
                        >
                            Đóng
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

