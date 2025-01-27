"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Info, Menu, RotateCcw, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SettingsSheet } from "@/components/mangaReadingPage/settings-sheet"
import { ChaptersSheet } from "@/components/mangaReadingPage/chapters-sheet"
import { MangaPages } from "@/components/mangaReadingPage/manga-pages"
import type { ReaderSettings, Chapter, MangaPage } from "@/components/mangaReadingPage/types/reader"
import { getMangaPages } from "@/components/mangaReadingPage/actions/manga"
import Image from "next/image"

const defaultSettings: ReaderSettings = {
  readingMode: "vertical",
  showAllChapters: false,
  halfToneMode: false,
  showPageNumbers: true,
  showOriginal: false,
  theme: "dark",
  pageTransitionArea: "image",
  imageFit: "width",
  menuDisplay: "scroll",
  containerWidth: 720,
  brightness: 100,
  autoScrollSpeed: 0,
}

const mockChapters: Chapter[] = [
  { id: 1, title: "Как демон-император стал уборщиkиm", volume: 1, chapter: 1 },
  // Add more chapters as needed
]

export default function MangaReader() {
  const [settings, setSettings] = useState<ReaderSettings>(defaultSettings)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [chaptersOpen, setChaptersOpen] = useState(false)
  const [currentChapter] = useState<Chapter>(mockChapters[0])
  const [pages, setPages] = useState<MangaPage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true)
        const mangaPages = await getMangaPages(currentChapter.id)
        setPages(mangaPages)
      } catch (error) {
        console.error("Failed to fetch manga pages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPages()
  }, [currentChapter.id])

  const handleSettingsChange = (newSettings: Partial<ReaderSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  return (
    <div className={`min-h-screen ${settings.theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Top Navigation */}
        <header className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setChaptersOpen(true)}>
              <List className="h-4 w-4" />
            </Button>
            <span className="text-sm text-zinc-300">Как демон-император ст...</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Том {currentChapter.volume} Глава {currentChapter.chapter}
            </span>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <Info className="h-4 w-4" />
          </Button>
        </header>

        {/* Main Content */}
        <main
          className={`flex-1 flex justify-center bg-black relative ${
            settings.readingMode === "horizontal" ? "overflow-x-auto" : "overflow-y-auto"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-white">Loading...</div>
            </div>
          ) : (
            <div className={`py-4 ${settings.readingMode === "horizontal" ? "px-0" : "px-4"}`}>
              <MangaPages
                pages={pages}
                readingMode={settings.readingMode}
                containerWidth={settings.containerWidth}
                brightness={settings.brightness}
              />
            </div>
          )}

          {/* Side Controls */}
          <div className="fixed right-4 bottom-4 flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-zinc-800/50"
              onClick={() => setSettingsOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-zinc-800/50">
              <RotateCcw className="h-4 w-4" />
            </Button>
            {settings.showPageNumbers && (
              <div className="text-xs text-zinc-400">{pages.length > 0 ? `1/${pages.length}` : ""}</div>
            )}
          </div>
        </main>

        {/* Settings Sheet */}
        <SettingsSheet
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />

        {/* Chapters Sheet */}
        <ChaptersSheet
          open={chaptersOpen}
          onOpenChange={setChaptersOpen}
          chapters={mockChapters}
          currentChapter={currentChapter}
          onChapterSelect={() => setChaptersOpen(false)}
        />
      </div>
    </div>
  )
}

