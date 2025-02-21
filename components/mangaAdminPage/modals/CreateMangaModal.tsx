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

export function CreateMangaModal() {
  const [open, setOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

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

  async function createManga(formData: FormData) {
    const translatorMangaTeamId = formData.get("translatorMangaTeamId");

    // Create new FormData with correct field names
    const apiFormData = new FormData();
    apiFormData.append("Title", formData.get("title") as string);
    apiFormData.append("Author", formData.get("author") as string);
    apiFormData.append("Description", formData.get("description") as string);
    apiFormData.append("Type", formData.get("type") as string);
    selectedGenres.forEach((genreId) => {
      apiFormData.append("GenreIds", genreId.toString());
    });
    apiFormData.append("Publisher", formData.get("publisher") as string);
    apiFormData.append("Artist", formData.get("artist") as string);
    apiFormData.append("File", formData.get("file") as File);

    try {
      const response = await axiosInstance.post(
        `/api/translators/${translatorMangaTeamId}/mangas`,
        apiFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating manga:", error);
      throw error;
    }
  }

  async function onSubmit(formData: FormData) {
    await createManga(formData);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black">
          Create New Manga
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-amber-500">Create New Manga</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <form action={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-zinc-400">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
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
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-zinc-400">
                  Type
                </Label>
                <Select name="type" required>
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
              <div className="space-y-2">
                <Label
                  htmlFor="translatorMangaTeamId"
                  className="text-zinc-400"
                >
                  Translator Team ID
                </Label>
                <Input
                  id="translatorMangaTeamId"
                  name="translatorMangaTeamId"
                  className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-zinc-400">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file" className="text-zinc-400">
                Cover Image
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                required
              />
            </div>

            <Button
              type="submit"
              className="bg-amber-500 text-black hover:bg-amber-600"
            >
              Create
            </Button>
          </form>

          <div className="space-y-2">
            <GenreManager
              onGenresChange={setSelectedGenres}
              initialSelectedGenres={[]}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
