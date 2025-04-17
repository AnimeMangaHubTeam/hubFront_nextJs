"use server";

import type {
  MangaPage,
  MangaPagesResponse,
} from "@/components/mangaReadingPage/types/reader";
import axiosInstance from "@/lib/axios";

export async function getMangaPages(chapterId: number): Promise<MangaPage[]> {
  try {
    const response = await axiosInstance.get<MangaPagesResponse>(
      `/api/app/mangas/translator-manga-teams/chapters/${chapterId}/pages`
    );

    if (response.data.success) {
      return response.data.value;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch manga pages:", error);
    return [];
  }
}
