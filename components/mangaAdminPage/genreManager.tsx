"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import axiosInstance from "@/lib/axios";

interface Genre {
  id: number;
  name: string;
}

interface GenreManagerProps {
  onGenresChange: (selectedGenres: number[]) => void;
  initialSelectedGenres?: Genre[];
}

export function GenreManager({
  onGenresChange,
  initialSelectedGenres = [],
}: GenreManagerProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>(
    initialSelectedGenres.map((genre) => genre.id)
  );
  const [isManageGenresOpen, setIsManageGenresOpen] = useState(false);
  const [newGenre, setNewGenre] = useState("");
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axiosInstance.get("/api/genres");
      setGenres(response.data.value || []);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const createGenre = async () => {
    try {
      await axiosInstance.post("/api/genres", { name: newGenre });
      setNewGenre("");
      fetchGenres();
    } catch (error) {
      console.error("Error creating genre:", error);
    }
  };

  const updateGenre = async () => {
    if (!editingGenre) return;
    try {
      await axiosInstance.put(`/api/genres/`, {
        id: editingGenre.id,
        name: editingGenre.name,
      });
      setEditingGenre(null);
      fetchGenres();
    } catch (error) {
      console.error("Error updating genre:", error);
    }
  };

  const deleteGenre = async (id: number) => {
    try {
      await axiosInstance.delete(`/api/genres/`, { data: { id } });
      fetchGenres();
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
  };

  const handleGenreSelection = (value: string) => {
    const genreId = Number(value);
    let newSelectedGenres: number[];

    if (selectedGenres.includes(genreId)) {
      newSelectedGenres = selectedGenres.filter((id) => id !== genreId);
    } else {
      newSelectedGenres = [...selectedGenres, genreId];
    }

    setSelectedGenres(newSelectedGenres);
    onGenresChange(newSelectedGenres);
  };

  const removeGenre = (genreId: number) => {
    const newSelectedGenres = selectedGenres.filter((id) => id !== genreId);
    setSelectedGenres(newSelectedGenres);
    onGenresChange(newSelectedGenres);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="selectGenres" className="text-zinc-400">
          Select Genres
        </Label>
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsManageGenresOpen(true);
          }}
          className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700"
        >
          Manage Genres
        </Button>
      </div>

      <Select onValueChange={handleGenreSelection}>
        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
          <SelectValue placeholder="Select genre" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-100">
          {genres.map((genre) => (
            <SelectItem
              key={genre.id}
              value={genre.id.toString()}
              disabled={selectedGenres.includes(genre.id)}
            >
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-wrap gap-2 mt-2">
        {selectedGenres.map((genreId) => {
          const genre = genres.find((g) => g.id === genreId);
          if (!genre) return null;
          return (
            <Badge
              key={genre.id}
              variant="secondary"
              className="bg-zinc-800 text-zinc-100 flex items-center gap-1"
            >
              {genre.name}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeGenre(genre.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          );
        })}
      </div>

      <Dialog open={isManageGenresOpen} onOpenChange={setIsManageGenresOpen}>
        <DialogPortal>
          <DialogContent className="max-w-3xl bg-zinc-900 text-zinc-100">
            <DialogHeader>
              <DialogTitle className="text-amber-500">
                Manage Genres
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newGenre" className="text-zinc-400">
                  New Genre Name
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="newGenre"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="Enter new genre name"
                    className="bg-zinc-800 border-zinc-700 text-zinc-100"
                  />
                  <Button
                    onClick={createGenre}
                    className="bg-amber-500 text-black hover:bg-amber-600"
                  >
                    Add Genre
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-400">Existing Genres</Label>
                {genres.map((genre) => (
                  <div key={genre.id} className="flex items-center space-x-2">
                    {editingGenre?.id === genre.id ? (
                      <>
                        <Input
                          value={editingGenre.name}
                          onChange={(e) =>
                            setEditingGenre({
                              ...editingGenre,
                              name: e.target.value,
                            })
                          }
                          className="bg-zinc-800 border-zinc-700 text-zinc-100"
                        />
                        <Button
                          onClick={updateGenre}
                          className="bg-amber-500 text-black hover:bg-amber-600"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingGenre(null)}
                          className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <span className="text-zinc-100">{genre.name}</span>
                        <Button
                          variant="outline"
                          onClick={() => setEditingGenre(genre)}
                          className="bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => deleteGenre(genre.id)}
                          className="hover:bg-red-700"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
