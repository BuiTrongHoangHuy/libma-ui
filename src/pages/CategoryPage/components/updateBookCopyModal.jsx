import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useEffect} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    useUpdateBookCopyMutation,
    useGetBookCopyByIdQuery,
    useGetEditionQuery
} from "@/store/rtk/book.service.js";
import {useToast} from "@/hooks/use-toast.js";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {categoryApi} from "@/pages/CategoryPage/api/categoryApi.js";

const bookCopyUpdateSchema = z.object({
    editionId: z.number().min(1, "Chọn đầu sách"),
    location: z.string().optional(),
    condition: z.string().optional(),
    bookStatus: z.string().optional(),
});

// eslint-disable-next-line react/prop-types
export function UpdateBookCopyDialog({id, open, setOpen}) {
    const {toast} = useToast();
    const {data: editionResponse, isLoading: isLoadingEdition} = useGetEditionQuery();
    const editionData = editionResponse?.data || [];
    const [updateBookCopy, {isLoading: isUpdating}] = useUpdateBookCopyMutation();

    const transformedEditionData = editionData.map((item) => ({
        ...item,
        titleName: item.Title?.titleName || "N/A",
        editionNumber: item.editionNumber || "N/A",
        publisher: item.publisher || "N/A",
    }));

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(bookCopyUpdateSchema),
    });

    useEffect(() => {
        if (id && open) {
            const fetchReaderData = async () => {
                try {
                    const response = await categoryApi.getBookById(id)
                    console.log(response);
                    if (response.code === 200 && response.data) {
                        reset({
                            editionId: response.data.Edition.editionId || "",
                            location: response.data.location || "",
                            condition: response.data.condition || "",
                            bookStatus: response.data.bookStatus || "",
                        });
                    } else {
                        toast({
                            title: "Lỗi",
                            description: "Không tìm thấy sách.",
                            status: "error",
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    toast({
                        title: "Lỗi",
                        description: "Không tìm thấy sách.",
                        status: "error",
                    });
                }
            };
            fetchReaderData();
        }
    }, [id, open, reset, toast]);
    const handleUpdateBookCopy = async (data) => {
        try {
            await updateBookCopy({itemId: id, payload: data}).unwrap();
            toast({
                title: <p className=" text-success">Cập nhật thành công</p>,
                description: "Thông tin sách đã được cập nhật",
                status: "success",
                duration: 2000,
            });
            setOpen(false);
        } catch (error) {
            console.error("Error updating book copy:", error);
            toast({
                title: <p className=" text-error">Cập nhật thất bại</p>,
                description: error.data?.message || "Có lỗi xảy ra",
                status: "error",
                duration: 2000,
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Cập nhật thông tin sách</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-2">
                    <div className="grid gap-4 px-2">
                        <div className="space-y-2">
                            <label htmlFor="editionId" className="text-sm font-medium">
                                Đầu sách
                            </label>
                            <Controller
                                control={control}
                                name="editionId"
                                render={({field}) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn đầu sách"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {transformedEditionData.map((item) => (
                                                <SelectItem
                                                    key={item.editionId}
                                                    value={item.editionId}
                                                    className="cursor-pointer"
                                                >
                                                    {item.titleName + " - Phiên bản: " + item.editionNumber}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.editionId && (
                                <span className="text-red-500 text-sm">{errors.editionId.message}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="location" className="text-sm font-medium">
                                Vị trí
                            </label>
                            <Input
                                id="location"
                                {...register("location")}
                                placeholder="Nhập vị trí lưu trữ"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="condition" className="text-sm font-medium">
                                Tình trạng
                            </label>
                            <Controller
                                control={control}
                                name="condition"
                                render={({field}) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Tình trạng sách"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="New">Mới</SelectItem>
                                            <SelectItem value="Good">Tốt</SelectItem>
                                            <SelectItem value="Old">Cũ</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="status" className="text-sm font-medium">
                                Trạng thái
                            </label>
                            <Controller
                                control={control}
                                name="bookStatus"
                                render={({field}) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Trạng thái mượn"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Borrowed">Đang mượn</SelectItem>
                                            <SelectItem value="Available">Có sẵn</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                </ScrollArea>
                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        onClick={handleSubmit(handleUpdateBookCopy)}
                        className="bg-primary hover:bg-primary/90 text-white"
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Đang cập nhật..." : "Lưu"}
                    </Button>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Đóng
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
