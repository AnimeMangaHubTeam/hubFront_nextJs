"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChapterCard } from "@/components/mangaAdminPage/temp trash folder/ChapterCard"
import { UpdateMangaModal } from "@/components/mangaAdminPage/modals/UpdateMangaModal"

interface MangaDetailsModalProps {
  manga: {
    id: number
    title: string
    // ... other manga properties
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MangaDetailsModal({ manga, open, onOpenChange }: MangaDetailsModalProps) {
  const [chapters, setChapters] = useState<{ id: number; title: string; number: number }[]>([]) // Fetch chapters from API
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{manga.title}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="chapters">
          <TabsList>
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="edit">Edit Manga</TabsTrigger>
          </TabsList>
          <TabsContent value="chapters">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {chapters.map((chapter) => (
                <ChapterCard key={chapter.id} chapter={chapter} />
              ))}
            </div>
            <Button className="mt-4">Add New Chapter</Button>
          </TabsContent>
          <TabsContent value="edit">
          <UpdateMangaModal manga={manga} open={showUpdateModal} onOpenChange={setShowUpdateModal} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

