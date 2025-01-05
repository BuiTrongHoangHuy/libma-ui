import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
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
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useToast} from "@/hooks/use-toast.js";
import {useAddCategoryMutation, useAddTitleMutation} from "@/store/rtk/book.service.js";


const categorySchema = z.object({
    categoryName: z.string().min(1, "Tên tựa sách là bắt buộc"),
    note: z.string().optional(),

});

export function AddPublicationDialog() {
    const [open, setOpen] = useState(false)
    const {
        register, handleSubmit, formState: {errors},
        reset
    } = useForm({
        resolver: zodResolver(categorySchema),
    });
    const [addCategory, {isLoading: isAddCategoryLoading}] = useAddCategoryMutation();

    const {toast} = useToast();
    const handleAddCategory = async (data) => {
        try {
            await addCategory(data).unwrap();
            toast({
                title: <p className=" text-success">Thêm thành công</p>,
                description: "Thêm phân loại thành công",
                status: "success",
                duration: 2000
            });
            setOpen(false);
            reset();
        } catch (error) {
            toast({
                title: <p className=" text-error">{error.response.data}</p>,
                status: "error",
                duration: 2000
            });
            console.error("Lỗi khi thêm tựa sách:", error);
        }
    };
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
                            <Input disabled id="publicationId" className="bg-gray-500 text-black text-sm"
                                   placeholder="Mã tự động"/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="groupName" className="text-sm font-medium">
                                Tên phân loại (*)
                            </label>
                            <Input id="publicationName" {...register("categoryName")}
                                   placeholder="Nhập tên phân loại"
                                   className={errors.categoryName ? "border-red-500" : ""}/>
                            {errors.categoryName &&
                                <span className="text-red-500 text-sm">{errors.categoryName.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="notes" className="text-sm font-medium">
                                Ghi chú
                            </label>
                            <Textarea id="note" {...register("note")}
                                      placeholder="Nhập ghi chú"
                                      className={errors.note ? "border-red-500" : ""}/>
                            {errors.note &&
                                <span className="text-red-500 text-sm">{errors.note.message}</span>}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="isActive"/>
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
                        onClick={
                            // Handle save logic here
                            handleSubmit(handleAddCategory)
                        }
                        className="bg-primary hover:bg-primary/90 text-white"
                        disabled={isAddCategoryLoading} // Disable button while loading
                    >
                        {isAddCategoryLoading ? 'Đang thêm...' : 'Lưu'}
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

