"use client";

import Image from "next/image";
import type { MangaPage } from "@/components/mangaReadingPage/types/reader";

interface MangaPagesProps {
  pages: MangaPage[];
  readingMode: "vertical" | "horizontal";
  containerWidth: number;
  brightness: number;
  currentPage?: number;
  onPageChange?: (pageNumber: number) => void;
}

export function MangaPages({
  pages,
  readingMode,
  containerWidth,
  brightness,
  currentPage = 1,
  onPageChange,
}: MangaPagesProps) {
  if (readingMode === "vertical") {
    return (
      <div
        className="flex flex-col gap-4"
        style={{ width: `${containerWidth}px` }}
      >
        {pages.map((page) => (
          <div
            key={page.id}
            className="bg-black relative"
            style={{
              width: "100%",
              filter: `brightness(${brightness}%)`,
            }}
            onClick={() => onPageChange?.(page.pageNumber)}
          >
            <Image
              src={page.imageUrl}
              alt={`Page ${page.pageNumber}`}
              width={800}
              height={1200}
              className="w-full h-auto"
              priority={page.pageNumber <= 2} // Prioritize loading first two pages
            />
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 text-xs rounded">
              {page.pageNumber}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    const currentPageData =
      pages.find((page) => page.pageNumber === currentPage) || pages[0];

    return (
      <div
        className="flex items-center justify-center"
        style={{ width: `${containerWidth}px` }}
      >
        {currentPageData && (
          <div
            className="bg-black relative"
            style={{ filter: `brightness(${brightness}%)` }}
          >
            <Image
              src={currentPageData.imageUrl}
              alt={`Page ${currentPageData.pageNumber}`}
              width={800}
              height={1200}
              className="w-full h-auto"
              priority
            />
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 text-xs rounded">
              {currentPageData.pageNumber}
            </div>
          </div>
        )}
      </div>
    );
  }
}
