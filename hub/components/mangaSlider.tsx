'use client'

import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import MangaPreviewComponent from './mangaPreview'



interface MangaData {
  src: string;
  title: string;
  author: string;
  genres: string[];
  description: string;
}

interface MangaPreviewSliderProps {
  data: MangaData[];
  title: string;
}

export default function MangaPreviewSlider({data, title}: MangaPreviewSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  // Create an array of 10 items for demonstration
  const mangaList = Array(10).fill(null)

  return (
    <div className="relative  mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <h2 className="text-3xl font-bold my-4 text-white">
        {title}
      </h2>
      <div className="overflow-hidden pb-4" ref={emblaRef}>
        <div className="flex -ml-4">
          {mangaList.map((_, index) => (
            <div key={index} className="flex-[0_0_calc(50%-2rem)] sm:flex-[0_0_calc(33.33%-1rem)] md:flex-[0_0_calc(25%-1rem)] lg:flex-[0_0_calc(20%-1rem)] min-w-0 pl-4">
              <MangaPreviewComponent 
                src={data[0].src}
                title={data[0].title}
                author={data[0].author}
                genres={data[0].genres}
                description={data[0].description}
              />
            </div>
          ))}
        </div>
      </div>
      {//<div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/70 to-transparent pointer-events-none z-10" />
      }
      <Button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white text-black rounded-full p-1 py-10 shadow-md z-20"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white text-black rounded-full p-1 py-10 shadow-md z-20"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}