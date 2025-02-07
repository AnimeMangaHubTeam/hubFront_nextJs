import type { Manga } from "@/components/mangaAdminPage/types/manga"
import { CreateMangaModal } from "@/components/mangaAdminPage/modals/create-manga-modal"
import { MangaCard } from "@/components/mangaAdminPage/manga-card"

async function getMangas(): Promise<Manga[]> {
  // This would be replaced with your actual API call
  return []
}

export default async function MangasPage() {
  const mangas = await getMangas()

  return (
    <div className="container mx-auto py-6 mt-20 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manga List</h1>
        <CreateMangaModal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mangas.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </div>
  )
}

