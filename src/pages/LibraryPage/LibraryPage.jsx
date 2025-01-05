'use client'

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Search, ChevronDown, Edit} from 'lucide-react'
import {useState} from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Link} from "react-router-dom"
import {useGetEditionQuery} from "@/store/rtk/book.service.js";

export default function LibraryPage() {
    const alphabet = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z # ALL'.split(' ');
    const [selectedLetter, setSelectedLetter] = useState('ALL');
    const [sortBy, setSortBy] = useState('Title');
    const [searchTerm, setSearchTerm] = useState('');
    const sortOptions = ['Title', 'Creator', 'Added', 'Published', 'Rating'];
    const {data: editionsResponse, isLoading: isLoadingEditions} = useGetEditionQuery();
    const editionsData = editionsResponse?.data ? editionsResponse.data : [];
    const transformedEditionData = editionsData.map((item) => ({
        ...item,
        titleName: item.Title?.titleName || "N/A",
        categoryName: item.Title?.Category?.categoryName || "N/A",
        author: item.Title?.author || "N/A",
    }));

    const handleLetterClick = (letter) => {
        setSelectedLetter(letter === selectedLetter ? 'ALL' : letter);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Group and filter books
    const groupBooksByLetter = () => {
        const grouped = {};
        transformedEditionData
            .filter((book) =>
                book.titleName.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term
            )
            .forEach((book) => {
                const firstChar = book.titleName.charAt(0).toUpperCase();
                const letter = /[A-Z]/.test(firstChar) ? firstChar : '#';
                if (!grouped[letter]) {
                    grouped[letter] = [];
                }
                grouped[letter].push(book);
            });
        return grouped;
    };

    const groupedBooks = groupBooksByLetter();
    const visibleLetters = selectedLetter === 'ALL'
        ? Object.keys(groupedBooks).sort()
        : [selectedLetter].filter(letter => groupedBooks[letter]?.length > 0);

    return (
        <div className="p-10 mx-auto space-y-8">
            {/* Search Section */}
            <div className="bg-muted p-4 rounded-lg flex items-center">
                <div className="relative flex-1 max-w-screen-md">
                    <Search className="absolute left-2 top-2.5 h-6 w-6 text-muted-foreground"/>
                    <Input
                        placeholder="Start Searching..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="pl-10 h-12 text-[24px]"
                    />
                </div>
                <div className="flex items-center gap-4 ml-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-[#5CD3E5] h-12 hover:bg-[#4bc0d2]">
                                {sortBy}
                                <ChevronDown className="h-6 w-6 ml-2"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            {sortOptions.map((option) => (
                                <DropdownMenuItem
                                    key={option}
                                    onClick={() => setSortBy(option)}
                                    className={sortBy === option ? "bg-[#5CD3E5] text-white" : ""}
                                >
                                    {option}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Alphabet Navigation */}
            <div className="flex items-center justify-center flex-wrap">
                {alphabet.map((letter) => (
                    <Button
                        key={letter}
                        variant={selectedLetter === letter ? "default" : "ghost"}
                        className={`${selectedLetter === letter ? 'bg-[#5CD3E5] text-white' : ''
                        } hover:bg-[#5CD3E5] hover:text-white`}
                        onClick={() => handleLetterClick(letter)}
                    >
                        {letter}
                    </Button>
                ))}
            </div>

            {/* Book List */}
            <div className="space-y-12">
                {visibleLetters.map(letter => (
                    <div key={letter} className="space-y-6">
                        {/* Letter Indicator */}
                        <div className="text-4xl font-bold text-[#5CD3E5]">
                            {letter}
                        </div>

                        {/* Books for this letter */}
                        {groupedBooks[letter]?.map((book) => (
                            <div
                                key={book.editionId}
                                className="bg-background p-4 rounded-lg shadow-sm relative flex flex-row gap-2"
                            >
                                {
                                    book.thumbnailUrl ? (
                                        <div
                                            className="w-[100px] h-[150px] border border-gray-300 rounded overflow-hidden">
                                            <img
                                                src={book.thumbnailUrl}
                                                alt="Uploaded image"
                                                className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="w-[100px] h-[100px] border border-gray-300 bg-gray-500 flex items-center justify-center text-black text-sm">
                                            No Image
                                        </div>
                                    )
                                }

                                <Link to={`/library/${book.editionId}`}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-2"
                                    >
                                        <Edit className="h-4 w-4"/>
                                    </Button>
                                </Link>
                                <div className="space-y-1">
                                    <span className="text-xs bg-gray-500 p-1 rounded-md text-muted-foreground">
                                        {book.categoryName}
                                    </span>
                                    <Link to={`/library/${book.editionId}`}>
                                        <h2 className="text-xl font-bold cursor-pointer hover:underline transition-all duration-200">
                                            {book.titleName}
                                        </h2>
                                    </Link>
                                    <p className="text-muted-foreground">{book.author}</p>
                                    <p className="text-sm font-bold">
                                        ISBN10 / OCLC: {book.isbn}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
