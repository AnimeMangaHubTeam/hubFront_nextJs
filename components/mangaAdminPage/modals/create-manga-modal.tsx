"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createManga } from "@/actions/manga-actions"

export function CreateMangaModal() {
  const [open, setOpen] = useState(false)

  async function onSubmit(formData: FormData) {
    await createManga(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Manga</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Manga</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="translatorMangaTeamId">translatorMangaTeamId</Label>
            <Input id="translatorMangaTeamId" name="translatorMangaTeamId" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image</Label>
            <Input id="cover" name="cover" type="file" accept="image/*" />
          </div>



          
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

