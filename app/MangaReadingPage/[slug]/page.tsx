'use client'

import { useState, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { useSwipeable } from 'react-swipeable'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Toaster } from "@/components/ui/sonner"  // Changed to use sonner
import { toast } from "sonner"  // Changed to use sonner's toast
import { use } from 'react'
import { usePathname } from 'next/navigation'

// Mock data - replace with actual data fetching in a real application
const mangaInfo = {
  title: "One Piece",
  author: "Eiichiro Oda",
  currentChapter: 2,
  totalChapters: 100,
  pagesPerChapter: 20,
}

const chapters = Array.from({ length: mangaInfo.totalChapters }, (_, i) => i + 1)





interface Params {
  slug: string;
}





export default function MangaReader({ params }: { params: Promise<Params> }) {
  const { slug } = use(params)

  console.log(slug)
  const path = usePathname();
  console.log(path)

  const [currentPage, setCurrentPage] = useState(1)
  const [currentChapter, setCurrentChapter] = useState(mangaInfo.currentChapter)
  const touchStartX = useRef(0)

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    } else if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1)
      setCurrentPage(mangaInfo.pagesPerChapter)
    } else {
      toast("First page", {
        description: "You're already on the first page of the first chapter.",
      })
    }
  }, [currentPage, currentChapter])

  const handleNextPage = useCallback(() => {
    if (currentPage < mangaInfo.pagesPerChapter) {
      setCurrentPage((prev) => prev + 1)
    } else if (currentChapter < mangaInfo.totalChapters) {
      setCurrentChapter((prev) => prev + 1)
      setCurrentPage(1)
    } else {
      toast("Last page", {
        description: "You've reached the last page of the last chapter.",
      })
    }
  }, [currentPage, currentChapter])

  const handleChapterChange = (value: string) => {
    setCurrentChapter(Number(value))
    setCurrentPage(1)
  }

  const handlers = useSwipeable({
    onSwipedLeft: handleNextPage,
    onSwipedRight: handlePrevPage,
    trackMouse: true
  })

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e
    const { left, width } = currentTarget.getBoundingClientRect()
    const clickPosition = (clientX - left) / width

    if (clickPosition < 0.3) {
      handlePrevPage()
    } else if (clickPosition > 0.7) {
      handleNextPage()
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{mangaInfo.title}</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{mangaInfo.title}</SheetTitle>
              <SheetDescription>By {mangaInfo.author}</SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Select Chapter</h3>
              <Select value={currentChapter.toString()} onValueChange={handleChapterChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select chapter" />
                </SelectTrigger>
                <SelectContent>
                  {chapters.map((chapter) => (
                    <SelectItem key={chapter} value={chapter.toString()}>
                      Chapter {chapter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div 
          className="relative max-w-3xl w-full aspect-[3/4] bg-muted rounded-lg overflow-hidden cursor-pointer"
          onClick={handleImageClick}
          {...handlers}
        >
          <img
            src={`/placeholder.svg?height=1200&width=900&text=Chapter ${currentChapter} - Page ${currentPage}`}
            alt={`Chapter ${currentChapter}, Page ${currentPage}`}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        </div>
        <div className="mt-4 flex justify-center items-center gap-4">
          <Button onClick={handlePrevPage} disabled={currentPage === 1 && currentChapter === 1}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span className="text-sm">
            Page {currentPage} / Chapter {currentChapter}
          </span>
          <Button onClick={handleNextPage} disabled={currentPage === mangaInfo.pagesPerChapter && currentChapter === mangaInfo.totalChapters}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
      <Toaster />
    </div>
  )
}