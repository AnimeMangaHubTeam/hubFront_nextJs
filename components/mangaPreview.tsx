'use client'

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronRight, Star } from "lucide-react"
import Link from "next/link"
import { Manga } from "@/types/mainPageManga"

interface MangaPreviewProps {
  manga: Manga;
}

export default function MangaPreviewComponent({ manga }: MangaPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <Card
      className="group relative w-full max-w-[300px] overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl rounded-sm border-stone-700"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={manga.imageUrl}
          alt={`Cover of ${manga.title}`}
          fill
          className="object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
        />
      </div>
      <CardContent className="absolute inset-0 flex flex-col justify-end p-0 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-black/70 z-10">
        <div className="p-4">
          <h2 className="mb-1 text-2xl font-bold leading-tight">{manga.title}</h2>
          <p className="mb-2 text-sm font-medium">by {manga.author}</p>
          <div className="mb-2 flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{manga.avgRating.toFixed(1)}</span>
          </div>
          <div className="mb-2 flex flex-wrap gap-2">
            {manga.mangaGenres.map((genre) => (
              <Badge
                key={genre.id}
                variant="secondary"
                className="bg-white/20 text-xs font-medium text-white"
              >
                {genre.name}
              </Badge>
              
            ))}
          </div>
          <p className="mb-4 text-sm line-clamp-3">{manga.description}</p>
        </div>
        <Link href={`/mangaDescriptionPage/${manga.id}`} className="w-full z-20">
          <Button
            className="w-full h-12 rounded-sm rounded-t-none relative z-20"
            variant="destructive"
          >
            Read Now
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
      <CardFooter className="bg-stone-200 py-0 h-12 group-hover:bg-stone-900">
        <h2
          className={`w-full truncate text-center text-lg font-bold ${
            isHovered ? "opacity-0" : undefined
          }`}
        >
          {manga.title}
        </h2>
      </CardFooter>
    </Card>
  )
}