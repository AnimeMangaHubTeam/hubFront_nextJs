export interface ReaderSettings {
  readingMode: "vertical" | "horizontal";
  showAllChapters: boolean;
  halfToneMode: boolean;
  showPageNumbers: boolean;
  showOriginal: boolean;
  theme: "dark" | "light" | "system";
  pageTransitionArea: "image" | "fullscreen";
  imageFit: "width" | "height";
  menuDisplay: "scroll" | "click";
  containerWidth: number;
  brightness: number;
  autoScrollSpeed: number;
}

export interface Chapter {
  chapterId: number;
  mangaId: number;
  chapterNumber: number;
  translatorMangaTeamId: number;
  title: string;
  publicationDate: string;
}

export interface MangaPage {
  id: number;
  chapterId: number;
  pageNumber: number;
  imageUrl: string;
}

export interface Translator {
  translatorMangaTeamId: number;
  name: string;
  description: string | null;
  mainPhotoId: string | null;
}

export interface MangaPagesResponse {
  value: MangaPage[];
  status: number;
  success: boolean;
  errors: string[];
  messages: string[];
}
