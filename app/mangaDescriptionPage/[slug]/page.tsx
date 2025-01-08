"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Star, BookMarked } from "lucide-react";
import Link from "next/link";

import photo1 from "@/public/photo_2024-02-11_23-55-51.jpg";
import photo2 from "@/public/photo_2024-04-24_21-12-15.jpg";

export default function MangaPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const [mangaData, setMangaData] = useState({
    title: "Attack on Titan",
    cover:
      "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=960/catalog/crunchyroll/323c82257b2f6567fabbb7bd55bfa753.jpg",
    description:
      "Join the interstellar adventure of Captain Zara and her diverse crew as they navigate the challenges of deep space exploration, encounter alien civilizations, and uncover the mysteries of the universe. Join the interstellar adventure of Captain Zara and her diverse crew as they navigate the challenges of deep space exploration, encounter alien civilizations, and uncover the mysteries of the universe.",
    author: "Stella Novacraft",
    artist: "Luna Stardust",
    status: "Ongoing",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    chapters: 42,
    lastUpdated: "2023-11-15",
    rating: 4.7,
    totalRatings: 1000,
  });

  const handleRating = (rating: number) => {
    if (isLoggedIn) {
      setUserRating(rating);
      const newTotalRatings = mangaData.totalRatings + 1;
      const newRating =
        (mangaData.rating * mangaData.totalRatings + rating) / newTotalRatings;
      setMangaData({
        ...mangaData,
        rating: Number(newRating.toFixed(1)),
        totalRatings: newTotalRatings,
      });
    } else {
      alert("Please log in to rate this manga.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto mt-24">
        <div className="flex place-content-between items-center flex-col sm:flex-row mb-4">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text text-white">
            {mangaData.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <span className="font-bold text-lg">{mangaData.rating}</span>
              <span className="text-sm text-gray-400 ml-1">
                ({mangaData.totalRatings})
              </span>
            </div>
            <div className="flex items-center border-l border-gray-700 pl-4">
              <p className="text-sm text-gray-300 mr-2">Rate:</p>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`w-6 h-6 ${
                      star <= (hoverRating || userRating)
                        ? "text-yellow-400"
                        : "text-gray-600"
                    } hover:text-yellow-300 transition-colors`}
                    aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                  >
                    <Star className="w-full h-full" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="sm:w-1/3 md:w-1/4 flex flex-col items-center">
            <Image
              src={mangaData.cover}
              alt={mangaData.title}
              width={300}
              height={400}
              draggable={false}
              className="rounded-sm shadow-lg sm:w-full h-auto object-cover w-1/2"
            />

            <div className="flex items-center gap-4 w-full mt-4">
              {isLoggedIn ? (
                <Link href={`/mangaReadingPage/${mangaData.title}`} className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 shadow-lg rounded-sm">
                  <BookMarked className="mr-2 h-5 w-5" /> Continue Reading
                </Button>
                </Link>
              ) : (
                <Link href={`/mangaReadingPage/${mangaData.title}`} className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 shadow-lg rounded-sm">
                  <BookOpen className="mr-2 h-5 w-5" /> Start Reading
                </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="flex-1">
            <p className="mb-6 text-lg leading-relaxed text-gray-300">
              {mangaData.description}
            </p>
            <Card className="bg-stone-900 text-gray-100 border-stone-800 shadow-lg rounded-sm">
              <div
                className={`
    relative 
    transition-all 
    duration-300 
    ease-in-out
    overflow-hidden
    ${isExpanded ? "max-h-[2000px]" : "max-h-[353px]"}
  `}
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-400 mb-1 text-sm">Author</p>
                      <p className="font-semibold">{mangaData.author}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1 text-sm">Artist</p>
                      <p className="font-semibold">{mangaData.artist}</p>
                    </div>

                    <div>
                      <p className="text-gray-400 mb-1 text-sm">Manga Status</p>
                      <p className="font-semibold">{mangaData.status}</p>
                    </div>

                    <div>
                      <p className="text-gray-400 mb-1 text-sm">
                        Translate Status
                      </p>
                      <p className="font-semibold">{mangaData.status}</p>
                    </div>

                    <div>
                      <p className="text-gray-400 mb-1 text-sm">Genres</p>
                      <div className="flex flex-wrap gap-2">
                        {mangaData.genres.map((genre) => (
                          <span
                            key={genre}
                            className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-200"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1 text-sm">Chapters</p>
                      <p className="font-semibold">{mangaData.chapters}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1 text-sm">
                        start of release{" "}
                      </p>
                      <p className="font-semibold">{mangaData.lastUpdated}</p>
                    </div>


                    <div>
                      <p className="text-gray-400 mb-1 text-sm">
                        different names
                      </p>
                      <p className="font-semibold">
                        {mangaData.title} {mangaData.title} {mangaData.title}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <div
                  className={`
      sticky 
      bottom-0 
      left-0 
      right-0 
      h-20
      flex 
      items-end 
      justify-center
      ${
        isExpanded
          ? "bg-gradient-to-t from-stone-900/90 to-transparent"
          : "bg-gradient-to-t from-stone-900 to-transparent"
      }
    `}
                >
                  <Button
                    variant="ghost"
                    className="mb-2 text-gray-300 hover:bg-transperent hover:text-white w-1/2"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? "↑ Show Less" : "↓ Show More"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <hr className="border-stone-800 my-8" />
        <Tabs defaultValue="chapters" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-stone-800 rounded-lg p-1 shadow-md text-gray-300">
            <TabsTrigger
              value="chapters"
              className="data-[state=active]:bg-stone-600 data-[state=active]:text-white rounded-md transition-all"
            >
              Chapters
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="data-[state=active]:bg-stone-600 data-[state=active]:text-white rounded-md transition-all"
            >
              Comments
            </TabsTrigger>
            <TabsTrigger
              value="characters"
              className="data-[state=active]:bg-stone-600 data-[state=active]:text-white rounded-md transition-all"
            >
              Characters
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chapters">
            <div className="flex justify-start gap-2 items-center">
              <Button className="bg-stone-700 text-gray-300 hover:bg-stone-700 flex w-auto h-auto">
                <Image
                  src={photo1}
                  alt={mangaData.title}
                  width={40}
                  height={40}
                  draggable={false}
                  className="rounded-sm shadow-lg sm:w-full h-auto object-cover w-1/2"
                />
                Team1
              </Button>
              <Button className="bg-stone-800 text-gray-300 hover:bg-stone-700 flex w-auto h-auto">
                <Image
                  src={photo2}
                  alt={mangaData.title}
                  width={40}
                  height={40}
                  draggable={false}
                  className="rounded-sm shadow-lg sm:w-full h-auto object-cover w-1/2"
                />
                Team2
              </Button>
            </div>
            <Card className="bg-stone-900 border-stone-900 mt-6">
              <CardContent className="p-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
                    {[...Array(mangaData.chapters)].map((_, index) => (
                      <Button
                        key={index + 1}
                        variant={
                          selectedChapter === index + 1 ? "default" : "default"
                        }
                        className={`h-16 ${
                          selectedChapter === index + 1
                            ? "bg-black text-gray-500 hover:bg-zinc-900"
                            : "bg-stone-800 text-gray-300 hover:bg-stone-700"
                        } flex flex-col items-start justify-center p-4`}
                        onClick={() => setSelectedChapter(index + 1)}
                      >
                        <span className="text-lg font-semibold">
                          Chapter {index + 1}
                        </span>
                        <span className="text-xs text-gray-400">
                          Last update: 11.11.2011
                        </span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comments">
            <div className="space-y-6 mt-6">
              fuck that shit
              <br />
              //fix later
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
