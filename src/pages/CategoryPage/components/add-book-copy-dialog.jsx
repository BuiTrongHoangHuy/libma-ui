import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useState, useRef} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    useAddBookCopyMutation,
    useAddEditionMutation,
    useGetEditionQuery,
    useGetTitleQuery
} from "@/store/rtk/book.service.js";
import {useToast} from "@/hooks/use-toast.js";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";

const bookTitlesData = [
    {id: "B001", name: "Lập trình JavaScript"},
    {id: "B002", name: "Học máy cơ bản"},
    {id: "B003", name: "Thiết kế web hiện đại"},
    {id: "B004", name: "Phát triển ứng dụng di động"},
];
const bookCopySchema = z.object({
    editionId: z.number().min(1, "Chọn đầu sách"),
    condition: z.string().optional(),
    location: z.string().optional(),
    bookStatus: z.string().optional(),
});

export function AddBookCopyDialog() {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const inputRef = useRef(null);

    const {data: editionResponse, isLoading: isLoadingEdition} = useGetEditionQuery();
    const editionData = editionResponse?.data ? editionResponse.data : [];
    const transformedEditionData = editionData.map((item) => ({
        ...item,
        titleName: item.Title?.titleName || "N/A",
        categoryName: item.Title?.Category?.categoryName || "N/A",
        author: item.Title?.author || "N/A",
    }));

    console.log("du lieu chuyen doi", transformedEditionData)
    const [addBookCopy, {isLoading: isAddBookCopyLoading}] = useAddBookCopyMutation();

    const {toast} = useToast();
    const handleAddBookCopy = async (data) => {
        try {
            await addBookCopy(data).unwrap();
            toast({
                title: <p className=" text-success">Thêm thành công</p>,
                description: "Thêm sách thành công",
                status: "success",
                duration: 2000
            });
            setOpen(false);
            reset();
        } catch (error) {
            toast({
                title: <p className=" text-error">{error.data.message}</p>,
                status: "error",
                duration: 2000
            });
            console.error("Lỗi khi thêm đầu sách:", error);
        }
    };
    const {
        register, handleSubmit, formState: {errors},
        reset, control
    } = useForm({
        resolver: zodResolver(bookCopySchema),
    });
    const filteredBookTitles = transformedEditionData.filter((item) =>
        item.titleName.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleSearchFocus = () => {
        setIsSearching(true);
    };

    const handleBlur = (e) => {
        if (isSearching) {
            e.preventDefault();
            inputRef.current?.focus();
        }
    };


    const handleKeyDown = (e) => {
        if (isSearching && e.key !== 'Tab') {
            e.stopPropagation();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Thêm mới</Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Thêm mới sách</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-2">
                    <div className="grid gap-4 px-2">
                        <div className="space-y-2">
                            <label htmlFor="bookId" className="text-sm font-medium">
                                Mã cuốn sách (*)
                            </label>
                            <Input
                                disabled
                                id="bookId"
                                className="bg-gray-500 text-black text-sm"
                                placeholder="Mã tự động"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="bookTitle" className="text-sm font-medium">
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
                                            <div className="px-2 py-1">
                                                <Input
                                                    ref={inputRef}
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    onFocus={handleSearchFocus}
                                                    onBlur={handleBlur}
                                                    placeholder="Tìm kiếm..."
                                                    className="h-8"
                                                />
                                            </div>
                                            <ScrollArea className="max-h-[200px]">
                                                {filteredBookTitles.length > 0 ? (
                                                    filteredBookTitles.map((item) => (
                                                        <SelectItem
                                                            key={item.editionId}
                                                            value={item.editionId}
                                                            className="cursor-pointer"
                                                        >
                                                            {item.titleName + " - Phiên bản: " + item.editionNumber + "- NXB: " + item.publisher}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <div className="py-2 px-2 text-sm text-gray-500">
                                                        Không tìm thấy kết quả
                                                    </div>
                                                )}
                                            </ScrollArea>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.editionId && (
                                <span className="text-red-500 text-sm">{"Chọn đầu sách"}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="location" className="text-sm font-medium">
                                Vị trí
                            </label>
                            <Input id="location" {...register("location")} placeholder="Nhập vị trí lưu trữ"/>
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
                        onClick={
                            handleSubmit(handleAddBookCopy)
                        }
                        className="bg-primary hover:bg-primary/90 text-white"
                        disabled={isAddBookCopyLoading} // Disable button while loading
                    >
                        {isAddBookCopyLoading ? 'Đang thêm...' : 'Lưu'}
                    </Button>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Đóng
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}