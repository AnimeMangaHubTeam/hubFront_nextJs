"use client"

import { useState } from "react"
import Image from "next/image"
import { Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Manga } from "@/components/mangaAdminPage/types/manga"
import { deleteManga } from "@/actions/manga-actions"
import { UpdateMangaModal } from "./modals/update-manga-modal"

interface MangaCardProps {
  manga: Manga
}

export function MangaCard({ manga }: MangaCardProps) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{manga.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {manga.coverUrl && (
          <Image
            src={manga.coverUrl || "/placeholder.svg"}
            alt={manga.title}
            width={300}
            height={400}
            className="rounded-md object-cover"
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" size="icon" onClick={() => setShowUpdateModal(true)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Manga</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {manga.title}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteManga(manga.id)}
                className="bg-destructive text-destructive-foreground"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
      <UpdateMangaModal manga={manga} open={showUpdateModal} onOpenChange={setShowUpdateModal} />
    </Card>
  )
}

