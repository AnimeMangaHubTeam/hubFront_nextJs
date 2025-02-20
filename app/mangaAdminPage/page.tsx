"use client";
import { useState, useEffect } from "react";
import { CreateMangaModal } from "@/components/mangaAdminPage/modals/CreateMangaModal";
import { MangaCard } from "@/components/mangaAdminPage/MangaCard";
import axiosInstance from "@/lib/axios";
import { Manga, MangaListResponse } from "@/types/mainPageManga";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MangaAdminPage() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMangas();
  }, [currentPage, pageSize, searchQuery]);

  const fetchMangas = async () => {
    try {
      const response = await axiosInstance.get<MangaListResponse>(
        `api/app/mangas?IsNew=true&IsUpdated=false&IsPopular=false&CurrentPage=${currentPage}&PageSize=${pageSize}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setMangas(response.data.value);
      console.log('manga', response.data.value);
    } catch (error: any) {
      console.error("Error fetching mangas:", error);
    }
  };

  return (
    <div className="container mx-auto py-6 mt-20 text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-white">Manga Admin</h1>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manga List</h1>
        <CreateMangaModal />
      </div>
      <div className="flex justify-between items-center mb-6">
        {/* <Input
          type="text"
          placeholder="Search mangas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64 bg-gray-800 text-white border-gray-700"
        /> */}
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="w-20 bg-gray-800 text-white border-gray-700"
          />
          <span className="text-gray-300">items per page</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      <Button onClick={() => console.log(mangas)}>Refresh</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8 gap-6">
        {mangas.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </div>
  );
}
