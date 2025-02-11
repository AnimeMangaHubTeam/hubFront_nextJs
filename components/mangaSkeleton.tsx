import { Skeleton } from "@/components/ui/skeleton"

export function MangaSliderSkeleton() {
  return (
    <div className="w-full">
      {/* Title Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Manga Cards Skeleton */}
      <div className="flex gap-4 overflow-hidden">
        {Array(5).fill(null).map((_, i) => (
          <div 
            key={i} 
            className="flex-[0_0_calc(50%-2rem)] sm:flex-[0_0_calc(33.33%-1rem)] md:flex-[0_0_calc(25%-1rem)] lg:flex-[0_0_calc(20%-1rem)]"
          >
            <div className="space-y-3">
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                  {Array(2).fill(null).map((_, j) => (
                    <Skeleton key={j} className="h-5 w-16" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}