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
import {useAddEditionMutation, useGetTitleQuery} from "@/store/rtk/book.service.js";
import {z} from "zod";
import {useToast} from "@/hooks/use-toast.js";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";

const bookTitlesData = [
    {id: "B001", name: "Lập trình JavaScript"},
    {id: "B002", name: "Học máy cơ bản"},
    {id: "B003", name: "Thiết kế web hiện đại"},
    {id: "B004", name: "Phát triển ứng dụng di động"},
];
const editionSchema = z.object({
    titleId: z.number().min(1, "Chọn tựa sách"),
    editionNumber: z.string().min(1, "Nhập số phiên bản"),
    isbn: z.string().optional().transform((val) => (val.trim() === "" ? null : val)),
    publicationYear: z.string().optional(),
    publisher: z.string().optional(),
    pages: z.string().optional(),
    thumbnailUrl: z.string().optional(),
});

export function AddBookEditionDialog() {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    //const [selectedBook, setSelectedBook] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const {data: titlesResponse, isLoading: isLoadingTitles} = useGetTitleQuery(undefined,
    );
    const [addEdition, {isLoading: isAddEditionLoading}] = useAddEditionMutation();

    const titlesData = titlesResponse?.data ? titlesResponse.data : [];
    const {toast} = useToast();
    const handleAddEdition = async (data) => {
        try {
            await addEdition(data).unwrap();
            toast({
                title: <p className=" text-success">Thêm thành công</p>,
                description: "Thêm đầu sách thành công",
                status: "success",
                duration: 2000
            });
            setOpen(false);
            reset();
        } catch (error) {
            console.log("loi", error);
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
        resolver: zodResolver(editionSchema),
    });
    const inputRef = useRef(null);

    const filteredBookTitles = titlesData.filter((item) =>
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
                    <DialogTitle className="text-xl font-bold">Thêm mới đầu sách</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-2">
                    <div className="grid gap-4 px-2">
                        <div className="space-y-2">
                            <label htmlFor="editionId" className="text-sm font-medium">
                                Mã đầu sách (*)
                            </label>
                            <Input
                                disabled
                                id="editionId"
                                className="bg-gray-500 text-black text-sm"
                                placeholder="Mã tự động"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">
                                Tên tựa sách(*)
                            </label>
                            <Controller
                                control={control}
                                name="titleId"
                                render={({field}) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn tựa sách"/>
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
                                                            key={item.titleId}
                                                            value={item.titleId}
                                                            className="cursor-pointer"
                                                        >
                                                            {item.titleName}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <div className="py-2 px-2 text-sm text-gray-900">
                                                        Không tìm thấy kết quả
                                                    </div>
                                                )}
                                            </ScrollArea>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.titleId && (
                                <span className="text-red-500 text-sm">{"Chọn tựa sách"}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="editionNumber" className="text-sm font-medium">
                                Số phiên bản(*)
                            </label>
                            <Input id="editionNumber" {...register("editionNumber")}
                                   placeholder="Nhập số phiên bản"
                                   className={errors.editionNumber ? "border-red-500" : ""}
                            />
                            {errors.editionNumber && (
                                <span className="text-red-500 text-sm">{errors.editionNumber.message}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="publicationYear" className="text-sm font-medium">
                                Năm xuất bản
                            </label>
                            <Input id="publicationYear" {...register("publicationYear")}
                                   placeholder="Nhập năm xuất bản"/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="publisher" className="text-sm font-medium">
                                Nhà xuất bản
                            </label>
                            <Input id="publisher" {...register("publisher")} placeholder="Nhập nhà xuất bản"/>
                        </div>
                        <div className="space-y-2 pb-2">
                            <label htmlFor="isbn" className="text-sm font-medium">
                                ISBN
                            </label>
                            <Input id="isbn" {...register("isbn")} placeholder="Mã ISBN"/>
                        </div>
                    </div>
                </ScrollArea>
                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        onClick={
                            handleSubmit(handleAddEdition)
                        }
                        className="bg-primary hover:bg-primary/90 text-white"
                        disabled={isAddEditionLoading}
                    >
                        {isAddEditionLoading ? 'Đang thêm...' : 'Lưu'}
                    </Button>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Đóng
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}