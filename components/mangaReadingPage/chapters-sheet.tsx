"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Chapter } from "@/components/mangaReadingPage/types/reader"

interface ChaptersSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chapters: Chapter[]
  currentChapter: Chapter
  onChapterSelect: (chapter: Chapter) => void
}

export function ChaptersSheet({ open, onOpenChange, chapters, currentChapter, onChapterSelect }: ChaptersSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[400px] bg-zinc-900 text-white border-r border-zinc-800">
        <SheetHeader>
          <SheetTitle className="text-white">Главы</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)] mt-6">
          <div className="space-y-2">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                className={`w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-800 ${
                  chapter.id === currentChapter.id ? "bg-zinc-800" : ""
                }`}
                onClick={() => onChapterSelect(chapter)}
              >
                <div className="font-medium">
                  Том {chapter.volume} Глава {chapter.chapter}
                </div>
                <div className="text-sm text-zinc-400">{chapter.title}</div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

