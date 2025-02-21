"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosInstance from "@/lib/axios";
import { GenreManager } from "@/components/mangaAdminPage/genreManager";
import type { Manga } from "@/types/mainPageManga";

type UpdateMangaModalProps = {
  manga: Manga;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UpdateMangaModal({
  manga,
  open,
  onOpenChange,
}: UpdateMangaModalProps) {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [mangaInfo, setMangaInfo] = useState<Manga | null>(null);

  useEffect(() => {
    const getManga = async () => {
      try {
        const response = await axiosInstance.get(`/api/app/mangas/${manga.id}`);
        setMangaInfo(response.data.value);
        console.log("test", response.data);
      } catch (error) {
        console.error("Error getting manga:", error);
      }
    };
    getManga();
  }, []);

  // Remove local open state and use props directly
  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axiosInstance.get("/api/genres");
        console.log(response.data);
      } catch (error) {
        console.error("Error getting genres:", error);
      }
    };
    getGenres();
  }, []);

  async function updateManga(formData: FormData) {
    const apiData = {
      id: manga?.id, // Make sure to include the id field
      title: formData.get("title")?.toString() || "",
      author: formData.get("author")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      type: parseInt(formData.get("type") as string) || 1,
      genreIds: selectedGenres,
      publisher: formData.get("publisher")?.toString() || "",
      artist: formData.get("artist")?.toString() || "",
    };

    try {
      const response = await axiosInstance.put(
        `/api/translators/mangas`,
        JSON.stringify(apiData), // Explicitly stringify the data
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating manga:", error);
      throw error;
    }
  }

  async function onSubmit(formData: FormData) {
    await updateManga(formData);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Update Manga</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-amber-500">Update Manga</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <form action={onSubmit} className="space-y-4">
            {/* Move main form content here */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-zinc-400">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={mangaInfo?.title || ""}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author" className="text-zinc-400">
                  Author
                </Label>
                <Input
                  id="author"
                  name="author"
                  defaultValue={mangaInfo?.author || ""}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="artist" className="text-zinc-400">
                  Artist
                </Label>
                <Input
                  id="artist"
                  name="artist"
                  defaultValue={mangaInfo?.artist || ""}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publisher" className="text-zinc-400">
                  Publisher
                </Label>
                <Input
                  id="publisher"
                  name="publisher"
                  defaultValue={mangaInfo?.publisher || ""}
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-zinc-400">
                  Type
                </Label>
                <Select
                  name="type"
                  required
                  defaultValue={mangaInfo?.type?.toString() || ""}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-100">
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        Type {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          <div className="space-y-2">
            <GenreManager
              onGenresChange={setSelectedGenres}
              initialSelectedGenres={
                mangaInfo?.mangaGenres.map((genre) => ({
                  id: genre.id,
                  name: genre.name,
                })) || []
              }
            />
          </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-zinc-400">
                Description
              </Label>
              <Textarea
                id="description"
                defaultValue={mangaInfo?.description || ""}
                name="description"
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-amber-500 text-black hover:bg-amber-600"
            >
              Update
            </Button>
          </form>

          {/* Move GenreManager outside the form */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
