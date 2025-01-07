'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Star, Calendar, BookMarked, ChevronRight, CornerDownRight} from 'lucide-react'

export default function MangaPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState(1)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
 
  const [mangaData, setMangaData] = useState({
    title: "Cosmic Odyssey",
    cover: "/placeholder.svg?height=400&width=300",
    description: "Join the interstellar adventure of Captain Zara and her diverse crew as they navigate the challenges of deep space exploration, encounter alien civilizations, and uncover the mysteries of the universe.",
    author: "Stella Novacraft",
    artist: "Luna Stardust",
    status: "Ongoing",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    chapters: 42,
    lastUpdated: "2023-11-15",
    rating: 4.7,
    totalRatings: 1000,
  })

  const handleRating = (rating: number) => {
    if (isLoggedIn) {
      setUserRating(rating)
      const newTotalRatings = mangaData.totalRatings + 1
      const newRating = ((mangaData.rating * mangaData.totalRatings) + rating) / newTotalRatings
      setMangaData({
        ...mangaData,
        rating: Number(newRating.toFixed(1)),
        totalRatings: newTotalRatings
      })
    } else {
      alert("Please log in to rate this manga.")
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 text-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto mt-24">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-1/3">
            <div className="relative group">
              <Image
                src={mangaData.cover}
                alt={mangaData.title}
                width={300}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Read Now <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 bg-gray-800 rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Star className="text-yellow-400 w-5 h-5 mr-1" />
                  <span className="font-bold text-lg">{mangaData.rating}</span>
                  <span className="text-sm text-gray-400 ml-1">({mangaData.totalRatings})</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-xs">{mangaData.lastUpdated}</span>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm mb-2 text-gray-300">Rate this manga:</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`w-8 h-8 ${
                        star <= (hoverRating || userRating) ? 'text-yellow-400' : 'text-gray-600'
                      } hover:text-yellow-300 transition-colors`}
                      aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                    >
                      <Star className="w-full h-full" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {mangaData.title}
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-gray-300">{mangaData.description}</p>
            <Card className="bg-gray-800 text-gray-100 border-gray-800 shadow-lg">
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
                    <p className="text-gray-400 mb-1 text-sm">Status</p>
                    <p className="font-semibold">{mangaData.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1 text-sm">Genres</p>
                    <div className="flex flex-wrap gap-2">
                      {mangaData.genres.map((genre) => (
                        <span key={genre} className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-200">
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
                    <p className="text-gray-400 mb-1 text-sm">Last Updated</p>
                    <p className="font-semibold">{mangaData.lastUpdated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg py-6 shadow-lg transition-transform hover:scale-105">
                <BookMarked className="mr-2 h-5 w-5" /> Continue Reading
              </Button>
            ) : (
              <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-lg py-6 shadow-lg transition-transform hover:scale-105">
                <BookOpen className="mr-2 h-5 w-5" /> Start Reading
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="chapters" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 rounded-lg p-1 shadow-md">
            <TabsTrigger value="chapters" className="data-[state=active]:bg-gray-800 rounded-md transition-all">
              Chapters
            </TabsTrigger>
            <TabsTrigger value="comments" className="data-[state=active]:bg-gray-800 rounded-md transition-all">
              Comments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chapters">
            <Card className="bg-gray-800 border-gray-800 mt-6">
              <CardContent className="p-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(mangaData.chapters)].map((_, index) => (
                      <Button
                        key={index + 1}
                        variant={selectedChapter === index + 1 ? "default" : "outline"}
                        className={`h-16 ${selectedChapter === index + 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-700'} transition-all hover:scale-100 flex flex-col items-start justify-center p-4`}
                        onClick={() => setSelectedChapter(index + 1)}
                      >
                        <span className="text-lg font-semibold">Chapter {index + 1}</span>
                        <span className="text-xs text-gray-400">Last read: 2 days ago</span>
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
             <br/>//fix later
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}