"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axiosInstance from "@/lib/axios"

interface Chapter {
  id: number
  chapterNumber: number
  title: string
}

interface UpdateChapterModalProps {
  chapter: Chapter
  open: boolean
  onOpenChange: (open: boolean) => void
  onChapterUpdated: () => void
}

export function UpdateChapterModal({ chapter, open, onOpenChange, onChapterUpdated }: UpdateChapterModalProps) {

  async function updateChapter(formData: FormData) {
    const apiFormData = {
      id: chapter.id,
      chapterNumber: Number(formData.get("chapterNumber")),
      title: formData.get("title"),
    };
    console.log(apiFormData);
    try {
      await axiosInstance.put(`/api/translators/mangas/chapters`, apiFormData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
      );
      onChapterUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating chapter:", error);
    }
  }

  async function onSubmit(formData: FormData) {
    await updateChapter(formData);
    onOpenChange(false); 
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-amber-500">Update Chapter</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chapterNumber" className="text-zinc-400">
              Chapter Number
            </Label>
            <Input
              id="chapterNumber"
              name="chapterNumber"
              type="number"
              defaultValue={chapter.chapterNumber}
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
              defaultValue={chapter.title}
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-amber-500 text-black hover:bg-amber-600">
              Update Chapter
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

