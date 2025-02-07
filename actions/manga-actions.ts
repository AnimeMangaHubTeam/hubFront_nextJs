"use server"

import axiosInstance from "@/lib/axios"
import { type Manga, type Chapter, Page } from "@/components/mangaAdminPage/types/manga"

export async function createManga(formData: FormData, ) {
  const response = await axiosInstance.post(`/api/translators/${formData.get("translatorMangaTeamId")}/mangas`, formData)
  return response.data
}

export async function uploadMangaCover(mangaId: string, formData: FormData) {
  const response = await axiosInstance.post(`/api/translators/${mangaId}/upload-photo`, formData)
  return response.data
}

export async function deleteManga(mangaId: string) {
  await axiosInstance.delete(`/api/translators/mangas/${mangaId}`)
}

export async function updateManga(manga: Partial<Manga>) {
  const response = await axiosInstance.put("/api/translators/mangas", manga)
  return response.data
}

export async function createChapter(formData: FormData) {
  const response = await axiosInstance.post("/api/translators/mangas/chapters", formData)
  return response.data
}

export async function updateChapter(chapter: Partial<Chapter>) {
  const response = await axiosInstance.put("/api/translators/mangas/chapters", chapter)
  return response.data
}

