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
} from "@/components/ui/dialog";
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

  const handleGenreSelection = (genreIds: string[]) => {
    const newSelectedGenres = genreIds.map(Number);
    setSelectedGenres(newSelectedGenres);
    onGenresChange(newSelectedGenres);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="selectGenres">Select Genres</Label>
        <Button variant="outline" onClick={() => setIsManageGenresOpen(true)}>
          Manage Genres
        </Button>
      </div>

      <Select
        onValueChange={(value) => handleGenreSelection([value])}
        defaultValue={initialSelectedGenres[0]?.id.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select genres" />
        </SelectTrigger>
        <SelectContent>
          {genres.map((genre) => (
            <SelectItem key={genre.id} value={genre.id.toString()}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog open={isManageGenresOpen} onOpenChange={setIsManageGenresOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Manage Genres</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newGenre">New Genre Name</Label>
              <div className="flex space-x-2">
                <Input
                  id="newGenre"
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                  placeholder="Enter new genre name"
                />
                <Button onClick={createGenre}>Add Genre</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Existing Genres</Label>
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
                      />
                      <Button onClick={updateGenre}>Save</Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditingGenre(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <span>{genre.name}</span>
                      <Button
                        variant="outline"
                        onClick={() => setEditingGenre(genre)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => deleteGenre(genre.id)}
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
      </Dialog>
    </div>
  );
}
