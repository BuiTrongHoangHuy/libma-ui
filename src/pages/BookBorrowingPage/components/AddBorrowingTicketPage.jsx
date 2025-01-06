import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Select from "react-select";
import {
    useAddLoanRecordMutation, useGetBookCopyAvailableQuery, useGetBookCopyQuery,
} from "@/store/rtk/book.service.js";
import {readerApi} from "@/pages/ReaderPage/api/readerApi.js";
import {useToast} from "@/hooks/use-toast.js";  // Import React Select


export function AddBorrowingTicketPage() {
    const [readerCard, setReaderCard] = useState("");
    const [fullName, setFullName] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectedBookOption, setSelectedBookOption] = useState(null);
    const {toast} = useToast()
    const findReader = async (id) => {
        try {
            const response = await readerApi.getReaderById(id)
            console.log(response)
            setFullName(response.data?.full_name || "");
        } catch (error) {
            console.error("Lỗi khi tìm người đọc:", error);
        }
    }
    const [addLoanRecord, {isLoading: isAddLoanRecordLoading}] = useAddLoanRecordMutation();
    const {data: bookCopyResponse, isLoading: isLoadingBookCopy} = useGetBookCopyAvailableQuery();
    const bookCopyData = bookCopyResponse?.data ? bookCopyResponse.data : [];

    const handleBlur = () => {
        setFullName("")
        if (readerCard) {
            findReader(readerCard);
        }
    };

    const handleAddBook = () => {
        if (selectedBookOption) {
            const book = bookCopyData.find((b) => b.copyId === selectedBookOption.value);
            if (book && !selectedBooks.some((selected) => selected.copyId === book.copyId)) {
                setSelectedBooks([...selectedBooks, book]);
                setSelectedBookOption(null);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const ticketData = {
                readerId: readerCard,
                fullName,
                loanDate: creationDate,
                dueDate,
                loanBooks: selectedBooks.map((book) => ({
                    copyId: book.copyId,
                    loanDate: creationDate,
                    dueDate: dueDate,
                })),
            };
            await addLoanRecord(ticketData).unwrap()
            toast({
                title: <p className=" text-success">Thêm thành công</p>,
                description: "Thêm phiếu mượn thành công",
                status: "success",
                duration: 2000
            });
            setSelectedBooks([])
            setDueDate("")
            setCreationDate("")
            setReaderCard("")
            setFullName("")
        } catch (error) {
            console.log("loi api", error)
            toast({
                title: <p className=" text-error">Thêm thất bại</p>,
                description: "Thêm phiếu mượn thất bại",
                status: "error",
                duration: 2000
            });
        }

    };

    const bookOptions = bookCopyData.map((book) => ({
        value: book.copyId,
        label: `${book.copyId} - ${book.Edition?.Title?.titleName} - ${book.Edition?.Title.author}`,
    }));


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Thêm phiếu mượn sách</h1>

            {/* Form nhập thông tin phiếu mượn */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="readerCard" className="text-sm font-medium">Số thẻ bạn đọc</label>
                    <Input
                        id="readerCard"
                        value={readerCard}
                        onChange={(e) => setReaderCard(e.target.value)}
                        onBlur={handleBlur}
                        placeholder="Nhập số thẻ"
                    />
                </div>
                <div>
                    <label htmlFor="fullName" className="text-sm font-medium">Họ tên</label>
                    <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Họ tên"
                        disabled={true}
                    />
                </div>
                <div>
                    <label htmlFor="creationDate" className="text-sm font-medium">Ngày tạo phiếu</label>
                    <Input
                        id="creationDate"
                        type="date"
                        value={creationDate}
                        onChange={(e) => setCreationDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="dueDate" className="text-sm font-medium">Ngày hết hạn</label>
                    <Input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
            </div>

            <div className={"grid grid-cols-2 gap-4 justify-center"}>
                <div className="mb-4">
                    <label htmlFor="bookCode" className="text-sm font-medium">Chọn sách</label>
                    <div className="flex space-x-2">
                        <Select
                            className={"w-full"}
                            id="bookCode"
                            options={bookOptions}
                            value={selectedBookOption}
                            onChange={setSelectedBookOption}
                            placeholder="Chọn sách"
                            isSearchable
                        />
                    </div>
                </div>

                {/* Nút thêm sách */}
                <div className="mt-6">
                    <Button onClick={handleAddBook}>Thêm sách</Button>
                </div>
            </div>


            {/* Bảng hiển thị danh sách sách đang thêm */}
            <div className="mb-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Mã sách</TableHead>
                            <TableHead>Tên sách</TableHead>
                            <TableHead>Tác giả</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedBooks.map((book) => (
                            <TableRow key={book.copyId}>
                                <TableCell>{book.copyId}</TableCell>
                                <TableCell>{book.Edition?.Title?.titleName}</TableCell>
                                <TableCell>{book.Edition?.Title?.author}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSubmit}>Lưu phiếu mượn</Button>

            </div>
        </div>
    );
}
