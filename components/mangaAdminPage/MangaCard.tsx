"use client"

import { useState } from "react"
import Image from "next/image"
import { Info, Pencil, Trash, Star } from 'lucide-react'
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
import { Manga } from "@/components/mangaAdminPage/types/manga"
import { deleteManga } from "@/actions/manga-actions"
import { UpdateMangaModal } from "@/components/mangaAdminPage/modals/UpdateMangaModal"
import { MangaDetailsModal } from "@/components/mangaAdminPage/modals/MangaDetailsModal"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MangaCardProps {
  manga: Manga
}

export function MangaCard({ manga }: MangaCardProps) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [mangaDetailsModal, setMangaDetailsModal] = useState(false)

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl font-bold line-clamp-2 hover:line-clamp-none transition-all duration-300">
          {manga.title}
        </CardTitle>
      </CardHeader>
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={manga.imageUrl || "/placeholder.svg"}
          alt={manga.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <CardFooter className="flex justify-center align-end h-fit space-x-2 p-4 bg-secondary/10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setShowUpdateModal(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Manga</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setMangaDetailsModal(true)}>
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <AlertDialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Manga</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
                onClick={() => deleteManga(manga.id.toString())}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
      <UpdateMangaModal manga={manga} open={showUpdateModal} onOpenChange={setShowUpdateModal} />
      <MangaDetailsModal manga={manga} open={mangaDetailsModal} onOpenChange={setMangaDetailsModal} />
    </Card>
  )
}
