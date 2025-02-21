export interface Manga {
  id: number;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  type: MangaType;
  mangaGenres: Array<{
    id: number;
    name: string;
  }>;
  avgRating: number;
  countRating: number;
  publisher: string
  artist: string
}

export enum MangaType {
  Unknown = 0,
  Manga = 1,
  Manhwa = 2,
  Manhua = 3,
}

export interface ApiResponse<T> {
  value: T;
  status: number;
  success: boolean;
  errors: string[];
  messages: string[];
}

export interface MangaListResponse extends ApiResponse<Manga[]> {}

interface Genre {
  id: number;
  name: string;
}

interface Translator {
  translatorMangaTeamId: number;
  name: string;
  description: string | null;
  mainPhotoId: string | null;
}

export interface MangaDetails {
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  type: number;
  publisher: string;
  artist: string;
  avgRating: number;
  countRating: number;
  chapters: Chapter[]; // Update this type based on your actual chapters structure
  translators: Translator[];
  mangaGenres: Genre[];
}

interface Chapter {
  chapterId: number;
  mangaId: number;
  chapterNumber: number;
  translatorMangaTeamId: number;
  title: string;
  publicationDate: string;
}

export interface MangaDetailsResponse extends ApiResponse<MangaDetails> {}
