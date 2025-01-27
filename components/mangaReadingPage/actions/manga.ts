"use server"

import type { MangaPage } from "@/components/mangaReadingPage/types/reader"

export async function getMangaPages(chapterId: number): Promise<MangaPage[]> {
  // Simulated API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock data - in real app this would come from your API
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    url: `/placeholder.svg?height=1200&width=800`,
    pageNumber: i + 1,
  }))
}

