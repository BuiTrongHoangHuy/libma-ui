'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Power, ChevronDown, Edit } from 'lucide-react'
import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import router from "@/router/Router"
import { Link } from "react-router-dom"

export default function LibraryPage() {
    const alphabet = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z # ALL'.split(' ');
    const [selectedLetter, setSelectedLetter] = useState('ALL')
    const [sortBy, setSortBy] = useState('Title')
    const sortOptions = ['Title', 'Creator', 'Added', 'Published', 'Rating']

    const books = [
        {
            id: '1',
            title: '1984 (Signet Classics)',
            author: 'George Orwell',
            type: 'Book',
            ean: '9780451524935',
            upc: '0451524934'
        },
        {
            id: '2',
            title: "S'Ng Khoi Que Nha: Tap Van",
            author: 'fgfg',
            type: 'Book',
            ean: '9786041016613',
            upc: '6041016616'
        },
        {
            id: '3',
            title: '2000 (Signet Classics)',
            author: 'George Orwell',
            type: 'Book',
            ean: '9780451524935',
            upc: '0451524934'
        },
        {
            id: '4',
            title: "A'Ng Khoi Que Nha: Tap Van",
            author: 'fgfg',
            type: 'Book',
            ean: '9786041016613',
            upc: '6041016616'
        },
    ]

    const handleLetterClick = (letter) => {
        setSelectedLetter(letter === selectedLetter ? 'ALL' : letter)
    }

    // Group books by first letter
    const groupBooksByLetter = () => {
        const grouped = {}
        books.forEach(book => {
            const firstChar = book.title.charAt(0).toUpperCase()
            const letter = /[A-Z]/.test(firstChar) ? firstChar : '#'
            if (!grouped[letter]) {
                grouped[letter] = []
            }
            grouped[letter].push(book)
        })
        return grouped
    }

    const groupedBooks = groupBooksByLetter()
    const visibleLetters = selectedLetter === 'ALL' 
        ? Object.keys(groupedBooks).sort() 
        : [selectedLetter].filter(letter => groupedBooks[letter]?.length > 0)

    return (
        <div className="p-10 mx-auto space-y-8">
            {/* Entertainment Section */}
            <div className="bg-muted p-4 rounded-lg flex items-center">
                <div className="relative flex-1 max-w-screen-md">
                    <Search className="absolute left-2 top-2.5 h-6 w-6 text-muted-foreground" />
                    <Input
                        placeholder="Start Searching..."
                        className="pl-10 h-12 text-[24px]"
                    />
                </div>
                <div className="flex items-center gap-4 ml-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-[#5CD3E5] h-12 hover:bg-[#4bc0d2]">
                                {sortBy}
                                <ChevronDown className="h-6 w-6 ml-2" />
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
                        {groupedBooks[letter].map((book) => (
                            <div
                                key={book.id}
                                className="bg-background p-4 rounded-lg shadow-sm relative"
                            >
                                <Link to={`/library/${book.id}`}>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-2 top-2"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <div className="space-y-1">
                                    <span className="text-xs bg-gray-500 p-1 rounded-md text-muted-foreground">
                                        {book.type}
                                    </span>
                                    <Link to={`/library/${book.id}`}>
                                        <h2 className="text-xl font-bold cursor-pointer hover:underline transition-all duration-200">
                                            {book.title}
                                        </h2>
                                    </Link>
                                    <p className="text-muted-foreground">{book.author}</p>
                                    <p className="text-sm font-bold">
                                        UPC / ISBN10: {book.upc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}