"use client";

import { useState, useEffect, useCallback } from "react";
import { CreateMangaModal } from "@/components/mangaAdminPage/modals/CreateMangaModal";
import axiosInstance from "@/lib/axios";
import type { Manga, MangaListResponse } from "@/types/mainPageManga";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Star,
  Pencil,
  Trash,
  Info,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { UpdateMangaModal } from "@/components/mangaAdminPage/modals/UpdateMangaModal";
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
} from "@/components/ui/alert-dialog";
import { deleteManga } from "@/actions/manga-actions";

export default function MangaAdminPage() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sortField, setSortField] = useState<keyof Manga>("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const fetchMangas = useCallback(async () => {
    try {
      const response = await axiosInstance.get<MangaListResponse>(
        `api/app/mangas?IsNew=true&IsUpdated=false&IsPopular=false&CurrentPage=${currentPage}&PageSize=${pageSize}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setMangas(response.data.value);
    } catch (error) {
      console.error("Error fetching mangas:", error);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchMangas();
  }, [fetchMangas]);

  const handleSort = (field: keyof Manga) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedMangas = [...mangas].sort((a, b) => {
    if (sortDirection === "asc") {
      return String(a[sortField]).localeCompare(String(b[sortField]));
    }
    return String(b[sortField]).localeCompare(String(a[sortField]));
  });

  const SortIcon = ({ field }: { field: keyof Manga }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto py-6 mt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-amber-500">Manga List</h1>
          <CreateMangaModal />
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="w-20 bg-zinc-900 border-zinc-800 text-zinc-100"
            />
            <span className="text-zinc-400">items per page</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              className="border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Previous
            </Button>
            <span className="text-zinc-400">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              variant="outline"
              className="border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Next
            </Button>
          </div>
        </div>

        <div className="rounded-md border border-zinc-800 bg-zinc-900/50">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-900">
                <TableHead className="w-[80px] text-zinc-400">ID</TableHead>
                <TableHead
                  className="cursor-pointer text-zinc-400 hover:text-amber-500"
                  onClick={() => handleSort("title")}
                >
                  Title <SortIcon field="title" />
                </TableHead>
                <TableHead
                  className="cursor-pointer text-zinc-400 hover:text-amber-500"
                  onClick={() => handleSort("author")}
                >
                  Author <SortIcon field="author" />
                </TableHead>
                <TableHead className="text-zinc-400">Rating</TableHead>
                <TableHead className="text-zinc-400">Genres</TableHead>
                <TableHead className="text-zinc-400">Type</TableHead>
                <TableHead className="text-right text-zinc-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMangas.map((manga) => (
                <TableRow
                  key={manga.id}
                  className="border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                >
                  <TableCell className="text-zinc-400">{manga.id}</TableCell>
                  <TableCell className="font-medium text-zinc-100">
                    {manga.title}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {manga.author}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-zinc-300">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{manga.avgRating.toFixed(1)}</span>
                      <span className="text-zinc-500">
                        ({manga.countRating})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {manga.mangaGenres.map((genre) => genre.name).join(", ")}
                  </TableCell>
                  <TableCell className="text-zinc-300">{manga.type}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedManga(manga);
                          setShowUpdateModal(true);
                        }}
                        className="hover:bg-zinc-800 text-zinc-400 hover:text-amber-500"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-zinc-800 text-zinc-400 hover:text-amber-500"
                      >
                        <Link href={`mangaAdminPage/chapterManage/${manga.id}`}>
                          <Info className="w-4 h-4" />
                        </Link>
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-zinc-800 text-zinc-400 hover:text-red-500"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-zinc-100">
                              Delete Manga
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-zinc-400">
                              Are you sure you want to delete {manga.title}?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-zinc-800 text-zinc-100 border-zinc-700 hover:bg-zinc-700">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteManga(manga.id.toString())}
                              className="bg-red-500 text-white hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {selectedManga && (
          <>
            <UpdateMangaModal
              manga={selectedManga}
              open={showUpdateModal}
              onOpenChange={setShowUpdateModal}
            />
          </>
        )}
      </div>
    </div>
  );
}
