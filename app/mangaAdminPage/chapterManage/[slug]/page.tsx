"use client";

import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Eye, ChevronUp, ChevronDown, Plus } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { CreatePagesModal } from "@/components/mangaAdminPage/modals/CreatePagesModal";

// You'll need to create these components
import { CreateChapterModal } from "@/components/mangaAdminPage/modals/CreateChapterModal";
import { UpdateChapterModal } from "@/components/mangaAdminPage/modals/UpdateChapterModal";
import { usePathname } from "next/navigation";

interface Chapter {
  id: number;
  mangaId: number;
  chapterNumber: number;
  translatorMangaTeamId: number;
  title: string;
  publicationDate: Date;
}

interface ChapterListResponse {
  value: Chapter[];
  totalCount: number;
}

export default function ChapterViewPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [showCreateChapterModal, setShowCreateChapterModal] = useState(false);
  const [showCreatePagesModal, setShowCreatePagesModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [sortField, setSortField] = useState<keyof Chapter>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const pathName = usePathname();
  const mangaId = Number(pathName.split("/").filter(Boolean).pop());
  const translatorMangaTeamId = "2";
  //to do something with translators
  const deleteChapter = async (chapterId: string) => {
    try {
      await axiosInstance.delete(
        `api/translators/mangas/chapters/${chapterId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      fetchChapters();
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  const fetchChapters = useCallback(async () => {
    try {
      const response = await axiosInstance.get<ChapterListResponse>(
        `/api/app/mangas/${mangaId}/translator-manga-teams/${translatorMangaTeamId}/chapters`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setChapters(response.data.value);
      console.log("chapters", response.data.value);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  }, []);

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  const handleSort = (field: keyof Chapter) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedChapters = [...chapters].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const SortIcon = ({ field }: { field: keyof Chapter }) => {
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
          <h1 className="text-3xl font-bold text-amber-500">Chapter List</h1>
          <Button
            onClick={() => setShowCreateChapterModal(true)}
            className="bg-amber-500 hover:bg-amber-600 text-black"
          >
            <Plus className="w-4 h-4 mr-2" /> Create Chapter
          </Button>
        </div>

        {/* <Button onClick={() => {console.log(mangaId)}}>testMe</Button> */}

        <div className="rounded-md border border-zinc-800 bg-zinc-900/50">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-zinc-900">
                <TableHead
                  className="w-[80px] cursor-pointer text-zinc-400 hover:text-amber-500"
                  onClick={() => handleSort("id")}
                >
                  id <SortIcon field="id" />
                </TableHead>
                <TableHead
                  className="cursor-pointer text-zinc-400 hover:text-amber-500"
                  onClick={() => handleSort("title")}
                >
                  Title <SortIcon field="title" />
                </TableHead>
                <TableHead
                  className="cursor-pointer text-zinc-400 hover:text-amber-500"
                  onClick={() => handleSort("chapterNumber")}
                >
                  status <SortIcon field="chapterNumber" />
                </TableHead>
                <TableHead className="text-right text-zinc-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedChapters.map((chapter) => (
                <TableRow
                  key={chapter.id}
                  className="border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                >
                  <TableCell className="text-zinc-400">{chapter.id}</TableCell>
                  <TableCell className="font-medium text-zinc-100">
                    {chapter.title}
                  </TableCell>
                  <TableCell>
                    {/* <Badge
                      variant={chapter.status === "published" ? "default" : "secondary"}
                      className={chapter.status === "published" ? "bg-green-500" : "bg-zinc-600"}
                    >
                      {chapter.status}
                    </Badge> */}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedChapter(chapter);
                          setShowUpdateModal(true);
                        }}
                        className="hover:bg-zinc-800 text-zinc-400 hover:text-amber-500"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <CreatePagesModal
                        open={showCreatePagesModal}
                        onOpenChange={setShowCreatePagesModal}
                        onChapterCreated={fetchChapters}
                        mangaId={mangaId}
                        chapterId={chapter.id}
                        translatorId={2}
                      />
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
                              Delete Chapter
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-zinc-400">
                              Are you sure you want to delete Chapter{" "}
                              {chapter.id}: {chapter.title}? This action cannot
                              be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-zinc-800 text-zinc-100 border-zinc-700 hover:bg-zinc-700">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteChapter(chapter.id.toString())
                              }
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

        <CreateChapterModal
          open={showCreateChapterModal}
          onOpenChange={setShowCreateChapterModal}
          onChapterCreated={fetchChapters}
          mangaId={mangaId}
        />

        {selectedChapter && (
          <UpdateChapterModal
            chapter={selectedChapter}
            open={showUpdateModal}
            onOpenChange={setShowUpdateModal}
            onChapterUpdated={fetchChapters}
          />
        )}
      </div>
    </div>
  );
}
