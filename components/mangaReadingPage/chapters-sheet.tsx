"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type {
  Chapter,
  Translator,
} from "@/components/mangaReadingPage/types/reader";
import { User } from "lucide-react";
import Image from "next/image";

interface ChaptersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chapters: Chapter[];
  currentChapter: Chapter | null;
  onChapterSelect: (chapter: Chapter) => void;
  translators?: Translator[];
  selectedTranslator?: number | null;
  onTranslatorSelect?: (translatorId: number) => void;
}

export function ChaptersSheet({
  open,
  onOpenChange,
  chapters,
  currentChapter,
  onChapterSelect,
  translators = [],
  selectedTranslator = null,
  onTranslatorSelect,
}: ChaptersSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-full max-w-md bg-zinc-900 text-white"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Chapters</SheetTitle>
        </SheetHeader>

        {/* Translator selector */}
        {translators.length > 0 && (
          <div className="my-4">
            <h3 className="mb-2 text-sm text-zinc-400">Translators</h3>
            <div className="flex flex-wrap gap-2">
              {translators.map((translator) => (
                <Button
                  key={translator.translatorMangaTeamId}
                  variant={
                    selectedTranslator === translator.translatorMangaTeamId
                      ? "secondary"
                      : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    onTranslatorSelect?.(translator.translatorMangaTeamId)
                  }
                  className="flex items-center gap-2"
                >
                  {translator.mainPhotoId ? (
                    <Image
                      src={translator.mainPhotoId}
                      alt={translator.name}
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  {translator.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <ScrollArea className="h-[calc(100vh-10rem)] mt-4 pr-4">
          <div className="space-y-2">
            {chapters.length > 0 ? (
              chapters.map((chapter) => (
                <Button
                  key={chapter.chapterId}
                  variant={
                    currentChapter?.chapterId === chapter.chapterId
                      ? "secondary"
                      : "outline"
                  }
                  className="w-full justify-start h-auto py-3 text-left"
                  onClick={() => onChapterSelect(chapter)}
                >
                  <div>
                    <div className="font-semibold">
                      Chapter {chapter.chapterNumber}
                    </div>
                    {chapter.title && (
                      <div className="text-xs text-zinc-400">
                        {chapter.title}
                      </div>
                    )}
                    <div className="text-xs text-zinc-500">
                      {new Date(chapter.publicationDate).toLocaleDateString()}
                    </div>
                  </div>
                </Button>
              ))
            ) : (
              <div className="text-center py-8 text-zinc-400">
                {selectedTranslator
                  ? "No chapters available for this translator"
                  : "Select a translator to view chapters"}
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
