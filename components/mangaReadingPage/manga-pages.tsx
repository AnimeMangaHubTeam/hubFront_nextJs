"use client"

import Image from "next/image"
import type { MangaPage } from "@/components/mangaReadingPage/types/reader"

interface MangaPagesProps {
  pages: MangaPage[]
  readingMode: "vertical" | "horizontal"
  containerWidth: number
  brightness: number
}

export function MangaPages({ pages, readingMode, containerWidth, brightness }: MangaPagesProps) {
  return (
    <div
      className={`flex ${readingMode === "vertical" ? "flex-col" : "flex-row"} gap-4`}
      style={{
        width: readingMode === "vertical" ? `${containerWidth}px` : "auto",
      }}
    >
      {pages.map((page) => (
        <div
          key={page.id}
          className="bg-white"
          style={{
            width: readingMode === "vertical" ? "100%" : `${containerWidth}px`,
            filter: `brightness(${brightness}%)`,
          }}
        >
          <Image
            src={page.url || "/placeholder.svg"}
            alt={`Page ${page.pageNumber}`}
            width={800}
            height={1200}
            className="w-full h-auto"
            priority={page.pageNumber <= 2} // Prioritize loading first two pages
          />
        </div>
      ))}
    </div>
  )
}

