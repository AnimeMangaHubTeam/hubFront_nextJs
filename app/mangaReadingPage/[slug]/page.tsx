"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Menu,
  RotateCcw,
  List,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsSheet } from "@/components/mangaReadingPage/settings-sheet";
import { ChaptersSheet } from "@/components/mangaReadingPage/chapters-sheet";
import { MangaPages } from "@/components/mangaReadingPage/manga-pages";
import type {
  ReaderSettings,
  Chapter,
  MangaPage,
  Translator,
} from "@/components/mangaReadingPage/types/reader";
import { getMangaPages } from "@/components/mangaReadingPage/actions/manga";
import Image from "next/image";
import { useDataCache } from "@/contexts/DataCacheContext";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

const defaultSettings: ReaderSettings = {
  readingMode: "vertical",
  showAllChapters: false,
  halfToneMode: false,
  showPageNumbers: true,
  showOriginal: false,
  theme: "dark",
  pageTransitionArea: "image",
  imageFit: "width",
  menuDisplay: "scroll",
  containerWidth: 720,
  brightness: 100,
  autoScrollSpeed: 0,
};

export default function MangaReader() {
  const [settings, setSettings] = useState<ReaderSettings>(defaultSettings);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [mangaTitle, setMangaTitle] = useState<string>("");
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [translators, setTranslators] = useState<Translator[]>([]);
  const [selectedTranslator, setSelectedTranslator] = useState<number | null>(
    null
  );
  const [pages, setPages] = useState<MangaPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { getCachedData, setCachedData } = useDataCache();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params.slug;
  const chapterId = searchParams.get("chapterId")
    ? parseInt(searchParams.get("chapterId") as string)
    : null;
  const mangaId = searchParams.get("mangaId")
    ? parseInt(searchParams.get("mangaId") as string)
    : null;

  // Fetch manga details including translators and chapters
  useEffect(() => {
    const fetchMangaDetails = async () => {
      if (!mangaId) return;

      try {
        const cacheKey = `manga-details-${mangaId}`;
        const cachedData = getCachedData(cacheKey);

        if (cachedData) {
          setMangaTitle(cachedData.title);
          setChapters(cachedData.chapters);
          setTranslators(cachedData.translators);

          // Set default translator
          if (cachedData.translators.length > 0 && !selectedTranslator) {
            setSelectedTranslator(
              cachedData.translators[0].translatorMangaTeamId
            );
          }
          return;
        }

        const response = await axiosInstance.get(`/api/app/mangas/${mangaId}`);
        if (response.data.success) {
          const mangaData = response.data.value;
          setMangaTitle(mangaData.title);
          setChapters(mangaData.chapters);
          setTranslators(mangaData.translators);

          // Set default translator
          if (mangaData.translators.length > 0 && !selectedTranslator) {
            setSelectedTranslator(
              mangaData.translators[0].translatorMangaTeamId
            );
          }

          // Cache data
          setCachedData(cacheKey, mangaData);
        }
      } catch (error) {
        console.error("Failed to fetch manga details:", error);
      }
    };

    fetchMangaDetails();
  }, [mangaId, getCachedData, setCachedData, selectedTranslator]);

  // Set current chapter when chapterId changes
  useEffect(() => {
    if (chapterId && chapters.length > 0) {
      const chapter = chapters.find((c) => c.chapterId === chapterId);
      if (chapter) {
        setCurrentChapter(chapter);
      }
    }
  }, [chapterId, chapters]);

  // Fetch pages for current chapter
  useEffect(() => {
    if (currentChapter) {
      const fetchPages = async () => {
        try {
          setLoading(true);
          const cacheKey = `manga-pages-${currentChapter.chapterId}`;
          const cachedPages = getCachedData(cacheKey);

          if (cachedPages) {
            console.log("Using cached manga pages");
            setPages(cachedPages);
            setCurrentPage(1);
            setLoading(false);
            return;
          }

          const mangaPages = await getMangaPages(currentChapter.chapterId);
          setPages(mangaPages);
          setCurrentPage(1);
          // Cache the manga pages
          setCachedData(cacheKey, mangaPages);
        } catch (error) {
          console.error("Failed to fetch manga pages:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPages();
    }
  }, [currentChapter, getCachedData, setCachedData]);

  // Filter chapters by selected translator
  const filteredChapters = selectedTranslator
    ? chapters.filter(
        (chapter) => chapter.translatorMangaTeamId === selectedTranslator
      )
    : chapters;

  const handleSettingsChange = (newSettings: Partial<ReaderSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const navigateToChapter = (chapter: Chapter) => {
    setCurrentChapter(chapter);
    router.push(
      `/mangaReadingPage/${slug}?chapterId=${chapter.chapterId}&mangaId=${chapter.mangaId}`
    );
    setChaptersOpen(false);
  };

  const handlePrevChapter = () => {
    if (currentChapter && filteredChapters.length > 0) {
      const currentIndex = filteredChapters.findIndex(
        (c) => c.chapterId === currentChapter.chapterId
      );
      if (currentIndex > 0) {
        navigateToChapter(filteredChapters[currentIndex - 1]);
      }
    }
  };

  const handleNextChapter = () => {
    if (currentChapter && filteredChapters.length > 0) {
      const currentIndex = filteredChapters.findIndex(
        (c) => c.chapterId === currentChapter.chapterId
      );
      if (currentIndex < filteredChapters.length - 1) {
        navigateToChapter(filteredChapters[currentIndex + 1]);
      }
    }
  };

  const handleTranslatorSelect = (translatorId: number) => {
    setSelectedTranslator(translatorId);
  };

  // Get the selected translator name
  const getSelectedTranslatorName = () => {
    if (!selectedTranslator) return "";
    const translator = translators.find(
      (t) => t.translatorMangaTeamId === selectedTranslator
    );
    return translator ? translator.name : "";
  };

  // Function to navigate to a specific page
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= pages.length) {
      setCurrentPage(pageNumber);
    }
  };

  // Function to navigate to the next page
  const nextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    } else {
      // If at the last page, go to next chapter
      handleNextChapter();
    }
  };

  // Function to navigate to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      // If at the first page, go to previous chapter
      handlePrevChapter();
    }
  };

  // Get chapter title for display
  const getChapterTitle = () => {
    if (!currentChapter) return "";
    let title = `Chapter ${currentChapter.chapterNumber}`;
    if (currentChapter.title) title += ` - ${currentChapter.title}`;
    return title;
  };

  return (
    <div className={`min-h-screen ${settings.theme === "dark" ? "dark" : ""}`}>
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Top Navigation */}
        <header className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setChaptersOpen(true)}
            >
              <List className="h-4 w-4" />
            </Button>
            <span className="text-sm text-zinc-300">{mangaTitle || slug}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevPage}
              disabled={
                currentPage === 1 &&
                filteredChapters.findIndex(
                  (c) => c.chapterId === currentChapter?.chapterId
                ) === 0
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">{getChapterTitle()}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextPage}
              disabled={
                currentPage === pages.length &&
                filteredChapters.findIndex(
                  (c) => c.chapterId === currentChapter?.chapterId
                ) ===
                  filteredChapters.length - 1
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <Info className="h-4 w-4" />
          </Button>
        </header>

        {/* Main Content */}
        <main
          className={`flex-1 flex justify-center bg-black relative ${
            settings.readingMode === "horizontal"
              ? "overflow-x-auto"
              : "overflow-y-auto"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-white">Loading...</div>
            </div>
          ) : pages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-white">
                No pages available for this chapter
              </div>
            </div>
          ) : (
            <div
              className={`py-4 ${
                settings.readingMode === "horizontal" ? "px-0" : "px-4"
              }`}
            >
              <MangaPages
                pages={pages}
                readingMode={settings.readingMode}
                containerWidth={settings.containerWidth}
                brightness={settings.brightness}
                currentPage={currentPage}
                onPageChange={goToPage}
              />
            </div>
          )}

          {/* Side Controls */}
          <div className="fixed right-4 bottom-4 flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-zinc-800/50"
              onClick={() => setSettingsOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-zinc-800/50"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            {settings.showPageNumbers && pages.length > 0 && (
              <div className="text-xs text-zinc-400">
                {currentPage}/{pages.length}
              </div>
            )}
          </div>
        </main>

        {/* Settings Sheet */}
        <SettingsSheet
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />

        {/* Chapters Sheet */}
        <ChaptersSheet
          open={chaptersOpen}
          onOpenChange={setChaptersOpen}
          chapters={filteredChapters}
          currentChapter={currentChapter}
          onChapterSelect={navigateToChapter}
          translators={translators}
          selectedTranslator={selectedTranslator}
          onTranslatorSelect={handleTranslatorSelect}
        />
      </div>
    </div>
  );
}
