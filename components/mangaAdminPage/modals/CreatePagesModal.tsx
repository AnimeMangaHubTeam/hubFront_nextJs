"use client"

import type React from "react"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Eye } from "lucide-react"
import axiosInstance from "@/lib/axios"

type MangaPage = {
  id: string
  file: File
  preview: string
}

type DraggableImageProps = {
  id: string
  index: number
  moveImage: (dragIndex: number, hoverIndex: number) => void
  preview: string
}

const DraggableImage = ({ id, index, moveImage, preview }: DraggableImageProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover(item: { id: string; index: number }) {
      if (item.index !== index) {
        moveImage(item.index, index)
        item.index = index
      }
    },
  })

  return (
    <div ref={(node) => { if (node) drag(drop(node)) }} style={{ opacity: isDragging ? 0.5 : 1 }} className="mb-2">
      <Image
        src={preview || "/placeholder.svg"}
        alt={`Page ${index + 1}`}
        width={100}
        height={140}
        className="object-cover"
      />
    </div>
  )
}

interface CreatePagesModalProps {
    open: boolean
    mangaId: number
    chapterId: number
    translatorId: number
    onOpenChange: (open: boolean) => void
    onChapterCreated: () => void
  }


export function CreatePagesModal({open, mangaId, chapterId, translatorId, onOpenChange, onChapterCreated}: CreatePagesModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [pages, setPages] = useState<MangaPage[]>([])

  const addImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPages = Array.from(event.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
      }))
      setPages((prevPages) => [...prevPages, ...newPages])
    }
  }

  const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
    setPages((prevPages) => {
      const newPages = [...prevPages]
      const [removed] = newPages.splice(dragIndex, 1)
      newPages.splice(hoverIndex, 0, removed)
      return newPages
    })
  }, [])

  const createPages = async (formData: FormData) => {

    const apiFormData = {
        mangaId: Number(formData.get("mangaId")),
        translatorId: Number(formData.get("translatorId")),
        chapterId: Number(formData.get("chapterId")),
        pages: pages.map((page) => page.file),
    }

    console.log("formData", apiFormData)
    try{
        await axiosInstance.post("/api/translators/mangas/chapters/pages", apiFormData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
        )
    } catch (error) {
        console.error("Error uploading manga chapter:", error);
    }
    setIsOpen(false)
  }

  async function onSubmit(formData: FormData) {
    await createPages(formData);
    onOpenChange(false); 
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-zinc-800 text-zinc-400 hover:text-amber-500"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Manga Chapter</DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mangaId" className="text-right">
              Manga ID
            </Label>
            <Input
              id="mangaId"
              name="mangaId"
              defaultValue={mangaId}
              className="col-span-3"
              type="number"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="translatorId" className="text-right">
              Translator ID
            </Label>
            <Input
              id="translatorId"
              name="translatorId"
              defaultValue={translatorId}
              className="col-span-3"
              type="number"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="chapterId" className="text-right">
              Chapter ID
            </Label>
            <Input
              id="chapterId"
              name="chapterId"
              defaultValue={chapterId}
              className="col-span-3"
              type="number"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pages" className="text-right">
              Pages
            </Label>
            <Input
              id="pages"
              type="file"
              accept="image/*"
              multiple
              onChange={addImages}
              className="col-span-3"
            />
          </div>
          <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {pages.map((page, index) => (
                <DraggableImage
                  key={page.id}
                  id={page.id}
                  index={index}
                  moveImage={moveImage}
                  preview={page.preview}
                />
              ))}
            </div>
          </DndProvider>
          <Button type="submit" className="mt-4">
            Upload Chapter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

