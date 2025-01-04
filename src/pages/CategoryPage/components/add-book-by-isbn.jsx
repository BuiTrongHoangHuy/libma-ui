'use client'

import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {useState} from "react"
import {useToast} from "@/hooks/use-toast.js";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";


const bookFormSchema = z.object({
    title: z.string().min(1, "Tiêu đề không được để trống"),
    author: z.string().min(1, "Tác giả không được để trống"),
    summary: z.string().optional(),
    publisher: z.string().min(1, "Nhà xuất bản không được để trống"),
    publishedDate: z.string().min(1, "Ngày xuất bản không được để trống"),
    pageCount: z.number().optional()
});
export default function BookForm() {
    const [imageUrl, setImageUrl] = useState(null)


    const [isbn, setIsbn] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        summary: "",
        editionName: "",
        publisher: "",
        publishedDate: "",
        isbn: "",
        pageCount: 0,
    })
    const [searchType, setSearchType] = useState("isbn");

    const {toast} = useToast()
    const handleSearch = async () => {
        if (!isbn.trim()) {
            return
        }
        const queryKey = searchType === "isbn" ? `ISBN:${isbn}` : `OCLC:${isbn}`;

        try {
            const response = await fetch(
                `https://openlibrary.org/api/books?bibkeys=${queryKey}&format=json&jscmd=details`
            )
            if (!response.ok) throw new Error("Không thể lấy dữ liệu từ API.")
            const data = await response.json()
            console.log("openlibrary", data)
            const bookData = data[queryKey]?.details;
            if (bookData) {
                setFormData({
                    title: bookData.title || "",
                    author: bookData.authors?.map((author) => author.name).join(", ") || "",
                    summary: bookData.subtitle || "",
                    editionName: bookData.edition_name || "",
                    publisher: bookData.publishers?.[0] || "",
                    publishedDate: bookData.publish_date || "",
                    isbn: searchType === "isbn" ? bookData.isbn_10 : bookData.oclc_number || null,
                    pageCount: bookData.number_of_pages || 0,
                })

                setImageUrl(
                    data[queryKey]?.thumbnail_url ||
                    `https://covers.openlibrary.org/b/id/${bookData.covers?.[0]}-L.jpg` ||
                    null
                );
            } else {
                toast({
                    title: <p className=" text-warning-500">Tìm không thành công</p>,
                    description: `Không tìm thấy sách với ${searchType.toUpperCase()} đã nhập`,
                    status: "warning",
                    duration: 2000
                });
            }
        } catch (error) {
            console.error(error)
            toast({
                title: <p className=" text-error">Tìm không thành công</p>,
                description: "Đã xảy ra lỗi khi tìm kiếm sách",
                status: "error",
                duration: 2000
            });
            //alert("Đã xảy ra lỗi khi tìm kiếm sách.")
        }
    }
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setImageUrl(url)
        }
    }

    return (
        <Card className="w-full  mx-auto">
            <CardContent className="p-6">
                <form className="space-y-6">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Label>Chọn thể loại</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Thể loại"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fiction">Tiểu thuyết</SelectItem>
                                    <SelectItem value="nonfiction">Phi hư cấu</SelectItem>
                                    <SelectItem value="education">Giáo dục</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <Label>Loại tìm kiếm</Label>
                            <Select
                                onValueChange={(value) => setSearchType(value)}
                                defaultValue="isbn"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn loại tìm kiếm"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="isbn">ISBN</SelectItem>
                                    <SelectItem value="oclc">OCLC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <Label>Mã {searchType === "isbn" ? "ISBN" : "OCLC"}</Label>
                            <div className="flex gap-2">
                                <Input placeholder={`Nhập ${searchType.toUpperCase()}`}
                                       value={isbn}
                                       onChange={(e) => setIsbn(e.target.value)}/>
                                <Button type="button" onClick={handleSearch}>
                                    Tìm kiếm
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label>Tựa sách</Label>
                        <Input value={formData.title}
                               onChange={(e) => setFormData({...formData, title: e.target.value})}/>
                    </div>

                    <div>
                        <Label>Tác giả</Label>
                        <Input value={formData.author}
                               onChange={(e) => setFormData({...formData, author: e.target.value})}/>
                    </div>

                    <div>
                        <Label>Tóm tắt</Label>
                        <Textarea className="min-h-[100px]"
                                  value={formData.summary}
                                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                        />
                    </div>

                    <div>
                        <Label>Nhà xuất bản</Label>
                        <Input value={formData.publisher}
                               onChange={(e) => setFormData({...formData, publisher: e.target.value})}/>
                    </div>

                    <div>
                        <Label>Năm xuất bản</Label>
                        <Input
                            type="number"
                            value={formData.publishedDate}
                            onChange={(e) => setFormData({...formData, publishedDate: e.target.value})}
                        />
                    </div>

                    <div className="flex gap-4 items-end">
                        <div className="mb-auto">
                            <Label>Số trang</Label>
                            <Input
                                type="number"
                                className="w-[150px]"
                                value={formData.pageCount}
                                onChange={(e) => setFormData({...formData, pageCount: +e.target.value})}
                            /></div>
                        <div className="flex-1">
                            <input
                                type="file"
                                accept="image/*"
                                id="image-upload"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                            <div className="flex gap-4 items-start">
                                <Button
                                    className="mt-[23px]"
                                    variant="secondary"
                                    onClick={() => document.getElementById('image-upload')?.click()}
                                    type="button"
                                >
                                    Thêm hình
                                </Button>
                                <div>
                                    {imageUrl ? (
                                        <div className="flex flex-col items-center">
                                            <div
                                                className="w-[100px] h-[150px] border border-gray-300 rounded overflow-hidden">
                                                <img
                                                    src={imageUrl}
                                                    alt="Uploaded image"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <button
                                                className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                                onClick={() => setImageUrl(null)}
                                                type="button"
                                            >
                                                Xóa ảnh
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            className="w-[100px] h-[100px] border border-gray-300 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                                            No Image
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button>
                            Thêm mới
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

