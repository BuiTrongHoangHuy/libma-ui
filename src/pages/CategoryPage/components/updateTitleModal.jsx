import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {ScrollArea} from "@/components/ui/scroll-area"
import {useEffect} from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {Controller, useForm} from "react-hook-form"
import {useToast} from "@/hooks/use-toast"
import {
    useGetCategoryQuery,
    useUpdateTitleMutation
} from "@/store/rtk/book.service.js";
import {categoryApi} from "@/pages/CategoryPage/api/categoryApi.js";

const updateSchema = z.object({
    titleName: z.string().min(1, "Tên tựa sách là bắt buộc"),
    author: z.string().min(1, "Tác giả là bắt buộc"),
    summary: z.string().min(1, "Tóm tắt là bắt buộc"),
    categoryId: z.number().min(1, "Chọn thể loại sách"),
})

// eslint-disable-next-line react/prop-types
export function UpdateBookTitleDialog({id, setOpen, open}) {
    const {toast} = useToast()
    const [update, {isLoading: isUpdating}] = useUpdateTitleMutation()
    const {data: categoriesResponse, isLoading: isLoadingCategories} = useGetCategoryQuery();
    const categoriesData = categoriesResponse?.data ? categoriesResponse.data : [];
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        reset,
    } = useForm({
        resolver: zodResolver(updateSchema),
    })
    useEffect(() => {
        if (id && open) {
            const fetchReaderData = async () => {
                try {
                    const response = await categoryApi.getTitleById(id)
                    console.log(response);
                    if (response.code === 200 && response.data) {
                        reset({
                            titleName: response.data.title_name,
                            author: response.data.author,
                            summary: response.data.summary,
                            categoryId: response.data.category_id
                        });
                    } else {
                        toast({
                            title: "Lỗi",
                            description: "Không tìm thấy tựa sách.",
                            status: "error",
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    toast({
                        title: "Lỗi",
                        description: "Không thể lấy thông tin người dùng.",
                        status: "error",
                    });
                }
            };
            fetchReaderData();
        }
    }, [id, open, reset, toast]);
    const handleUpdate = async (data) => {
        try {
            console.log(data)
            await update({id: id, payload: data}).unwrap()
            toast({
                title: <p className="text-success">Cập nhật thành công</p>,
                description: "Thông tin đã được cập nhật",
                status: "success",
                duration: 2000,
            })
            setOpen(false)
        } catch (error) {
            toast({
                title: <p className="text-error">Cập nhật thất bại</p>,
                description: error.message,
                status: "error",
                duration: 2000,
            })
            console.error("Update error:", error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className=" max-w-xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Cập nhật tựa sách</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-2">
                    <div className="grid gap-4 px-2">
                        <div className="space-y-2">
                            <label htmlFor="titleId" className="text-sm font-medium">
                                Mã tựa sách
                            </label>
                            <Input
                                id="titleId"
                                value={id || ""}
                                disabled
                                className="bg-gray-500 text-black text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="titleName" className="text-sm font-medium">
                                Tên tựa sách(*)
                            </label>
                            <Input
                                id="titleName"
                                {...register("titleName")}
                                placeholder="Nhập tên tựa sách"
                                className={errors.titleName ? "border-red-500" : ""}
                            />
                            {errors.titleName && (
                                <span className="text-red-500 text-sm">
                                        {errors.titleName.message}
                                    </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="author" className="text-sm font-medium">
                                Tác giả(*)
                            </label>
                            <Input
                                id="author"
                                {...register("author")}
                                placeholder="Nhập tên tác giả"
                                className={errors.author ? "border-red-500" : ""}
                            />
                            {errors.author && (
                                <span className="text-red-500 text-sm">{errors.author.message}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Thể loại(*)</label>
                            <Controller
                                control={control}
                                name="categoryId"
                                render={({field}) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger
                                            className={errors.categoryId ? "border-red-500" : ""}
                                        >
                                            <SelectValue placeholder="Chọn thể loại"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categoriesData.map((item) => (
                                                <SelectItem
                                                    key={item.category_id}
                                                    value={item.category_id}
                                                >
                                                    {item.categoryName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.categoryId && (
                                <span className="text-red-500 text-sm">Chọn thể loại sách</span>
                            )}
                        </div>
                        <div className="space-y-2 pb-2">
                            <label htmlFor="summary" className="text-sm font-medium">
                                Tóm tắt (*)
                            </label>
                            <Textarea
                                id="summary"
                                {...register("summary")}
                                placeholder="Tóm tắt"
                                className={errors.summary ? "border-red-500" : ""}
                            />
                            {errors.summary && (
                                <span className="text-red-500 text-sm">{errors.summary.message}</span>
                            )}
                        </div>
                    </div>

                </ScrollArea>
                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        onClick={handleSubmit(handleUpdate)}
                        className="bg-primary hover:bg-primary/90 text-white"
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Đang lưu..." : "Lưu"}
                    </Button>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Đóng
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
