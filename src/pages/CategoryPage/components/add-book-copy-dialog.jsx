import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const bookTitlesData = [
    { id: "B001", name: "Lập trình JavaScript" },
    { id: "B002", name: "Học máy cơ bản" },
    { id: "B003", name: "Thiết kế web hiện đại" },
    { id: "B004", name: "Phát triển ứng dụng di động" },
];

export function AddBookCopyDialog() {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const inputRef = useRef(null);

    const filteredBookTitles = bookTitlesData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setIsSearching(true);
        setSearchTerm(e.target.value);
    };

    const handleSearchFocus = () => {
        setIsSearching(true);
    };

    const handleBlur = (e) => {
        if (isSearching) {
            e.preventDefault();
            inputRef.current?.focus();
        }
    };

    const handleSelectChange = (id) => {
        const selected = bookTitlesData.find((item) => item.id === id);
        setSelectedBook(selected);
        setSearchTerm("");
        setIsSearching(false);
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
                                Tên sách
                            </label>
                            <Select value={selectedBook?.id || ""} onValueChange={handleSelectChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn tựa sách" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="px-2 py-1">
                                        <Input
                                            ref={inputRef}
                                            type="text"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
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
                                                    key={item.id}
                                                    value={item.id}
                                                    className="cursor-pointer"
                                                >
                                                    {item.name}
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
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="location" className="text-sm font-medium">
                                Vị trí
                            </label>
                            <Input id="location" placeholder="Nhập số phiên bản" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="condition" className="text-sm font-medium">
                                Tình trạng
                            </label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tình trạng sách" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new">Mới</SelectItem>
                                    <SelectItem value="better">Tốt</SelectItem>
                                    <SelectItem value="old">Cũ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="status" className="text-sm font-medium">
                                Trạng thái
                            </label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Trạng thái mượn" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="borrowed">Đang mượn</SelectItem>
                                    <SelectItem value="available">Có sẵn</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </ScrollArea>
                <div className="flex justify-end space-x-2 pt-4">
                    <Button
                        onClick={() => {
                            // Handle save logic here
                            setOpen(false);
                        }}
                        className="bg-primary hover:bg-primary/90 text-white"
                    >
                        Lưu
                    </Button>
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Đóng
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}