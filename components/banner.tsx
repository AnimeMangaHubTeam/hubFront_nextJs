import { BookmarkPlus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="relative w-full h-[56.25vw] max-h-[80vh] min-h-[400px] overflow-hidden z-0 ">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover
        "
        poster="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=3840/CurationAssets/As%20a%20Reincarnated%20Aristocrat,%20I'll%20Use%20My%20Appraisal%20Skill%20to%20Rise%20in%20the%20World/SEASON%202/ULTRA-WIDE/AsAReincarnatedAristocrat_S2_UltraWide_LTR.png" // Provide a valid URL for the poster image
      >
        <source src={undefined} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Anime Title</h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-6">
            A brief description of the anime or manga series. Exciting adventures await!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-black hover:bg-gray-200">
              <Info className="mr-2 h-4 w-4" />
              Learn More
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200">
              <BookmarkPlus className="mr-2 h-4 w-4" />
                to Watch
            </Button>
          </div>
        </div>
      </div>

      {/* Screen Reader Only Description */}
      <div className="sr-only">
        Banner for Anime Title. The background shows a video clip from the anime. On the left, there's information about
        the series and options to learn more or bookmark for later viewing.
      </div>
    </div>
  )
}