export interface Manga {
  id: number;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  type: MangaType;
  mangaGenres: string[];
  avgRating: number;
  countRating: number;
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

export interface Translator {
  translatorMangaTeamId: number;
  name: string;
  description: string | null;
  mainPhotoId: string | null;
}

export interface MangaDetails extends Manga {
  publisher: string;
  artist: string;
  chapters: any[]; // You might want to create a Chapter interface later
  translators: Translator[];
}

export interface MangaDetailsResponse extends ApiResponse<MangaDetails> {}
