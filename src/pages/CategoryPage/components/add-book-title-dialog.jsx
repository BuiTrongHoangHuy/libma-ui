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
import {useAddTitleMutation, useGetCategoryQuery} from "@/store/rtk/book.service.js";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {useToast} from "@/hooks/use-toast.js";

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
const titleSchema = z.object({
    titleName: z.string().min(1, "Tên tựa sách là bắt buộc"),
    author: z.string().min(1, "Tác giả là bắt buộc"),
    summary: z.string().min(1, "Tóm tắt là bắt buộc"),
    categoryId: z.number().min(1, "Chọn thể loại sách")
});

export function AddBookTitleDialog() {
    const [open, setOpen] = useState(false)
    const [addTitle, {isLoading: isAddTitleLoading}] = useAddTitleMutation();
    const {data: categoriesResponse, isLoading: isLoadingCategories} = useGetCategoryQuery();
    const categoriesData = categoriesResponse?.data ? categoriesResponse.data : [];
    const {toast} = useToast();
    const handleAddTitle = async (data) => {
        try {
            await addTitle(data).unwrap();
            toast({
                title: <p className=" text-success">Thêm thành công</p>,
                description: "Thêm tựa sách thành công",
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
    // React Hook Form with Zod schema
    const {
        register, handleSubmit, formState: {errors},
        reset, control
    } = useForm({
        resolver: zodResolver(titleSchema),
    });
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
                            <Input disabled id="titleId" className="bg-gray-500 text-black text-sm"
                                   placeholder="Mã tự động"/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="titleName" className="text-sm font-medium">
                                Tên tựa sách
                            </label>
                            <Input id="titleName"
                                   {...register("titleName")}
                                   placeholder="Nhập tên tựa sách"
                                   className={errors.titleName ? "border-red-500" : ""}/>
                            {errors.titleName &&
                                <span className="text-red-500 text-sm">{errors.titleName.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="author" className="text-sm font-medium">
                                Tác giả
                            </label>
                            <Input id="author" {...register("author")}
                                   placeholder="Nhập tên tác giả"
                                   className={errors.author ? "border-red-500" : ""}
                            />
                            {errors.author && <span className="text-red-500 text-sm">{errors.author.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Thể loại</label>
                            <Controller
                                control={control}
                                name="categoryId"
                                render={({field}) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className={errors.categoryId ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Thể loại"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categoriesData.map((item) => (
                                                <SelectItem key={item.category_id} value={item.category_id}>
                                                    {item.categoryName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.categoryId && (
                                <span className="text-red-500 text-sm">{errors.categoryId.message}</span>
                            )}
                        </div>
                        <div className="space-y-2 pb-2">
                            <label htmlFor="summary" className="text-sm font-medium">
                                Tóm tắt (*)
                            </label>
                            <Textarea id="summary" {...register("summary")}
                                      placeholder="Tóm tắt"
                                      className={errors.summary ? "border-red-500" : ""}/>
                            {errors.summary && <span className="text-red-500 text-sm">{errors.summary.message}</span>}
                        </div>
                    </div>
                </ScrollArea>
                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        onClick={
                            // Handle save logic here
                            handleSubmit(handleAddTitle)
                        }
                        className="bg-primary hover:bg-primary/90 text-white"
                        disabled={isAddTitleLoading} // Disable button while loading
                    >
                        {isAddTitleLoading ? 'Đang thêm...' : 'Lưu'}
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

