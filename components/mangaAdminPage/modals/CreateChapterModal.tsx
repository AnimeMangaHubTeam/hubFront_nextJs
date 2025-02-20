"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axiosInstance from "@/lib/axios"

interface CreateChapterModalProps {
  open: boolean
  mangaId: number
  onOpenChange: (open: boolean) => void
  onChapterCreated: () => void
}

export function CreateChapterModal({ open, mangaId, onOpenChange, onChapterCreated }: CreateChapterModalProps) {

  async function createChapter(formData: FormData) {
    const apiFormData = {
      mangaId: Number(formData.get("mangaId")),
      chapterNumber: Number(formData.get("chapterNumber")),
      translatorMangaTeamId: Number(formData.get("translatorMangaTeamId")),
      title: formData.get("title"),
      publicationDate: new Date(formData.get("publicationDate") as string).toISOString(),
    };
  
    try {
      await axiosInstance.post(`/api/translators/mangas/chapters`, apiFormData);
      onChapterCreated();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating chapter:", error);
    }
  }

  async function onSubmit(formData: FormData) {
    await createChapter(formData);
    onOpenChange(false); 
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-amber-500">Create New Chapter</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mangaId" className="text-zinc-400">
              Manga ID
            </Label>
            <Input
              id="mangaId"
              name="mangaId"
              type="number"
              defaultValue={mangaId}

              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="chapterNumber" className="text-zinc-400">
              Chapter Number
            </Label>
            <Input
              id="chapterNumber"
              name="chapterNumber"
              type="number"
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="translatorMangaTeamId" className="text-zinc-400">
              Translator Manga Team ID
            </Label>
            <Input
              id="translatorMangaTeamId"
              name="translatorMangaTeamId"
              type="number"
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title" className="text-zinc-400">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="publicationDate" className="text-zinc-400">
              Publication Date
            </Label>
            <Input
              id="publicationDate"
              name="publicationDate"
              type="date"
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-amber-500 text-black hover:bg-amber-600">
              Create Chapter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

