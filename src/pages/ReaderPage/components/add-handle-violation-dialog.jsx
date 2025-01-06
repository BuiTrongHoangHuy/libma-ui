import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {ScrollArea} from "@/components/ui/scroll-area"
import {useState} from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {z} from "zod"
import {useAddViolationMutation} from "@/store/rtk/book.service.js";
import {useToast} from "@/hooks/use-toast.js";
import {readerApi} from "@/pages/ReaderPage/api/readerApi.js";

export function AddHandleViolationDialog() {
    const [open, setOpen] = useState(false)

    // Form states
    const [cardCode, setCardCode] = useState("")
    const [fullName, setFullName] = useState("")
    const [contentViolation, setContentViolation] = useState("")
    const [bookCode, setBookCode] = useState("")
    const [penaltyType, setPenaltyType] = useState("")
    const [penaltyDate, setPenaltyDate] = useState("")
    const [penaltyEndDate, setPenaltyEndDate] = useState("")
    const [fineAmount, setFineAmount] = useState("")
    const [errors, setErrors] = useState({}) // Error state for form validation

    const violationSchema = z.object({
        readerId: z.string().min(1, "Số thẻ là bắt buộc"),
        violationType: z.enum(["Late_Return", "Lost_Book", "Damaged_Book"], {
            required_error: "Lý do phạt là bắt buộc",
            message: "Lý do phạt là bắt buộc"
        }),
        description: z.string().min(1, "Nội dung vi phạm là bắt buộc"),
        fineAmount: z
            .string()
            .regex(/^\d+(\.\d{1,2})?$/, "Số tiền phạt phải là số hợp lệ")
            .optional(),
        penaltyDate: z.string().nonempty("Ngày phạt là bắt buộc"),
        penaltyEndDate: z.string().optional(),
    })
    const [addViolation, {isLoading: isViolationLoading}] = useAddViolationMutation();
    const {toast} = useToast()
    const handleSave = async () => {
        const formData = {
            readerId: cardCode,
            violationType: penaltyType,
            description: contentViolation,
            fineAmount: fineAmount || undefined,
            penaltyDate: penaltyDate,
            penaltyEndDate: penaltyEndDate || undefined,
        }

        try {
            violationSchema.parse(formData)
            setErrors({}) // Clear previous errors
            console.log(formData)
            await addViolation(formData).unwrap()
            toast({
                title: <p className=" text-success">Thêm thành công</p>,
                description: "Thêm xử lý vi phạm thành công",
                status: "success",
                duration: 2000
            });
            setOpen(false)
        } catch (validationError) {
            if (validationError instanceof z.ZodError) {
                const errorMap = validationError.errors.reduce(
                    (acc, err) => ({
                        ...acc,
                        [err.path[0]]: err.message,
                    }),
                    {}
                )
                setErrors(errorMap)
                toast({
                    title: <p className=" text-error">Thêm thất bại</p>,
                    description: "Thêm xử lý vi phạm thất bại",
                    status: "error",
                    duration: 2000
                });
                console.error("Validation Errors:", errorMap)
            } else {
                console.error("Unexpected Error:", validationError)
                toast({
                    title: <p className=" text-error">Thêm thất bại</p>,
                    description: "Thêm xử lý vi phạm thất bại",
                    status: "error",
                    duration: 2000
                });
            }
        }
    }
    const findReader = async (id) => {
        try {
            const response = await readerApi.getReaderById(id)
            console.log(response)
            setFullName(response.data?.full_name || "");
            if (cardCode === "") setFullName("")
        } catch (error) {
            console.error("Lỗi khi tìm người đọc:", error);
        }
    }
    const handleBlur = () => {
        setFullName("")
        if (cardCode) {
            findReader(cardCode);
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Thêm mới</Button>
            </DialogTrigger>
            <DialogContent className=" max-w-xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Thêm mới vi phạm</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-4">
                    <div className="grid gap-4 px-2">
                        <div className="space-y-2">
                            <label htmlFor="cardCode" className="text-sm font-medium">
                                Số thẻ (*)
                            </label>
                            <Input
                                id="cardCode"
                                placeholder="Nhập mã"
                                value={cardCode}
                                onBlur={handleBlur}
                                onChange={(e) => setCardCode(e.target.value)}
                            />
                            {errors.reader_id && (
                                <p className="text-red-500 text-sm">{errors.reader_id}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="text-sm font-medium">
                                Họ và tên
                            </label>
                            <Input
                                className={"bg-gray-600"}
                                id="fullName"
                                placeholder="Họ và tên"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                disabled={true}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="contentViolation" className="text-sm font-medium">
                                Nội dung vi phạm (*)
                            </label>
                            <Textarea
                                id="contentViolation"
                                placeholder="Nội dung vi phạm"
                                value={contentViolation}
                                onChange={(e) => setContentViolation(e.target.value)}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description}</p>
                            )}
                        </div>
                        {/*<div className="space-y-2">
                            <label htmlFor="bookCode" className="text-sm font-medium">
                                Mã sách
                            </label>
                            <Input
                                id="bookCode"
                                placeholder="Nhập mã"
                                value={bookCode}
                                onChange={(e) => setBookCode(e.target.value)}
                            />
                        </div>*/}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Lý do phạt</label>
                            <Select
                                value={penaltyType}
                                onValueChange={setPenaltyType}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn hình thức phạt"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Late_Return"> Quá hạn trả</SelectItem>
                                    <SelectItem value="Lost_Book">Mất sách</SelectItem>
                                    <SelectItem value="Damaged_Book">Hỏng sách</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.violation_type && (
                                <p className="text-red-500 text-sm">{errors.violation_type}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="beginAt" className="text-sm font-medium">
                                Ngày phạt
                            </label>
                            <Input
                                id="beginAt"
                                type="date"
                                value={penaltyDate}
                                onChange={(e) => setPenaltyDate(e.target.value)}
                            />
                            {errors.penalty_date && (
                                <p className="text-red-500 text-sm">{errors.penalty_date}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="endAt" className="text-sm font-medium">
                                Ngày kết thúc
                            </label>
                            <Input
                                id="endAt"
                                type="date"
                                value={penaltyEndDate}
                                onChange={(e) => setPenaltyEndDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="fine" className="text-sm font-medium">
                                Số tiền phạt
                            </label>
                            <Input
                                id="fine"
                                placeholder="Nhập tiền phạt"
                                value={fineAmount}
                                onChange={(e) => setFineAmount(e.target.value)}
                            />
                            {errors.fine_amount && (
                                <p className="text-red-500 text-sm">{errors.fine_amount}</p>
                            )}
                        </div>
                    </div>
                </ScrollArea>
                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        onClick={handleSave}
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
