'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function BookForm() {
    const [imageUrl, setImageUrl] = useState(null)

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
                                    <SelectValue placeholder="Thể loại" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fiction">Tiểu thuyết</SelectItem>
                                    <SelectItem value="nonfiction">Phi hư cấu</SelectItem>
                                    <SelectItem value="education">Giáo dục</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            <Label>ISBN</Label>
                            <div className="flex gap-2">
                                <Input placeholder="Nhập ISBN" />
                                <Button type="button">
                                    Tìm kiếm
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label>Tựa sách</Label>
                        <Input />
                    </div>

                    <div>
                        <Label>Tác giả</Label>
                        <Input />
                    </div>

                    <div>
                        <Label>Tóm tắt</Label>
                        <Textarea className="min-h-[100px]" />
                    </div>

                    <div>
                        <Label>Nhà xuất bản</Label>
                        <Input />
                    </div>

                    <div>
                        <Label>Ngày xuất bản</Label>
                        <Input type="date" />
                    </div>

                    <div className="flex gap-4 items-end">
                        <div className="mb-auto">
                            <Label>Số trang</Label>
                            <Input type="number" className="w-[150px]" />
                        </div>
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
                                            <div className="w-[100px] h-[150px] border border-gray-300 rounded overflow-hidden">
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
                                        <div className="w-[100px] h-[100px] border border-gray-300 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
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

