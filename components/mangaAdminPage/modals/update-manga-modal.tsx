"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Manga } from "@/components/mangaAdminPage/types/manga"
import { updateManga, uploadMangaCover } from "@/actions/manga-actions"

interface UpdateMangaModalProps {
  manga: Manga
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateMangaModal({ manga, open, onOpenChange }: UpdateMangaModalProps) {
  async function onSubmit(formData: FormData) {
    const title = formData.get("title") as string
    await updateManga({ id: manga.id, title })

    const cover = formData.get("cover") as File
    if (cover && cover.size > 0) {
      const coverData = new FormData()
      coverData.append("cover", cover)
      await uploadMangaCover(manga.id, coverData)
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Manga</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={manga.title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image</Label>
            <Input id="cover" name="cover" type="file" accept="image/*" />
          </div>
          <Button type="submit">Update</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

