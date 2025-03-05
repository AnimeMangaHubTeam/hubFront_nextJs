"use client";

import type React from "react";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Eye } from "lucide-react";
import axiosInstance from "@/lib/axios";

type MangaPage = {
  id: string;
  file: File;
  preview: string;
};

type DraggableImageProps = {
  id: string;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  preview: string;
};

const DraggableImage = ({
  id,
  index,
  moveImage,
  preview,
}: DraggableImageProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover(item: { id: string; index: number }) {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        if (node) drag(drop(node));
      }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="relative mb-2 rounded-md overflow-hidden"
    >
      <Image
        src={preview || "/placeholder.svg"}
        alt={`Page ${index + 1}`}
        width={100}
        height={140}
        className="object-cover border border-zinc-700 rounded-md"
      />
      <div className="absolute top-0 right-0 bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
        {index + 1}
      </div>
    </div>
  );
};

interface CreatePagesModalProps {
  open: boolean;
  mangaId: number;
  chapterId: number;
  translatorId: number;
  onOpenChange: (open: boolean) => void;
  onChapterCreated: () => void;
}

export function CreatePagesModal({
  open,
  mangaId,
  chapterId,
  translatorId,
  onOpenChange,
  onChapterCreated,
}: CreatePagesModalProps) {
  const [pages, setPages] = useState<MangaPage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = useCallback(() => {
    setPages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  const addImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPages = Array.from(event.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
      }));
      setPages((prevPages) => [...prevPages, ...newPages]);
    }
  };

  const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
    setPages((prevPages) => {
      const newPages = [...prevPages];
      const [removed] = newPages.splice(dragIndex, 1);
      newPages.splice(hoverIndex, 0, removed);
      return newPages;
    });
  }, []);

  const createPages = async (formData: FormData) => {
    const apiFormData = new FormData();

    // Append basic data as integers
    apiFormData.append("MangaId", Number(formData.get("mangaId")).toString());
    apiFormData.append(
      "TranslatorId",
      Number(formData.get("translatorId")).toString()
    );
    apiFormData.append(
      "ChapterId",
      Number(formData.get("chapterId")).toString()
    );

    // Append pages with correct format
    pages.forEach((page, index) => {
      // Create page object with number and file
      const pageData = {
        pageNumber: index,
        file: page.file,
      };

      // Append the page object to the FormData
      apiFormData.append(`Pages[${index}].pageNumber`, (index + 1).toString());
      apiFormData.append(`Pages[${index}].file`, page.file);
    });

    console.log("Sending data:", {
      mangaId: Number(formData.get("mangaId")),
      translatorId: Number(formData.get("translatorId")),
      chapterId: Number(formData.get("chapterId")),
      pagesCount: pages.length,
      pages: pages.map((_, index) => ({
        pageNumber: index + 1,
        fileName: pages[index].file.name,
      })),
    });

    try {
      const response = await axiosInstance.post(
        "/api/translators/mangas/chapters/pages",
        apiFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        resetForm();
        onChapterCreated();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error uploading manga chapter:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-zinc-800 text-zinc-400 hover:text-amber-500"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-amber-500">
            Upload Manga Chapter
          </DialogTitle>
        </DialogHeader>
        <form action={createPages} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mangaId" className="text-zinc-400">
                Manga ID
              </Label>
              <Input
                id="mangaId"
                name="mangaId"
                defaultValue={mangaId}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                type="number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="translatorId" className="text-zinc-400">
                Translator ID
              </Label>
              <Input
                id="translatorId"
                name="translatorId"
                defaultValue={translatorId}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                type="number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chapterId" className="text-zinc-400">
              Chapter ID
            </Label>
            <Input
              id="chapterId"
              name="chapterId"
              defaultValue={chapterId}
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              type="number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pages" className="text-zinc-400">
              Pages
            </Label>
            <Input
              id="pages"
              type="file"
              accept="image/*"
              multiple
              onChange={addImages}
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              required
              ref={fileInputRef}
            />
          </div>

          <DndProvider backend={HTML5Backend}>
            <div className="mt-4">
              <Label className="text-zinc-400 block mb-2">
                Page Order (Drag to reorder)
              </Label>
              <div className="grid grid-cols-6 gap-2 p-4 bg-zinc-800 rounded-md border border-zinc-700">
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
            </div>
          </DndProvider>

          <Button
            type="submit"
            className="bg-amber-500 text-black hover:bg-amber-600"
          >
            Upload Chapter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
