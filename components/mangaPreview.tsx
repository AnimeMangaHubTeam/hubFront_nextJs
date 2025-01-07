'use client'

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronRight, Star } from "lucide-react"
import Link from "next/link"

interface MangaPreviewProps {
  src: string
  title: string
  author: string
  genres: string[]
  description: string
  rating: number
}

export default function Component({ 
  src = "/placeholder.svg?height=400&width=300", 
  title = "Manga Title", 
  author = "Author Name", 
  genres = ["Action", "Adventure"], 
  description = "text", 
  rating = 4.5 
}: MangaPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <Card
      className="group relative w-full max-w-[300px] overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={src}
          alt={`Cover of ${title}`}
          fill
          className="object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
        />
      </div>
      <CardContent className="absolute inset-0 flex flex-col justify-end p-0 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:bg-black/70">
        <div className="p-4">
        <h2 className="mb-1 text-2xl font-bold leading-tight">{title}</h2>
        <p className="mb-2 text-sm font-medium">by {author}</p>
        <div className="mb-2 flex items-center">
          <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
        <div className="mb-2 flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Badge key={genre} variant="secondary" className="bg-white/20 text-xs font-medium text-white">
              {genre}
            </Badge>
          ))}
        </div>
        <p className="mb-4 text-sm line-clamp-3">{description}</p>
        </div>
        <Button className="w-full z-30 h-14 rounded-t-none" variant="destructive">
          <Link href={`/mangaDescriptionPage/${title}`}>
          Read Now
          </Link>
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
      <CardFooter className="bg-white py-3 group-hover:bg-stone-900" >
        <h2 className={`w-full truncate text-center text-lg font-bold ${isHovered ? "opacity-0" : undefined}`}>{title}</h2>
      </CardFooter>
    </Card>
  )
}