'use client'

import {Library, X} from 'lucide-react'
import {useParams} from 'react-router-dom';
import {useGetEditionByIdQuery} from "@/store/rtk/book.service.js";

export default function BookDetailPage() {

    //const [searchParams] = useSearchParams();
    //const id = searchParams.get('id');
    const {id} = useParams();

    const handleClose = () => {
        window.history.back();
    };
    const {data: editionsResponse, isLoading: isLoadingEditions} = useGetEditionByIdQuery(id);

    const editionsData = editionsResponse?.data ? editionsResponse.data : {};
    const transformedEditionData = editionsData ? {
        ...editionsData,
        titleName: editionsData.Title?.titleName || "N/A",
        categoryName: editionsData.Title?.Category?.categoryName || "N/A",
        author: editionsData.Title?.author || "N/A",
        summary: editionsData.Title?.summary,
    } : {};
    console.log(transformedEditionData)
    return (
        <div className="p-10 mx-auto space-y-8">
            {/* Close Button */}
            <button
                onClick={handleClose}
                className="absolute right-12 bg-white border-gray-600 border-[1.5px] text-black p-2 rounded-full hover:bg-gray-300 transition-all"
            >
                <X className="h-5 w-5"/> {/* Close icon */}
            </button>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Book Cover */}
                <div className="w-full md:w-72 shrink-0">
                    <div className="aspect-[3/4] relative shadow-lg rounded-lg overflow-hidden">
                        <img
                            src={transformedEditionData?.thumbnailUrl}
                            alt={transformedEditionData?.titleName}
                            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                        />
                    </div>
                </div>

                {/* Right Column - Book Details */}
                <div className="flex-1 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 ">
                            <Library className="h-5 w-5 text-[#5CD3E5]"/>
                            <span className='font-semibold'>Thể loại</span>
                        </div>
                        <span className="text-xs bg-gray-500 p-1  rounded-md text-muted-foreground">
                              {transformedEditionData?.categoryName}
                        </span>
                    </div>

                    {/* Title and Author */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{transformedEditionData?.titleName}</h1>
                        <h2 className="text-2xl text-muted-foreground">{transformedEditionData?.author}</h2>
                    </div>

                    {/* Publication Details */}
                    <div className="space-y-1">
                        <div className="flex gap-2 items-center">
                            <span className="font-semibold">{transformedEditionData?.publicationYear}</span>
                            <span>{transformedEditionData?.pages} pages</span>
                            <span className="text-muted-foreground">(Signet Classic)</span>
                        </div>

                        <div className="space-y-1 text-sm">
                            <div>
                                <span className="font-semibold">ISBN10 / OCLC: </span>
                                <span>{transformedEditionData?.isbn}</span>
                            </div>
                        </div>
                    </div>

                    {/* Added Date and Copies */}
                    <div className="space-y-1">
                        <div>
                            <span className="font-semibold">Added: </span>
                            <span>{new Date(transformedEditionData?.createdAt).toLocaleDateString() || "N/A"}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Copies: </span>
                            <span>1</span>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold border-b border-[#5CD3E5] pb-2 inline-block">
                            Description
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {transformedEditionData?.summary}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

