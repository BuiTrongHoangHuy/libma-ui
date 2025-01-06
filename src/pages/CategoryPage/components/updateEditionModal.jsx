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
import {useToast} from "@/hooks/use-toast";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {
    useUpdateEditionMutation,
    useGetTitleQuery,
} from "@/store/rtk/book.service.js";
import {categoryApi} from "@/pages/CategoryPage/api/categoryApi.js";

const editionUpdateSchema = z.object({
    titleId: z.number().min(1, "Chọn tựa sách"),
    editionNumber: z.string().min(1, "Nhập số phiên bản"),
    isbn: z.string().optional().transform((val) => (val.trim() === "" ? null : val)),
    publicationYear: z.string().optional(),
    publisher: z.string().optional(),
});

// eslint-disable-next-line react/prop-types
export function UpdateBookEditionDialog({id, open, setOpen}) {
    const {toast} = useToast();
    const {data: titlesResponse, isLoading: isLoadingTitles} = useGetTitleQuery();
    const [updateEdition, {isLoading: isUpdating}] = useUpdateEditionMutation();

    const titlesData = titlesResponse?.data || [];

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        reset,
    } = useForm({
        resolver: zodResolver(editionUpdateSchema),
    });

    useEffect(() => {
        if (id && open) {
            const fetchReaderData = async () => {
                try {
                    const response = await categoryApi.getEditionById(id)
                    console.log(response);
                    if (response.code === 200 && response.data) {
                        reset({
                            titleId: response.data.Title.titleId || "",
                            editionNumber: response.data.editionNumber.toString() || "",
                            isbn: response.data.isbn || "",
                            publicationYear: response.data.publicationYear || "",
                            publisher: response.data.publisher || "",
                        });
                    } else {
                        toast({
                            title: "Lỗi",
                            description: "Không tìm thấy đầu sách.",
                            status: "error",
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    toast({
                        title: "Lỗi",
                        description: "Không tìm thấy đầu sách.",
                        status: "error",
                    });
                }
            };
            fetchReaderData();
        }
    }, [id, open, reset, toast]);
    const handleUpdateEdition = async (data) => {
        try {
            await updateEdition({id: id, payload: data}).unwrap();
            toast({
                title: <p className="text-success">Cập nhật thành công</p>,
                description: "Thông tin phiên bản đã được cập nhật",
                status: "success",
                duration: 2000,
            });
            setOpen(false);
        } catch (error) {
            console.error("Update error:", error);
            toast({
                title: <p className="text-error">Cập nhật thất bại</p>,
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
                    <DialogTitle className="text-xl font-bold">Cập nhật phiên bản sách</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-2">
                    <div className="grid gap-4 px-2">
                        <div className="space-y-2">
                            <label htmlFor="editionId" className="text-sm font-medium">
                                Mã phiên bản
                            </label>
                            <Input
                                id="editionId"
                                value={id || ""}
                                disabled
                                className="bg-gray-500 text-black text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">
                                Tựa sách (*)
                            </label>
                            <Controller
                                control={control}
                                name="titleId"
                                render={({field}) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn tựa sách"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {titlesData.map((item) => (
                                                <SelectItem
                                                    key={item.titleId}
                                                    value={item.titleId}
                                                >
                                                    {item.titleName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.titleId && (
                                <span className="text-red-500 text-sm">
                                        {errors.titleId.message}
                                    </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="editionNumber" className="text-sm font-medium">
                                Số phiên bản (*)
                            </label>
                            <Input
                                id="editionNumber"
                                {...register("editionNumber")}
                                placeholder="Nhập số phiên bản"
                                className={errors.editionNumber ? "border-red-500" : ""}
                            />
                            {errors.editionNumber && (
                                <span className="text-red-500 text-sm">
                                        {errors.editionNumber.message}
                                    </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="publicationYear" className="text-sm font-medium">
                                Năm xuất bản
                            </label>
                            <Input
                                id="publicationYear"
                                {...register("publicationYear")}
                                placeholder="Nhập năm xuất bản"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="publisher" className="text-sm font-medium">
                                Nhà xuất bản
                            </label>
                            <Input
                                id="publisher"
                                {...register("publisher")}
                                placeholder="Nhập nhà xuất bản"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="isbn" className="text-sm font-medium">
                                ISBN
                            </label>
                            <Input
                                id="isbn"
                                {...register("isbn")}
                                placeholder="Mã ISBN"
                            />
                        </div>
                    </div>
                </ScrollArea>
                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        onClick={handleSubmit(handleUpdateEdition)}
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
