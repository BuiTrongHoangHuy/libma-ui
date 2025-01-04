'use client'

import { Book, Library, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom';

export default function BookDetailPage() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const handleClose = () => {
        window.history.back();  
    };

    return (
        <div className="p-10 mx-auto space-y-8">
            {/* Close Button */}
            <button 
                onClick={handleClose}
                className="absolute top-6 right-6 bg-white border-gray-600 border-[1.5px] text-black p-2 rounded-full hover:bg-gray-300 transition-all"
            >
                <X className="h-5 w-5" />  {/* Close icon */}
            </button>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Book Cover */}
                <div className="w-full md:w-72 shrink-0">
                    <div className="aspect-[3/4] relative shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://d23tvywehq0xq.cloudfront.net/ddc88f8888f794c4a4f4db0e030bf148.jpg"
                            alt="1984 Book Cover"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Right Column - Book Details */}
                <div className="flex-1 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 ">
                            <Library className="h-5 w-5 text-[#5CD3E5]" />
                            <span className='font-semibold'>Thể loại</span>
                        </div>
                        <span className="text-xs bg-gray-500 p-1  rounded-md text-muted-foreground">
                            Book
                        </span>
                    </div>

                    {/* Title and Author */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">1984 (Signet Classics)</h1>
                        <h2 className="text-2xl text-muted-foreground">George Orwell</h2>
                    </div>

                    {/* Publication Details */}
                    <div className="space-y-1">
                        <div className="flex gap-2 items-center">
                            <span className="font-semibold">1961</span>
                            <span>328 pages</span>
                            <span className="text-muted-foreground">(Signet Classic)</span>
                        </div>

                        <div className="space-y-1 text-sm">
                            <div>
                                <span className="font-semibold">EAN / ISBN13: </span>
                                <span>9780451524935</span>
                            </div>
                            <div>
                                <span className="font-semibold">UPC / ISBN10: </span>
                                <span>0451524934</span>
                            </div>
                        </div>
                    </div>

                    {/* Added Date and Copies */}
                    <div className="space-y-1">
                        <div>
                            <span className="font-semibold">Added: </span>
                            <span>2024-10-24</span>
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
                            View our feature on George Orwell's 1984. Written in 1948, 1984 was George Orwell's chilling prophecy about the future. And while 1984 has come and gone, Orwell's narrative is timelier than ever. 1984 presents a startling and haunting vision of the world, so powerful that it is completely convincing from start to finish. No one can deny the power of this novel, its hold on the imaginations of multiple generations of readers, or the resiliency of its admonitions—a legacy that seems only to grow with the passage of time.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

